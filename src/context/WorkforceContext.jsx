import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { JOB_LISTINGS, WORKFLOW_STAGES } from "../data/mockInitialData";

const WorkforceContext = createContext();

export const ROLES = {
  CANDIDATE: "Candidate",
  ADMIN: "Administrator",
  AGENCY: "Agency User",
  MIS: "MIS / Department User"
};

export const WorkforceProvider = ({ children }) => {
  const [activeRole, setActiveRole] = useState(() =>
    localStorage.getItem("optatech_role") || ROLES.CANDIDATE
  );

  // ── Candidate Session ──
  const [registeredUser, setRegisteredUser] = useState(() => {
    const saved = localStorage.getItem("optatech_user");
    return saved ? JSON.parse(saved) : null;
  });

  // ── All registered candidates list (for returning user login by Aadhaar / Mobile) ──
  const [registeredCandidates, setRegisteredCandidates] = useState(() => {
    const saved = localStorage.getItem("optatech_candidates");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Admin Session ──
  const [adminSession, setAdminSession] = useState(() => {
    const saved = localStorage.getItem("optatech_admin_session");
    return saved ? JSON.parse(saved) : null;
  });

  // ── Agency Session ──
  const [agencySession, setAgencySession] = useState(() => {
    const saved = localStorage.getItem("optatech_agency_session");
    return saved ? JSON.parse(saved) : null;
  });

  // ── Job listings (static from data file) ──
  const [jobs] = useState(JOB_LISTINGS);

  // ── Applications submitted by candidates for specific jobs ──
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("optatech_applications");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Resume registrations (submitted when no direct openings or to general talent pool) ──
  const [resumeRegistrations, setResumeRegistrations] = useState(() => {
    const saved = localStorage.getItem("optatech_resumes");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Employees (created after admin onboards) ──
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("optatech_employees");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Attendance records ──
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("optatech_attendance");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Audit trail ──
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem("optatech_logs");
    return saved ? JSON.parse(saved) : [];
  });

  // ── Toast notifications ──
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = useCallback((msg, type = "success") => {
    setToastMessage({ msg, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 4500);
  }, []);

  // ── Persist to localStorage ──
  useEffect(() => { localStorage.setItem("optatech_role", activeRole); }, [activeRole]);
  useEffect(() => {
    if (registeredUser) {
      localStorage.setItem("optatech_user", JSON.stringify(registeredUser));
    } else {
      localStorage.removeItem("optatech_user");
    }
  }, [registeredUser]);
  useEffect(() => { localStorage.setItem("optatech_candidates", JSON.stringify(registeredCandidates)); }, [registeredCandidates]);
  useEffect(() => {
    if (adminSession) {
      localStorage.setItem("optatech_admin_session", JSON.stringify(adminSession));
    } else {
      localStorage.removeItem("optatech_admin_session");
    }
  }, [adminSession]);
  useEffect(() => {
    if (agencySession) {
      localStorage.setItem("optatech_agency_session", JSON.stringify(agencySession));
    } else {
      localStorage.removeItem("optatech_agency_session");
    }
  }, [agencySession]);
  useEffect(() => { localStorage.setItem("optatech_applications", JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem("optatech_resumes", JSON.stringify(resumeRegistrations)); }, [resumeRegistrations]);
  useEffect(() => { localStorage.setItem("optatech_employees", JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem("optatech_attendance", JSON.stringify(attendanceRecords)); }, [attendanceRecords]);
  useEffect(() => { localStorage.setItem("optatech_logs", JSON.stringify(auditLogs)); }, [auditLogs]);

  // ── Audit logger ──
  const logAction = useCallback((action, category = "General") => {
    const ts = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const userIdentifier =
      registeredUser?.fullName ? `${registeredUser.fullName} (${registeredUser.aadhaarNo})` :
      adminSession ? "Administrator (Optatech Govt Console)" :
      agencySession ? "Agency Officer (Optatech Partner)" :
      `${activeRole.toLowerCase().replace(/\s+/g, ".")}@optatechinnovation.com`;

    setAuditLogs(prev => [{
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: ts,
      user: userIdentifier,
      role: activeRole,
      action,
      category
    }, ...prev]);
  }, [activeRole, registeredUser, adminSession, agencySession]);

  // ═══════════════════════════════════════════════════
  //  CANDIDATE: Registration & Returning User Login
  // ═══════════════════════════════════════════════════
  const registerUser = (userData) => {
    const cleanAadhaar = (userData.aadhaarNo || "").replace(/\s+/g, "");
    const cleanMobile = (userData.mobile || "").replace(/\s+/g, "");

    // Check if already registered in registeredCandidates, applications or resumes
    const existing =
      registeredCandidates.find(c => c.aadhaarNo?.replace(/\s+/g, "") === cleanAadhaar || c.mobile?.replace(/\s+/g, "") === cleanMobile) ||
      applications.find(a => a.aadhaarNo?.replace(/\s+/g, "") === cleanAadhaar || a.mobile?.replace(/\s+/g, "") === cleanMobile) ||
      resumeRegistrations.find(r => r.aadhaarNo?.replace(/\s+/g, "") === cleanAadhaar || r.mobile?.replace(/\s+/g, "") === cleanMobile);

    if (existing) {
      const mergedUser = {
        ...existing,
        ...userData,
        isReturning: true
      };
      setRegisteredUser(mergedUser);
      setActiveRole(ROLES.CANDIDATE);
      // update list
      setRegisteredCandidates(prev => {
        const filtered = prev.filter(c => c.aadhaarNo?.replace(/\s+/g, "") !== cleanAadhaar);
        return [mergedUser, ...filtered];
      });
      logAction(`Returning candidate logged in: ${mergedUser.fullName} (Aadhaar: ${mergedUser.aadhaarNo})`, "Authentication");
      showToast(`Welcome back, ${mergedUser.fullName}! Your previous records are loaded.`);
      return true;
    }

    const newUser = {
      ...userData,
      registeredAt: new Date().toISOString(),
      isReturning: false
    };

    setRegisteredUser(newUser);
    setActiveRole(ROLES.CANDIDATE);
    setRegisteredCandidates(prev => [newUser, ...prev]);
    logAction(`New candidate registered: ${userData.fullName} (Aadhaar: ${userData.aadhaarNo})`, "Registration");
    showToast(`Registration successful! Welcome, ${userData.fullName}.`);
    return true;
  };

  // Login returning candidate by Aadhaar or Mobile
  const loginCandidate = (aadhaarOrMobile) => {
    const cleanInput = (aadhaarOrMobile || "").replace(/\s+/g, "").trim();
    if (!cleanInput) {
      showToast("Please enter your registered Aadhaar or Mobile number.", "error");
      return { success: false, message: "Input required" };
    }

    const found =
      registeredCandidates.find(c => c.aadhaarNo?.replace(/\s+/g, "") === cleanInput || c.mobile?.replace(/\s+/g, "") === cleanInput) ||
      applications.find(a => a.aadhaarNo?.replace(/\s+/g, "") === cleanInput || a.mobile?.replace(/\s+/g, "") === cleanInput) ||
      resumeRegistrations.find(r => r.aadhaarNo?.replace(/\s+/g, "") === cleanInput || r.mobile?.replace(/\s+/g, "") === cleanInput);

    if (found) {
      const user = {
        fullName: found.fullName || found.name || "Candidate",
        aadhaarNo: found.aadhaarNo || cleanInput,
        mobile: found.mobile || "",
        email: found.email || "",
        gender: found.gender || "Male",
        isReturning: true,
        district: found.district || ""
      };
      setRegisteredUser(user);
      setActiveRole(ROLES.CANDIDATE);
      logAction(`Candidate logged in via Aadhaar/Mobile: ${user.fullName}`, "Authentication");
      showToast(`Welcome back, ${user.fullName}! Logged in successfully.`);
      return { success: true, user };
    }

    showToast("No candidate found with this Aadhaar or Mobile number. Please register.", "error");
    return { success: false, message: "Candidate not found" };
  };

  const logoutUser = () => {
    setRegisteredUser(null);
    localStorage.removeItem("optatech_user");
    showToast("Candidate logged out.", "info");
  };

  // ═══════════════════════════════════════════════════
  //  ADMIN: Authentication
  // ═══════════════════════════════════════════════════
  const loginAdmin = (usernameOrEmail, password) => {
    const u = (usernameOrEmail || "").trim().toLowerCase();
    const p = (password || "").trim();

    // Valid credentials: admin@optatechinnovation.com or admin with Admin@123 or admin123
    const isValid =
      (u === "admin@optatechinnovation.com" || u === "admin" || u === "admin@rajasthan.gov.in") &&
      (p === "Admin@123" || p === "admin123" || p === "admin");

    if (isValid) {
      const session = {
        loggedIn: true,
        username: u,
        fullName: "State Nodal Officer (Admin)",
        department: "Panchayati Raj Department, Govt of Rajasthan",
        role: "Administrator",
        loginTime: new Date().toISOString()
      };
      setAdminSession(session);
      setActiveRole(ROLES.ADMIN);
      logAction("Administrator logged in successfully", "Security");
      showToast("Admin access granted. Welcome to Centralized Console.");
      return { success: true };
    }

    showToast("Invalid Admin credentials. Use admin@optatechinnovation.com / Admin@123", "error");
    return { success: false, message: "Invalid credentials" };
  };

  const logoutAdmin = () => {
    setAdminSession(null);
    localStorage.removeItem("optatech_admin_session");
    logAction("Administrator logged out", "Security");
    showToast("Admin logged out.", "info");
  };

  // ═══════════════════════════════════════════════════
  //  AGENCY: Authentication
  // ═══════════════════════════════════════════════════
  const loginAgency = (usernameOrEmail, password) => {
    const u = (usernameOrEmail || "").trim().toLowerCase();
    const p = (password || "").trim();

    // Valid credentials: agency@optatechinnovation.com or agency with Agency@123 or agency123
    const isValid =
      (u === "agency@optatechinnovation.com" || u === "agency" || u === "partner@optatechinnovation.com") &&
      (p === "Agency@123" || p === "agency123" || p === "agency");

    if (isValid) {
      const session = {
        loggedIn: true,
        agencyId: "OPT-AGY-001",
        agencyName: "Optatech Innovation Private Limited (Placement Wing)",
        officerName: "Harish Gupta",
        role: "Agency User",
        loginTime: new Date().toISOString()
      };
      setAgencySession(session);
      setActiveRole(ROLES.AGENCY);
      logAction("Agency Partner logged in successfully", "Security");
      showToast("Agency Partner authenticated. Welcome to Field Attendance Portal.");
      return { success: true };
    }

    showToast("Invalid Agency credentials. Use agency@optatechinnovation.com / Agency@123", "error");
    return { success: false, message: "Invalid credentials" };
  };

  const logoutAgency = () => {
    setAgencySession(null);
    localStorage.removeItem("optatech_agency_session");
    logAction("Agency Partner logged out", "Security");
    showToast("Agency logged out.", "info");
  };

  // ═══════════════════════════════════════════════════
  //  APPLICATIONS (Direct Job Apply)
  // ═══════════════════════════════════════════════════
  const submitApplication = (applicationData) => {
    const appId = `APP-${Date.now().toString(36).toUpperCase()}`;
    const job = jobs.find(j => j.id === applicationData.jobId);

    const newApp = {
      id: appId,
      ...applicationData,
      jobTitle: job?.title || applicationData.jobTitle || "Panchayati Raj Position",
      jobDepartment: job?.department || "Department of Panchayati Raj",
      currentStage: 1,
      status: "Application Submitted",
      appliedDate: new Date().toISOString().substring(0, 10),
      timeline: [
        { stage: 1, label: "Application Submitted", date: new Date().toISOString(), note: "Online form received successfully through Rozgar Rajasthan Portal." }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Also ensure candidate is in registeredCandidates
    setRegisteredCandidates(prev => {
      const exists = prev.some(c => c.aadhaarNo === applicationData.aadhaarNo);
      if (!exists) {
        return [{
          fullName: applicationData.fullName,
          aadhaarNo: applicationData.aadhaarNo,
          mobile: applicationData.mobile,
          email: applicationData.email,
          gender: applicationData.gender
        }, ...prev];
      }
      return prev;
    });

    logAction(`Direct application ${appId} submitted for "${newApp.jobTitle}" by ${applicationData.fullName}`, "Application");
    showToast(`Application submitted! Your tracking ID: ${appId}`);
    return appId;
  };

  // ═══════════════════════════════════════════════════
  //  RESUME BANK / TALENT POOL (When No Openings)
  // ═══════════════════════════════════════════════════
  const registerResume = (resumeData) => {
    const regId = `POOL-${Date.now().toString(36).toUpperCase()}`;
    const newReg = {
      id: regId,
      ...resumeData,
      registeredDate: new Date().toISOString().substring(0, 10),
      status: "Active in Talent Pool",
      contactHistory: []
    };

    setResumeRegistrations(prev => [newReg, ...prev]);

    // Also add to registeredCandidates so student can log in later!
    setRegisteredCandidates(prev => {
      const exists = prev.some(c => c.aadhaarNo === resumeData.aadhaarNo);
      if (!exists) {
        return [{
          fullName: resumeData.fullName,
          aadhaarNo: resumeData.aadhaarNo,
          mobile: resumeData.mobile,
          email: resumeData.email,
          gender: resumeData.gender,
          district: resumeData.district
        }, ...prev];
      }
      return prev;
    });

    logAction(`Resume profile ${regId} registered into Talent Pool by ${resumeData.fullName}`, "Talent Pool");
    showToast(`Resume registered in State Talent Pool! ID: ${regId}. You will be contacted as soon as matching openings are announced.`);
    return regId;
  };

  // Admin contacting a candidate from the talent pool
  const contactCandidate = (regId, notificationMessage = "") => {
    const message = notificationMessage || "You have been shortlisted for an upcoming Panchayati Raj opening. Please check your SMS/email for recruitment drive details.";
    const ts = new Date().toLocaleString("en-IN");

    setResumeRegistrations(prev => prev.map(r => {
      if (r.id === regId) {
        return {
          ...r,
          status: "Contacted for Vacancy",
          lastContacted: ts,
          contactHistory: [
            ...(r.contactHistory || []),
            { date: ts, message, contactedBy: "Panchayati Raj Recruitment Cell" }
          ]
        };
      }
      return r;
    }));

    const target = resumeRegistrations.find(r => r.id === regId);
    logAction(`Candidate ${target?.fullName || regId} contacted for upcoming vacancy via SMS/Email`, "Talent Pool Outreach");
    showToast(`Candidate ${target?.fullName || regId} contacted successfully! SMS & Email notification dispatched.`);
  };

  // ═══════════════════════════════════════════════════
  //  ADMIN WORKFLOW STAGES (1 to 7)
  // ═══════════════════════════════════════════════════
  const advanceStage = (appId, newStage, statusText, note = "") => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          currentStage: newStage,
          status: statusText,
          timeline: [
            ...app.timeline,
            { stage: newStage, label: statusText, date: new Date().toISOString(), note }
          ]
        };
      }
      return app;
    }));
    logAction(`Application ${appId} advanced to Stage ${newStage}: ${statusText}`, "Workflow");
    showToast(`${appId} → Stage ${newStage}: ${statusText}`);
  };

  const scheduleInterview = (appId, details) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          currentStage: 3,
          status: "Interview Scheduled",
          interviewDate: details.date,
          interviewVenue: details.venue,
          timeline: [
            ...app.timeline,
            { stage: 3, label: "Interview Scheduled", date: new Date().toISOString(), note: `Date: ${details.date}, Venue: ${details.venue}` }
          ]
        };
      }
      return app;
    }));
    logAction(`Interview scheduled for ${appId}: ${details.date} at ${details.venue}`, "Interview");
    showToast(`Interview scheduled for ${appId} and candidate notified via SMS & Email!`);
  };

  const recordSelection = (appId, score, feedback) => {
    advanceStage(appId, 4, "Selected & Approved", `Merit Score: ${score}/100. Verification: ${feedback || "All criteria satisfied."}`);
  };

  const verifyDocuments = (appId) => {
    advanceStage(appId, 5, "Documents Verified", "Aadhaar, Educational Marksheets, Category Certificate, and Domicile verified.");
  };

  const generateOffer = (appId, offerData) => {
    const offerNo = `OPT/RAJ/2026/OFF-${Math.floor(100 + Math.random() * 900)}`;
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          currentStage: 6,
          status: "Offer Letter Issued",
          offerDetails: { ...offerData, offerNo, issuedDate: new Date().toISOString().substring(0, 10) },
          timeline: [
            ...app.timeline,
            { stage: 6, label: "Offer Letter Issued", date: new Date().toISOString(), note: `Govt Contract Offer #${offerNo}` }
          ]
        };
      }
      return app;
    }));
    logAction(`Offer letter ${offerNo} generated for ${appId}`, "Offer Letter");
    showToast(`Offer letter issued: ${offerNo}`);
  };

  const onboardEmployee = (appId) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    const empId = `OPT-EMP-${Date.now().toString(36).toUpperCase()}`;
    const newEmp = {
      empId,
      appId: app.id,
      name: app.fullName,
      designation: app.offerDetails?.designation || app.jobTitle,
      department: app.jobDepartment || "Panchayati Raj Department",
      district: app.district,
      block: app.block,
      agencyName: "Optatech Innovation Private Limited",
      doj: app.offerDetails?.joiningDate || new Date().toISOString().substring(0, 10),
      baseSalary: Number(app.offerDetails?.basePay) || 32000,
      status: "Active"
    };
    setEmployees(prev => [newEmp, ...prev]);
    advanceStage(appId, 7, "Onboarded & Deployed", `Assigned Employee ID: ${empId}`);
  };

  // ═══════════════════════════════════════════════════
  //  AGENCY ATTENDANCE & E-SIGN
  // ═══════════════════════════════════════════════════
  const recordAttendance = (data) => {
    const attId = `ATT-${Date.now().toString(36).toUpperCase()}`;
    setAttendanceRecords(prev => [{
      id: attId, ...data, agencyESigned: false, approvalStatus: "Draft",
      payrollGenerated: false, netPay: null
    }, ...prev]);
    logAction(`Attendance recorded for ${data.empName} (${data.month})`, "Attendance");
    showToast("Monthly attendance entry saved.");
  };

  const agencyESign = (attId, signerName) => {
    setAttendanceRecords(prev => prev.map(r => r.id === attId ? {
      ...r, agencyESigned: true, agencyOfficer: signerName,
      eSignTimestamp: new Date().toLocaleString("en-IN"),
      approvalStatus: "E-Signed & Authenticated"
    } : r));
    logAction(`Agency digital e-sign applied on ${attId} by ${signerName}`, "E-Sign");
    showToast(`${attId} digitally signed by authorized agency.`);
  };

  const generatePayroll = (attId) => {
    const rec = attendanceRecords.find(r => r.id === attId);
    if (!rec) return;
    const emp = employees.find(e => e.empId === rec.empId);
    const base = emp?.baseSalary || 32000;
    const gross = base + Math.round(base * 0.16) + Math.round(base * 0.4);
    const net = gross - Math.round(base * 0.12) - Math.round(base * 0.05);
    setAttendanceRecords(prev => prev.map(r => r.id === attId ? {
      ...r, payrollGenerated: true, netPay: net, approvalStatus: "Payroll Generated"
    } : r));
    logAction(`Payroll computed for ${rec.empName}: ₹${net.toLocaleString("en-IN")}`, "Payroll");
    showToast(`Payroll computed: ₹${net.toLocaleString("en-IN")} for ${rec.empName}`);
  };

  const bulkSalaryRelease = () => {
    setAttendanceRecords(prev => prev.map(r =>
      r.payrollGenerated && !r.approvalStatus?.includes("DBT Processed")
        ? { ...r, approvalStatus: `DBT Disbursed (UTR: RAJ${Date.now()})` }
        : r
    ));
    logAction("Bulk contractual salary released via Direct Benefit Transfer (DBT)", "DBT Salary Release");
    showToast("Bulk salary release executed via Direct Benefit Transfer (DBT).");
  };

  // ═══════════════════════════════════════════════════
  //  SYSTEM RESET
  // ═══════════════════════════════════════════════════
  const resetAll = () => {
    localStorage.clear();
    setRegisteredUser(null);
    setRegisteredCandidates([]);
    setAdminSession(null);
    setAgencySession(null);
    setApplications([]);
    setResumeRegistrations([]);
    setEmployees([]);
    setAttendanceRecords([]);
    setAuditLogs([]);
    setActiveRole(ROLES.CANDIDATE);
    showToast("System data reset successfully.", "info");
  };

  return (
    <WorkforceContext.Provider value={{
      activeRole, setActiveRole,
      // Candidate auth
      registeredUser, registerUser, loginCandidate, logoutUser,
      registeredCandidates,
      // Admin auth
      adminSession, loginAdmin, logoutAdmin,
      // Agency auth
      agencySession, loginAgency, logoutAgency,
      // Core datasets
      jobs,
      applications, submitApplication,
      resumeRegistrations, registerResume, contactCandidate,
      employees, attendanceRecords, auditLogs,
      WORKFLOW_STAGES,
      // Workflow actions
      advanceStage, scheduleInterview, recordSelection,
      verifyDocuments, generateOffer, onboardEmployee,
      recordAttendance, agencyESign, generatePayroll, bulkSalaryRelease,
      logAction, showToast, resetAll, toastMessage
    }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[9999] max-w-sm toast-enter">
          <div className={`flex items-start gap-3 px-5 py-4 rounded-xl shadow-2xl border-l-4 text-sm font-medium ${
            toastMessage.type === "success" ? "bg-white border-green-600 text-gray-800" :
            toastMessage.type === "error" ? "bg-white border-red-600 text-gray-800" :
            "bg-white border-blue-600 text-gray-800"
          }`}>
            <span className="text-xl">
              {toastMessage.type === "success" ? "✅" : toastMessage.type === "error" ? "❌" : "ℹ️"}
            </span>
            <div>
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                {toastMessage.type === "success" ? "Notification" : toastMessage.type === "error" ? "Error" : "Information"}
              </p>
              <p className="text-gray-800 leading-snug">{toastMessage.msg}</p>
            </div>
          </div>
        </div>
      )}
    </WorkforceContext.Provider>
  );
};

export const useWorkforce = () => {
  const ctx = useContext(WorkforceContext);
  if (!ctx) throw new Error("useWorkforce must be inside WorkforceProvider");
  return ctx;
};
