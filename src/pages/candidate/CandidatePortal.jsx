import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiArrowRight, FiCheckCircle, FiClock, FiUser,
  FiFileText, FiLock, FiAlertCircle, FiSearch, FiPhoneCall
} from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";
import { RAJASTHAN_DISTRICTS, WORKFLOW_STAGES } from "../../data/mockInitialData";

const CandidatePortal = () => {
  const {
    registeredUser, registerUser, loginCandidate, logoutUser,
    jobs, applications, submitApplication, registeredCandidates
  } = useWorkforce();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobIdFromUrl = searchParams.get("jobId");

  // Auth mode for unregistered view: "login" (returning candidate) vs "register" (new candidate)
  const [authMode, setAuthMode] = useState("register");
  const [quickAadhaar, setQuickAadhaar] = useState("");

  // View state: "register" | "apply" | "tracker"
  const [view, setView] = useState(
    registeredUser ? (jobIdFromUrl ? "apply" : "tracker") : "register"
  );

  // Registration form (Step 1: Aadhaar → Mobile → Email)
  const [regStep, setRegStep] = useState(1);
  const [regForm, setRegForm] = useState({
    aadhaarNo: "",
    mobile: "",
    email: "",
    fullName: "",
    gender: "Male"
  });

  // Application form (Step 2: Job details)
  const [appStep, setAppStep] = useState(jobIdFromUrl ? 2 : 1);
  const [appForm, setAppForm] = useState({
    jobId: jobIdFromUrl || "",
    district: "",
    block: "",
    panchayat: "",
    qualification: "",
    experience: "",
    category: "General",
    remarks: ""
  });

  // Selected application to inspect
  const [selectedAppId, setSelectedAppId] = useState(null);

  // If user is registered and arrives with jobId, jump to apply
  useEffect(() => {
    if (registeredUser && jobIdFromUrl) {
      setView("apply");
      setAppForm(prev => ({ ...prev, jobId: jobIdFromUrl }));
      setAppStep(2); // directly to filling specific details
    }
  }, [registeredUser, jobIdFromUrl]);

  // Sync view when registeredUser changes
  useEffect(() => {
    if (registeredUser && view === "register") {
      setView(jobIdFromUrl ? "apply" : "tracker");
    }
  }, [registeredUser, jobIdFromUrl, view]);

  // Get my applications
  const myApps = applications.filter(a => a.aadhaarNo?.replace(/\s+/g, "") === registeredUser?.aadhaarNo?.replace(/\s+/g, ""));
  const selectedApp = myApps.find(a => a.id === selectedAppId);
  const selectedJob = jobs.find(j => j.id === appForm.jobId);

  // ══════════════════════════════════════════
  //  RETURNING CANDIDATE LOGIN HANDLER
  // ══════════════════════════════════════════
  const handleQuickLogin = (e) => {
    e.preventDefault();
    if (!quickAadhaar.trim()) {
      alert("Please enter your registered 12-digit Aadhaar or 10-digit Mobile Number.");
      return;
    }
    const res = loginCandidate(quickAadhaar);
    if (res.success) {
      setView(jobIdFromUrl ? "apply" : "tracker");
      if (jobIdFromUrl) setAppStep(2);
    }
  };

  // ══════════════════════════════════════════
  //  NEW REGISTRATION HANDLERS
  // ══════════════════════════════════════════
  const handleRegStep1 = (e) => {
    e.preventDefault();
    const aadhaar = regForm.aadhaarNo.replace(/\s+/g, "");
    if (aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setRegStep(2);
  };

  const handleRegStep2 = (e) => {
    e.preventDefault();
    if (regForm.mobile.length < 10) { alert("Enter a valid 10-digit mobile number."); return; }
    if (!regForm.email.includes("@")) { alert("Enter a valid email address."); return; }
    setRegStep(3);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (!regForm.fullName.trim()) { alert("Enter your full name."); return; }
    registerUser(regForm);
    setView(jobIdFromUrl ? "apply" : "tracker");
    if (jobIdFromUrl) setAppStep(2);
  };

  // ══════════════════════════════════════════
  //  JOB APPLICATION HANDLERS
  // ══════════════════════════════════════════
  const handleAppSubmit = () => {
    if (!appForm.jobId) { alert("Please select a job to apply for."); return; }
    if (!appForm.district) { alert("Please select your district."); return; }
    if (!appForm.qualification) { alert("Please enter your qualification."); return; }

    const appData = {
      ...appForm,
      fullName: registeredUser.fullName,
      aadhaarNo: registeredUser.aadhaarNo,
      mobile: registeredUser.mobile,
      email: registeredUser.email,
      gender: registeredUser.gender
    };

    const newId = submitApplication(appData);
    setView("tracker");
    setSelectedAppId(newId);
    navigate("/apply", { replace: true });
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* ════════ PAGE HEADER ════════ */}
        <div className="bg-[#003366] text-white rounded-2xl p-6 sm:p-7 mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                Rozgar Rajasthan · Candidate Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-black mt-1">
                {view === "register"
                  ? "Candidate Registration & Login"
                  : view === "apply"
                  ? (jobIdFromUrl ? `Direct Application: ${selectedJob?.title || "Job Post"}` : "Submit Job Application")
                  : "My Applications & Stage Tracker"}
              </h1>
              <p className="text-xs text-gray-300 mt-1">
                {view === "register"
                  ? "Aadhaar verified recruitment under Department of Panchayati Raj, Rajasthan."
                  : view === "apply"
                  ? "Complete your application details to submit directly for official evaluation."
                  : "Monitor your application through all 12 stages from screening to DBT salary."}
              </p>
            </div>

            {/* Candidate Identity Tag if Logged In */}
            {registeredUser && (
              <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="text-gray-300 block text-[10px]">Logged In Candidate</span>
                  <strong className="text-white block font-bold">{registeredUser.fullName}</strong>
                  <span className="text-[10px] text-green-300 font-mono">UIDAI: {registeredUser.aadhaarNo}</span>
                </div>
                <button
                  onClick={logoutUser}
                  className="px-2 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded text-[10px] font-bold transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Tab Navigation if Logged In */}
          {registeredUser && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/15">
              <button
                onClick={() => setView("tracker")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  view === "tracker"
                    ? "bg-[#FF9933] text-[#001d3d] shadow-md"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <FiClock /> My Applications ({myApps.length})
              </button>

              <button
                onClick={() => { setView("apply"); setAppStep(jobIdFromUrl ? 2 : 1); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  view === "apply"
                    ? "bg-[#FF9933] text-[#001d3d] shadow-md"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <FiFileText /> Apply for a Job
              </button>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-xs font-bold bg-white/10 text-white/80 hover:bg-white/20 transition flex items-center gap-1.5"
              >
                📄 Submit Resume / Talent Pool
              </Link>
            </div>
          )}
        </div>

        {/* ════════ NOTICE BANNER: DIRECT APPLY VS NO OPENINGS ════════ */}
        {jobIdFromUrl && selectedJob && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-2xl mt-0.5">🎯</span>
            <div className="text-xs">
              <p className="font-extrabold text-[#003366] text-sm">
                Direct Application for: {selectedJob.title} ({selectedJob.id})
              </p>
              <p className="text-gray-600 mt-0.5">
                Posting: <strong>{selectedJob.district} ({selectedJob.block})</strong> · Salary: <strong className="text-green-700">{selectedJob.salaryRange}</strong> · Last Date: <strong className="text-red-600">{selectedJob.lastDate}</strong>
              </p>
            </div>
          </div>
        )}

        {/* ════════ VIEW 1: REGISTRATION & RETURNING STUDENT LOGIN ════════ */}
        {(!registeredUser || view === "register") && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 border-b border-gray-200 text-xs font-bold text-center bg-gray-50">
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`py-3.5 px-4 transition border-b-2 flex items-center justify-center gap-1.5 ${
                  authMode === "register"
                    ? "bg-white text-[#003366] border-[#FF9933] font-black"
                    : "text-gray-500 hover:text-gray-800 border-transparent"
                }`}
              >
                <FiUser className="text-sm text-[#FF9933]" />
                <span>New Candidate Registration (नया पंजीकरण)</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`py-3.5 px-4 transition border-b-2 flex items-center justify-center gap-1.5 ${
                  authMode === "login"
                    ? "bg-white text-[#003366] border-[#FF9933] font-black"
                    : "text-gray-500 hover:text-gray-800 border-transparent"
                }`}
              >
                <FiLock className="text-sm text-[#FF9933]" />
                <span>Already Registered Once? Log In (पूर्व पंजीकृत लॉगिन)</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* SUB-MODE A: RETURNING CANDIDATE LOGIN */}
              {authMode === "login" && (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-full flex items-center justify-center text-xl mx-auto mb-2">
                      🆔
                    </div>
                    <h2 className="text-base font-extrabold text-[#003366]">
                      Log In with Aadhaar or Mobile
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      If you registered previously or submitted an application/resume, enter your 12-digit Aadhaar or 10-digit mobile number.
                    </p>
                  </div>

                  <form onSubmit={handleQuickLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Aadhaar Number or Mobile Number *
                      </label>
                      <input
                        type="text"
                        placeholder="12-digit Aadhaar or 10-digit Mobile"
                        value={quickAadhaar}
                        onChange={(e) => setQuickAadhaar(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-center font-mono tracking-wider focus:ring-2 focus:ring-[#003366]"
                        required
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-sm rounded-lg shadow-md transition flex items-center justify-center gap-2"
                    >
                      Authenticate & Access Dashboard <FiArrowRight />
                    </button>
                  </form>

                  {/* Quick Select Candidates */}
                  {(registeredCandidates.length > 0 || applications.length > 0) && (
                    <div className="mt-6 p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl text-xs">
                      <p className="font-bold text-[#003366] mb-1.5 flex items-center gap-1">
                        👤 Previously Registered Candidates:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[...registeredCandidates, ...applications].slice(0, 3).map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setQuickAadhaar(c.aadhaarNo || c.mobile || "")}
                            className="bg-white border border-blue-300 text-blue-900 px-2 py-1 rounded text-[11px] font-semibold hover:bg-blue-100"
                          >
                            {c.fullName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <p>New to Rozgar Rajasthan?{" "}
                      <button
                        onClick={() => setAuthMode("register")}
                        className="text-[#003366] font-bold hover:underline"
                      >
                        Register with Aadhaar
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* SUB-MODE B: NEW REGISTRATION */}
              {authMode === "register" && (
                <div>
                  {/* Step indicators */}
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {[
                      { step: 1, label: "Aadhaar" },
                      { step: 2, label: "Contact" },
                      { step: 3, label: "Profile" }
                    ].map((s) => (
                      <React.Fragment key={s.step}>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${
                              regStep >= s.step
                                ? "bg-[#003366] text-white border-[#003366]"
                                : "bg-gray-100 text-gray-400 border-gray-300"
                            }`}
                          >
                            {s.step}
                          </div>
                          <span className={`text-xs font-bold hidden sm:inline ${regStep === s.step ? "text-[#003366]" : "text-gray-400"}`}>
                            {s.label}
                          </span>
                        </div>
                        {s.step < 3 && (
                          <div className={`w-10 h-0.5 ${regStep > s.step ? "bg-[#003366]" : "bg-gray-200"}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Step 1: Aadhaar */}
                  {regStep === 1 && (
                    <form onSubmit={handleRegStep1} className="max-w-md mx-auto space-y-5">
                      <div className="text-center mb-4">
                        <span className="text-3xl">🆔</span>
                        <h3 className="text-lg font-bold text-[#003366] mt-2">
                          Step 1: Enter 12-Digit Aadhaar Number
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Mandatory for identity verification and DBT payroll compliance.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Aadhaar Number (आधार संख्या) *
                        </label>
                        <input
                          type="text"
                          maxLength={14}
                          placeholder="XXXX XXXX XXXX"
                          value={regForm.aadhaarNo}
                          onChange={(e) => setRegForm({ ...regForm, aadhaarNo: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-[#003366]"
                          required
                          autoFocus
                        />
                        <p className="text-[10px] text-gray-400 mt-1 text-center">
                          Secured via UIDAI standards · Never shared publicly
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-md"
                      >
                        Verify & Continue <FiArrowRight />
                      </button>

                      <div className="text-center text-xs text-gray-500 pt-2">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setAuthMode("login")}
                          className="text-[#003366] font-bold hover:underline"
                        >
                          Log in directly
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Mobile + Email */}
                  {regStep === 2 && (
                    <form onSubmit={handleRegStep2} className="max-w-md mx-auto space-y-5">
                      <div className="text-center mb-4">
                        <span className="text-3xl">📱</span>
                        <h3 className="text-lg font-bold text-[#003366] mt-2">
                          Step 2: Mobile Number & Email Verification
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Recruitment notifications, interview calls, and offer letters will be dispatched here.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Mobile Number (मोबाइल नंबर) *
                        </label>
                        <div className="flex">
                          <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm font-medium text-gray-600">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="98290 XXXXX"
                            value={regForm.mobile}
                            onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value.replace(/\D/g, "") })}
                            className="flex-1 p-3 border border-gray-300 rounded-r-lg text-sm focus:ring-2 focus:ring-[#003366]"
                            required
                            autoFocus
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Email Address (ईमेल) *
                        </label>
                        <input
                          type="email"
                          placeholder="candidate@example.com"
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003366]"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setRegStep(1)}
                          className="px-5 py-3 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 text-sm"
                        >
                          <FiArrowLeft className="inline mr-1" /> Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-md"
                        >
                          Continue <FiArrowRight />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Name & Gender */}
                  {regStep === 3 && (
                    <form onSubmit={handleRegSubmit} className="max-w-md mx-auto space-y-5">
                      <div className="text-center mb-4">
                        <span className="text-3xl">👤</span>
                        <h3 className="text-lg font-bold text-[#003366] mt-2">
                          Step 3: Candidate Profile Details
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your name exactly as registered in official documents.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Full Name (पूरा नाम) *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Kumar Sharma"
                          value={regForm.fullName}
                          onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#003366]"
                          required
                          autoFocus
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Gender (लिंग) *
                        </label>
                        <select
                          value={regForm.gender}
                          onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                        >
                          <option value="Male">Male (पुरुष)</option>
                          <option value="Female">Female (महिला)</option>
                          <option value="Other">Other (अन्य)</option>
                        </select>
                      </div>

                      {/* Summary Box */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
                        <p className="font-bold text-[#003366] mb-1">Aadhaar Authentication Summary</p>
                        <p>Aadhaar: <strong className="font-mono">{regForm.aadhaarNo}</strong></p>
                        <p>Mobile: <strong>+91 {regForm.mobile}</strong></p>
                        <p>Email: <strong>{regForm.email}</strong></p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setRegStep(2)}
                          className="px-5 py-3 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 text-sm"
                        >
                          <FiArrowLeft className="inline mr-1" /> Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-md"
                        >
                          <FiCheckCircle /> Complete Registration & Proceed
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════ VIEW 2: APPLY DIRECTLY FOR JOB ════════ */}
        {view === "apply" && registeredUser && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {["Select Position", "Fill Qualification & Location", "Review & Confirm"].map((label, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${
                        appStep > i + 1
                          ? "bg-green-600 text-white border-green-600"
                          : appStep === i + 1
                          ? "bg-[#003366] text-white border-[#003366]"
                          : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                    >
                      {appStep > i + 1 ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[11px] font-bold hidden sm:inline ${
                        appStep === i + 1 ? "text-[#003366]" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`w-8 h-0.5 ${appStep > i + 1 ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* App Step 1: Select Job */}
            {appStep === 1 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#003366]">
                    Select Active Opening
                  </h3>
                  <Link
                    to="/register"
                    className="text-xs text-[#FF9933] font-bold hover:underline flex items-center gap-1"
                  >
                    No matching post? Submit resume instead →
                  </Link>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Choose Job Opening *
                  </label>
                  <select
                    value={appForm.jobId}
                    onChange={(e) => setAppForm({ ...appForm, jobId: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                    required
                  >
                    <option value="">-- Choose from active openings --</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} — {j.district} ({j.block}) • {j.openings} Posts • Last Date: {j.lastDate}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedJob && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-2">
                    <h4 className="font-bold text-[#003366] text-sm">{selectedJob.title}</h4>
                    <p className="text-gray-600">{selectedJob.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-blue-200/60">
                      <div><span className="text-gray-400 block">Salary</span> <strong className="text-green-700">{selectedJob.salaryRange}</strong></div>
                      <div><span className="text-gray-400 block">Qualification</span> <strong>{selectedJob.minQualification}</strong></div>
                      <div><span className="text-gray-400 block">Age Limit</span> <strong>{selectedJob.ageLimit}</strong></div>
                      <div><span className="text-gray-400 block">Last Date</span> <strong className="text-red-600">{selectedJob.lastDate}</strong></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <Link to="/jobs" className="text-xs text-gray-500 font-bold hover:text-[#003366]">
                    ← Browse All Jobs
                  </Link>
                  <button
                    onClick={() => {
                      if (!appForm.jobId) { alert("Please select a job opening."); return; }
                      setAppStep(2);
                    }}
                    className="px-6 py-2.5 bg-[#003366] hover:bg-[#004080] text-white font-bold text-sm rounded-lg transition flex items-center gap-2 shadow-sm"
                  >
                    Next: Fill Details <FiArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* App Step 2: Qualification & Location */}
            {appStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#003366]">
                    Qualification & District Preference
                  </h3>
                  {selectedJob && (
                    <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">
                      Applying for: {selectedJob.title}
                    </span>
                  )}
                </div>

                <div className="p-3 bg-gray-50 border rounded-xl text-xs flex items-center justify-between">
                  <div>
                    <span className="text-gray-500">Applicant:</span>{" "}
                    <strong>{registeredUser.fullName}</strong>
                  </div>
                  <span className="font-mono text-gray-500">Aadhaar: {registeredUser.aadhaarNo}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Preferred District (जिला) *
                    </label>
                    <select
                      value={appForm.district}
                      onChange={(e) => setAppForm({ ...appForm, district: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                      required
                    >
                      <option value="">-- Select District --</option>
                      {RAJASTHAN_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Block / Tehsil (ब्लॉक)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amber / Sanganer"
                      value={appForm.block}
                      onChange={(e) => setAppForm({ ...appForm, block: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Gram Panchayat (ग्राम पंचायत)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bilwa Gram Panchayat"
                      value={appForm.panchayat}
                      onChange={(e) => setAppForm({ ...appForm, panchayat: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Social Category (श्रेणी) *
                    </label>
                    <select
                      value={appForm.category}
                      onChange={(e) => setAppForm({ ...appForm, category: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                    >
                      <option value="General">General (सामान्य)</option>
                      <option value="OBC">OBC (अन्य पिछड़ा वर्ग)</option>
                      <option value="SC">SC (अनुसूचित जाति)</option>
                      <option value="ST">ST (अनुसूचित जनजाति)</option>
                      <option value="EWS">EWS (आर्थिक रूप से कमजोर वर्ग)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Highest Educational Qualification *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech Civil Engineering / B.Com / Diploma Computer Science"
                    value={appForm.qualification}
                    onChange={(e) => setAppForm({ ...appForm, qualification: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Relevant Work Experience (Months / Years)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 years in Govt / Panchayati Raj contractual work"
                    value={appForm.experience}
                    onChange={(e) => setAppForm({ ...appForm, experience: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Additional Skills / Remarks
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Certifications, RS-CIT, computer literacy, technical trades..."
                    value={appForm.remarks}
                    onChange={(e) => setAppForm({ ...appForm, remarks: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div className="flex gap-3 justify-between pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setAppStep(1)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <FiArrowLeft className="inline mr-1" /> Back
                  </button>
                  <button
                    onClick={() => {
                      if (!appForm.district || !appForm.qualification) {
                        alert("Please fill your district and qualification.");
                        return;
                      }
                      setAppStep(3);
                    }}
                    className="px-6 py-2.5 bg-[#003366] hover:bg-[#004080] text-white font-bold text-sm rounded-lg transition flex items-center gap-2 shadow-sm"
                  >
                    Review Application <FiArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* App Step 3: Review & Submit */}
            {appStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-base font-extrabold text-[#003366]">
                  Review & Confirm Your Application
                </h3>

                <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 text-xs overflow-hidden">
                  <div className="p-4 bg-blue-50">
                    <h4 className="font-bold text-[#003366] text-sm mb-0.5">Position Applied For</h4>
                    <p className="font-extrabold text-gray-900">{selectedJob?.title || "Contractual Post"}</p>
                    <p className="text-gray-500">{selectedJob?.department} · Remuneration: {selectedJob?.salaryRange}</p>
                  </div>
                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white">
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Candidate Name</span><strong>{registeredUser.fullName}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Aadhaar</span><strong className="font-mono">{registeredUser.aadhaarNo}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Mobile</span><strong>+91 {registeredUser.mobile}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Email</span><strong>{registeredUser.email}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Posting District</span><strong>{appForm.district}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Block / Panchayat</span><strong>{appForm.block || "—"} / {appForm.panchayat || "—"}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Qualification</span><strong>{appForm.qualification}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Experience</span><strong>{appForm.experience || "Fresh Candidate"}</strong></div>
                    <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Category</span><strong>{appForm.category}</strong></div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <span className="text-base mt-0.5">⚠️</span>
                  <p>
                    <strong>Declaration:</strong> I hereby certify that the information entered is accurate as per my Aadhaar and academic marksheets. An official tracking ID will be generated upon submission.
                  </p>
                </div>

                <div className="flex gap-3 justify-between pt-2">
                  <button
                    onClick={() => setAppStep(2)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <FiArrowLeft className="inline mr-1" /> Edit Details
                  </button>
                  <button
                    onClick={handleAppSubmit}
                    className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-extrabold text-sm rounded-lg transition flex items-center gap-2 shadow-md"
                  >
                    <FiCheckCircle /> Submit Application Directly
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════ VIEW 3: APPLICATION TRACKER ════════ */}
        {view === "tracker" && registeredUser && (
          <div className="space-y-5">
            {myApps.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
                <span className="text-4xl block mb-3">📭</span>
                <h3 className="text-base font-extrabold text-gray-800 mb-1">No Active Applications Found</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-md mx-auto">
                  You have not submitted an application yet for any open vacancy. You can apply directly to an open post or register your resume.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/jobs"
                    className="px-5 py-2.5 bg-[#003366] hover:bg-[#004080] text-white text-xs font-bold rounded-lg shadow-sm transition"
                  >
                    Browse Active Openings
                  </Link>
                  <button
                    onClick={() => { setView("apply"); setAppStep(1); }}
                    className="px-5 py-2.5 bg-[#FF9933] text-[#001d3d] text-xs font-bold rounded-lg shadow-sm hover:bg-[#e68a00] transition"
                  >
                    Apply Now
                  </button>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition"
                  >
                    Submit Resume to Talent Pool
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-extrabold text-[#003366]">
                    Submitted Applications ({myApps.length})
                  </h2>
                  <span className="text-xs text-gray-500">
                    Click any application to inspect stage timeline
                  </span>
                </div>

                {myApps.map((app) => (
                  <div
                    key={app.id}
                    className={`bg-white rounded-2xl border p-5 cursor-pointer transition hover:shadow-md ${
                      selectedAppId === app.id ? "border-[#003366] shadow-md ring-1 ring-[#003366]" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedAppId(selectedAppId === app.id ? null : app.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-[#003366] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {app.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              app.currentStage >= 6
                                ? "bg-green-100 text-green-800"
                                : app.currentStage >= 3
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            Stage {app.currentStage} of 12
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">{app.jobTitle}</h3>
                        <p className="text-[11px] text-gray-500">
                          {app.jobDepartment} · Applied: {app.appliedDate} · Posting: {app.district}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-[#003366] block">{app.status}</span>
                        <span className="text-[10px] text-gray-400">
                          {selectedAppId === app.id ? "▲ Click to collapse" : "▼ Click to view 12-stage details"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded: 12-Stage Timeline */}
                    {selectedAppId === app.id && (
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-[#003366] mb-3">Recruitment & Governance Lifecycle Tracker</h4>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {WORKFLOW_STAGES.map((stage) => (
                            <div
                              key={stage.id}
                              className={`px-2 py-1 rounded text-[10px] font-bold border ${
                                app.currentStage > stage.id
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : app.currentStage === stage.id
                                  ? "bg-[#003366] text-white border-[#003366]"
                                  : "bg-gray-50 text-gray-400 border-gray-200"
                              }`}
                            >
                              {stage.id}. {stage.name}
                            </div>
                          ))}
                        </div>

                        {/* Interview info if scheduled */}
                        {app.interviewDate && (
                          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs mb-3 text-purple-900">
                            <strong>📢 Interview Scheduled:</strong> {app.interviewDate} at {app.interviewVenue}
                          </div>
                        )}

                        {/* Offer letter if issued */}
                        {app.offerDetails && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs mb-3 text-green-900">
                            <strong>🎉 Offer Letter Issued:</strong> Offer #{app.offerDetails.offerNo} · Designation: {app.offerDetails.designation} · Base Pay: ₹{app.offerDetails.basePay?.toLocaleString("en-IN")}
                          </div>
                        )}

                        {/* Timeline logs */}
                        <div className="space-y-2.5">
                          {app.timeline?.map((event, i) => (
                            <div key={i} className="flex items-start gap-3 text-xs">
                              <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                                {event.stage}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">{event.label}</p>
                                <p className="text-gray-500 text-[11px]">{event.note}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                  {new Date(event.date).toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CandidatePortal;
