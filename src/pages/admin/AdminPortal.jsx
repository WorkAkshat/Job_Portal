import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers, FiDollarSign, FiShield, FiSend, FiFileText,
  FiMail, FiPhone, FiCheckCircle, FiLock, FiLogOut, FiArrowRight, FiInfo
} from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";
import { WORKFLOW_STAGES } from "../../data/mockInitialData";

const AdminPortal = () => {
  const {
    adminSession, loginAdmin, logoutAdmin,
    applications, resumeRegistrations, contactCandidate,
    employees, attendanceRecords, auditLogs,
    advanceStage, scheduleInterview, recordSelection, verifyDocuments,
    generateOffer, onboardEmployee, generatePayroll, bulkSalaryRelease
  } = useWorkforce();

  // Tab state: "pipeline" | "talentpool" | "payroll" | "employees" | "audit"
  const [tab, setTab] = useState("pipeline");

  // Admin login credentials state for unauthenticated gate
  const [adminUser, setAdminUser] = useState("admin@optatechinnovation.com");
  const [adminPass, setAdminPass] = useState("Admin@123");

  // Modals: interview, selection, offer, contactCandidate
  const [modal, setModal] = useState(null);
  const [interviewForm, setInterviewForm] = useState({ date: "2026-10-15", venue: "District Collectorate, Jaipur" });
  const [selectionForm, setSelectionForm] = useState({ score: 85, feedback: "All educational and trade certificates verified." });
  const [offerForm, setOfferForm] = useState({ designation: "", basePay: 35400, joiningDate: "2026-11-01" });
  const [contactMsg, setContactMsg] = useState("We have an upcoming opening matching your qualification in Panchayati Raj. Please confirm your availability.");

  const tabs = [
    { id: "pipeline", label: `Recruitment Pipeline (${applications.length})`, icon: FiUsers },
    { id: "talentpool", label: `Talent Pool Resumes (${resumeRegistrations.length})`, icon: FiFileText },
    { id: "payroll", label: "Payroll & DBT", icon: FiDollarSign },
    { id: "employees", label: `Employees (${employees.length})`, icon: FiUsers },
    { id: "audit", label: `Audit Trail (${auditLogs.length})`, icon: FiShield },
  ];

  // ══════════════════════════════════════════════
  //  UNAUTHENTICATED GATE (LOGIN REQUIRED)
  // ══════════════════════════════════════════════
  if (!adminSession) {
    return (
      <div className="bg-[#f8f9fa] min-h-[calc(100vh-140px)] py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#003366] flex items-center justify-center text-3xl mx-auto mb-4">
            <FiShield />
          </div>

          <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-[#FF9933]/15 px-2.5 py-1 rounded">
            Restricted Government Portal
          </span>
          <h1 className="text-xl font-black text-[#003366] mt-2 mb-1">
            Department Administrator Login
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Authentication required to inspect candidate pipelines, resume talent pools, and release DBT payroll.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(adminUser, adminPass);
            }}
            className="space-y-4 text-left"
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Admin Email / Username *
              </label>
              <input
                type="text"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                placeholder="admin@optatechinnovation.com"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Security Password *
              </label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 flex items-center justify-between">
              <div>
                <span className="font-bold">Official Demo Credentials:</span>
                <p className="font-mono text-gray-700">admin@optatechinnovation.com / Admin@123</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAdminUser("admin@optatechinnovation.com");
                  setAdminPass("Admin@123");
                }}
                className="text-[10px] bg-[#003366] text-white font-bold px-2 py-1 rounded"
              >
                Auto Fill
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center gap-2"
            >
              <FiLock /> Sign In to Admin Console
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <Link to="/login" className="text-[#003366] font-bold hover:underline">
              Switch to Candidate or Agency Login →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  //  AUTHENTICATED ADMIN CONSOLE
  // ══════════════════════════════════════════════
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Console Header */}
        <div className="bg-[#003366] text-white rounded-2xl p-6 sm:p-7 mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                Govt of Rajasthan · Panchayati Raj Recruitment Console
              </span>
              <h1 className="text-xl sm:text-2xl font-black mt-1">
                Centralized Administration & Governance Portal
              </h1>
              <p className="text-xs text-gray-300 mt-1">
                Managed by Optatech Innovation Private Limited · Authenticated as <strong>{adminSession.fullName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <FiLogOut /> Logout Admin
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/15">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                    tab === t.id
                      ? "bg-[#FF9933] text-[#001d3d] shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white/80"
                  }`}
                >
                  <Icon className="text-sm" /> {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════ TAB 1: RECRUITMENT PIPELINE ════════ */}
        {tab === "pipeline" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#003366]">
                  Candidate Job Applications (Stages 1–7)
                </h3>
                <p className="text-xs text-gray-500">
                  Applications submitted directly to open vacancies. Advance candidate stages below.
                </p>
              </div>
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Total: {applications.length}
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-bold text-gray-600 mb-1">No direct job applications received yet.</p>
                <p className="text-xs">Candidates apply through the candidate portal or job listings page.</p>
              </div>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b">
                  <tr>
                    <th className="p-3">Application / Candidate</th>
                    <th className="p-3">Applied Position</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Current Stage</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Workflow Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/80">
                      <td className="p-3">
                        <strong className="block text-gray-900 text-sm">{app.fullName}</strong>
                        <span className="text-[10px] text-gray-400 font-mono">{app.id} · Aadhaar: {app.aadhaarNo}</span>
                      </td>
                      <td className="p-3 font-semibold text-gray-800">{app.jobTitle}</td>
                      <td className="p-3 text-gray-600">{app.district}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-blue-50 text-[#003366] border border-blue-200">
                          Stage {app.currentStage} of 12
                        </span>
                      </td>
                      <td className="p-3 font-bold text-gray-700">{app.status}</td>
                      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                        {app.currentStage === 1 && (
                          <button
                            onClick={() => advanceStage(app.id, 2, "Shortlisted for Screening")}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Shortlist
                          </button>
                        )}
                        {app.currentStage === 2 && (
                          <button
                            onClick={() => setModal({ type: "interview", app })}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Schedule Interview
                          </button>
                        )}
                        {app.currentStage === 3 && (
                          <button
                            onClick={() => setModal({ type: "selection", app })}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Record Selection
                          </button>
                        )}
                        {app.currentStage === 4 && (
                          <button
                            onClick={() => verifyDocuments(app.id)}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Verify Documents
                          </button>
                        )}
                        {app.currentStage === 5 && (
                          <button
                            onClick={() => setModal({ type: "offer", app })}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Issue Offer Letter
                          </button>
                        )}
                        {app.currentStage === 6 && (
                          <button
                            onClick={() => onboardEmployee(app.id)}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[11px] font-bold"
                          >
                            Onboard Employee
                          </button>
                        )}
                        {app.currentStage >= 7 && (
                          <span className="text-green-700 font-bold text-[11px]">✓ Onboarded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ════════ TAB 2: TALENT POOL & SUBMITTED RESUMES ════════ */}
        {tab === "talentpool" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#003366]">
                  State Talent Pool — Candidates Registered When No Openings Existed
                </h3>
                <p className="text-xs text-gray-500">
                  Students who submitted their profile & resume for upcoming vacancies. You can contact and invite them to apply directly.
                </p>
              </div>
              <span className="text-xs font-bold text-[#003366] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {resumeRegistrations.length} Candidates in Pool
              </span>
            </div>

            {resumeRegistrations.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-bold text-gray-600 mb-1">No resumes submitted into the talent pool yet.</p>
                <p className="text-xs">
                  Students submit resumes via the "Submit Resume / Register Profile" page when no jobs are open.
                </p>
              </div>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b">
                  <tr>
                    <th className="p-3">Candidate / ID</th>
                    <th className="p-3">Qualification & Skills</th>
                    <th className="p-3">Preferred District</th>
                    <th className="p-3">Department Target</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {resumeRegistrations.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/80">
                      <td className="p-3">
                        <strong className="block text-gray-900 text-sm">{r.fullName}</strong>
                        <span className="text-[10px] text-gray-400 font-mono">{r.id}</span>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          📞 +91 {r.mobile} · ✉️ {r.email}
                        </div>
                      </td>
                      <td className="p-3">
                        <strong className="text-gray-800">{r.highestQualification}</strong>
                        <span className="text-gray-400 block text-[10px]">{r.university || "University"} · Year: {r.passingYear}</span>
                        <span className="text-gray-600 text-[11px] block mt-0.5">Trade: {r.skills || "General"}</span>
                      </td>
                      <td className="p-3 font-semibold text-[#003366]">
                        {r.preferredDistrict || "Any District"}
                      </td>
                      <td className="p-3 text-gray-600">{r.preferredDepartment}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            r.status?.includes("Contacted")
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {r.status}
                        </span>
                        {r.lastContacted && (
                          <span className="text-[10px] text-gray-400 block mt-0.5">
                            Sent: {r.lastContacted}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setModal({ type: "contactCandidate", resume: r })}
                          className="px-3.5 py-1.5 bg-[#003366] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 ml-auto"
                        >
                          <FiPhone className="text-xs" /> Contact Candidate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ════════ TAB 3: PAYROLL & DBT ════════ */}
        {tab === "payroll" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#003366]">
                  Statutory Payroll & Direct Benefit Transfer (DBT)
                </h3>
                <p className="text-xs text-gray-500">
                  Electronic salary release for attendance verified by Partner Agency.
                </p>
              </div>
              <button
                onClick={bulkSalaryRelease}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition"
              >
                <FiSend /> Execute Bulk DBT Disbursal
              </button>
            </div>

            {attendanceRecords.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-10">
                No attendance sheets submitted yet. Agency partner enters monthly attendance.
              </p>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b">
                  <tr>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Month</th>
                    <th className="p-3">Agency E-Sign</th>
                    <th className="p-3">Net Disbursal</th>
                    <th className="p-3">DBT Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendanceRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <strong className="text-gray-900">{r.empName}</strong>
                        <span className="text-[10px] text-gray-400 block font-mono">{r.empId}</span>
                      </td>
                      <td className="p-3 font-medium">{r.month}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold ${
                            r.agencyESigned ? "text-green-700" : "text-amber-700"
                          }`}
                        >
                          {r.agencyESigned ? "✓ Authenticated" : "Pending E-Sign"}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-gray-900">
                        {r.netPay ? `₹${r.netPay.toLocaleString("en-IN")}` : "—"}
                      </td>
                      <td className="p-3 text-[11px] font-medium text-gray-600">{r.approvalStatus}</td>
                      <td className="p-3 text-right">
                        {r.agencyESigned && !r.payrollGenerated && (
                          <button
                            onClick={() => generatePayroll(r.id)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded text-[10px] font-bold"
                          >
                            Compute Payroll
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ════════ TAB 4: EMPLOYEES ════════ */}
        {tab === "employees" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-[#003366] mb-4">
              Active Contractual Employees
            </h3>
            {employees.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-10">No employees onboarded yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employees.map((e) => (
                  <div key={e.empId} className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-gray-900 text-sm">{e.name}</strong>
                      <span className="text-[10px] font-mono text-[#003366] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {e.empId}
                      </span>
                    </div>
                    <p className="text-gray-700">{e.designation} · {e.department}</p>
                    <p className="text-gray-500">Posting: {e.district} ({e.block}) · Salary: ₹{e.baseSalary?.toLocaleString("en-IN")}</p>
                    <span className="inline-block text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      ● Active Deployed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════ TAB 5: AUDIT TRAIL ════════ */}
        {tab === "audit" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-[#003366] mb-4">
              Immutable Governance Audit Logs ({auditLogs.length} events)
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-gray-50 rounded-xl text-xs flex justify-between gap-4 border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] mr-2">
                      {log.category}
                    </span>
                    <span className="text-gray-800">{log.action}</span>
                    <span className="text-gray-400 block text-[10px] mt-0.5">Actor: {log.user}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Modals ── */}
      {modal?.type === "contactCandidate" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              contactCandidate(modal.resume.id, contactMsg);
              setModal(null);
            }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl text-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-[#003366]">
              Contact Candidate for Upcoming Opening
            </h3>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 space-y-1">
              <p><strong>Candidate:</strong> {modal.resume.fullName}</p>
              <p><strong>Mobile:</strong> +91 {modal.resume.mobile}</p>
              <p><strong>Qualification:</strong> {modal.resume.highestQualification}</p>
              <p><strong>Preferred District:</strong> {modal.resume.preferredDistrict}</p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Notification Message (SMS & Email) *
              </label>
              <textarea
                rows={3}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-lg text-gray-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#003366] text-white font-bold rounded-lg shadow-sm"
              >
                Send Notification
              </button>
            </div>
          </form>
        </div>
      )}

      {modal?.type === "interview" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              scheduleInterview(modal.app.id, interviewForm);
              setModal(null);
            }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl text-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-[#003366]">Schedule Interview</h3>
            <p className="text-gray-500">Candidate: <strong>{modal.app.fullName}</strong></p>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Interview Date *</label>
              <input
                type="date"
                value={interviewForm.date}
                onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Venue *</label>
              <input
                type="text"
                value={interviewForm.venue}
                onChange={(e) => setInterviewForm({ ...interviewForm, venue: e.target.value })}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 text-white font-bold rounded-lg"
              >
                Schedule & Notify
              </button>
            </div>
          </form>
        </div>
      )}

      {modal?.type === "selection" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              recordSelection(modal.app.id, selectionForm.score, selectionForm.feedback);
              setModal(null);
            }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl text-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-[#003366]">Record Selection Decision</h3>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Merit Score (out of 100) *</label>
              <input
                type="number"
                min="0"
                max="100"
                value={selectionForm.score}
                onChange={(e) => setSelectionForm({ ...selectionForm, score: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-lg font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Panel Remarks</label>
              <textarea
                rows={2}
                value={selectionForm.feedback}
                onChange={(e) => setSelectionForm({ ...selectionForm, feedback: e.target.value })}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-green-600 text-white font-bold rounded-lg"
              >
                Approve Selection
              </button>
            </div>
          </form>
        </div>
      )}

      {modal?.type === "offer" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateOffer(modal.app.id, offerForm);
              setModal(null);
            }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl text-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-[#003366]">Generate Offer Letter</h3>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                value={offerForm.designation || modal.app.jobTitle}
                onChange={(e) => setOfferForm({ ...offerForm, designation: e.target.value })}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Monthly Basic Pay (₹)</label>
              <input
                type="number"
                value={offerForm.basePay}
                onChange={(e) => setOfferForm({ ...offerForm, basePay: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Joining Date</label>
              <input
                type="date"
                value={offerForm.joiningDate}
                onChange={(e) => setOfferForm({ ...offerForm, joiningDate: e.target.value })}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-cyan-600 text-white font-bold rounded-lg"
              >
                Generate & Issue
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
