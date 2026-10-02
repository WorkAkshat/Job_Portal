import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { FiUser, FiShield, FiBriefcase, FiLock, FiCheckCircle, FiArrowRight, FiInfo } from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get("role"); // "candidate" | "admin" | "agency"

  const {
    registeredUser, loginCandidate,
    adminSession, loginAdmin,
    agencySession, loginAgency,
    registeredCandidates, applications
  } = useWorkforce();

  const [activeTab, setActiveTab] = useState(
    roleParam === "admin" ? "admin" : roleParam === "agency" ? "agency" : "candidate"
  );

  // Candidate login fields
  const [candidateIdentifier, setCandidateIdentifier] = useState("");

  // Admin login fields
  const [adminUser, setAdminUser] = useState("admin@optatechinnovation.com");
  const [adminPass, setAdminPass] = useState("Admin@123");

  // Agency login fields
  const [agencyUser, setAgencyUser] = useState("agency@optatechinnovation.com");
  const [agencyPass, setAgencyPass] = useState("Agency@123");

  // Sync tab with URL if param changes
  useEffect(() => {
    if (roleParam === "admin") setActiveTab("admin");
    else if (roleParam === "agency") setActiveTab("agency");
    else if (roleParam === "candidate") setActiveTab("candidate");
  }, [roleParam]);

  // Handle Candidate Login
  const handleCandidateLogin = (e) => {
    e.preventDefault();
    const res = loginCandidate(candidateIdentifier);
    if (res.success) {
      navigate("/apply");
    }
  };

  // Handle Admin Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    const res = loginAdmin(adminUser, adminPass);
    if (res.success) {
      navigate("/admin");
    }
  };

  // Handle Agency Login
  const handleAgencyLogin = (e) => {
    e.preventDefault();
    const res = loginAgency(agencyUser, agencyPass);
    if (res.success) {
      navigate("/agency");
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-140px)] py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-xl w-full">

        {/* Govt Badge Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#003366] text-white text-2xl font-black shadow-lg mb-3">
            🏛
          </div>
          <h1 className="text-2xl font-extrabold text-[#003366] tracking-tight">
            रोज़गार राजस्थान — आधिकारिक लॉगिन
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Department of Panchayati Raj, Rajasthan · Optatech Innovation Portal
          </p>
        </div>

        {/* Tab Selector */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 text-xs font-bold text-center">
            <button
              onClick={() => setActiveTab("candidate")}
              className={`py-3.5 px-2 flex items-center justify-center gap-1.5 transition border-b-2 ${
                activeTab === "candidate"
                  ? "bg-white text-[#003366] border-[#FF9933] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-900 border-transparent"
              }`}
            >
              <FiUser className="text-sm text-[#FF9933]" />
              <span>अभ्यर्थी (Candidate)</span>
            </button>

            <button
              onClick={() => setActiveTab("agency")}
              className={`py-3.5 px-2 flex items-center justify-center gap-1.5 transition border-b-2 ${
                activeTab === "agency"
                  ? "bg-white text-[#003366] border-[#FF9933] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-900 border-transparent"
              }`}
            >
              <FiBriefcase className="text-sm text-[#FF9933]" />
              <span>एजेंसी (Agency)</span>
            </button>

            <button
              onClick={() => setActiveTab("admin")}
              className={`py-3.5 px-2 flex items-center justify-center gap-1.5 transition border-b-2 ${
                activeTab === "admin"
                  ? "bg-white text-[#003366] border-[#FF9933] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-900 border-transparent"
              }`}
            >
              <FiShield className="text-sm text-[#FF9933]" />
              <span>प्रशासन (Admin)</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">

            {/* ════════ TAB 1: CANDIDATE LOGIN ════════ */}
            {activeTab === "candidate" && (
              <div>
                <div className="mb-5">
                  <h2 className="text-base font-bold text-[#003366] flex items-center gap-2">
                    <FiUser className="text-[#FF9933]" /> Registered Candidate Login
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    If you have registered previously or applied for any post, enter your 12-digit Aadhaar Number or 10-digit Mobile Number to access your dashboard.
                  </p>
                </div>

                {registeredUser ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4 text-xs">
                    <p className="text-green-800 font-bold flex items-center gap-1 mb-1">
                      <FiCheckCircle className="text-sm" /> Already Logged In
                    </p>
                    <p className="text-gray-700">
                      Logged in as <strong>{registeredUser.fullName}</strong> (Aadhaar: {registeredUser.aadhaarNo})
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => navigate("/apply")}
                        className="px-4 py-2 bg-[#003366] text-white rounded-lg font-bold text-xs hover:bg-[#004080] transition"
                      >
                        Go to My Applications & Tracker →
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCandidateLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Registered Aadhaar Number or Mobile Number *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 12-digit Aadhaar or 10-digit Mobile"
                        value={candidateIdentifier}
                        onChange={(e) => setCandidateIdentifier(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent font-medium"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-sm rounded-lg shadow-md transition flex items-center justify-center gap-2"
                    >
                      Log In to Candidate Portal <FiArrowRight />
                    </button>
                  </form>
                )}

                {/* Quick select recently registered candidates if any */}
                {(registeredCandidates.length > 0 || applications.length > 0) && !registeredUser && (
                  <div className="mt-5 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs">
                    <p className="font-bold text-[#003366] mb-1.5 flex items-center gap-1">
                      <FiInfo /> Previously Registered on this device:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[...registeredCandidates, ...applications]
                        .slice(0, 3)
                        .map((c, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setCandidateIdentifier(c.aadhaarNo || c.mobile || "");
                            }}
                            className="bg-white border border-blue-300 text-blue-900 px-2.5 py-1 rounded-md text-[11px] font-medium hover:bg-blue-100 transition"
                          >
                            👤 {c.fullName} ({c.aadhaarNo ? c.aadhaarNo.slice(-4) : "Aadhaar"})
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Registration link if not yet registered */}
                <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs space-y-2">
                  <p className="text-gray-500">Not registered yet on Rozgar Rajasthan?</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Link
                      to="/apply"
                      className="inline-block px-3 py-1.5 bg-[#FF9933]/15 text-[#001d3d] hover:bg-[#FF9933]/25 font-bold rounded-lg transition"
                    >
                      📝 New Candidate Registration
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                      to="/register"
                      className="inline-block px-3 py-1.5 bg-blue-50 text-[#003366] hover:bg-blue-100 font-bold rounded-lg transition"
                    >
                      📄 Submit Resume to Talent Pool
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ════════ TAB 2: AGENCY LOGIN ════════ */}
            {activeTab === "agency" && (
              <div>
                <div className="mb-5">
                  <h2 className="text-base font-bold text-[#003366] flex items-center gap-2">
                    <FiBriefcase className="text-[#FF9933]" /> Authorized Agency Partner Portal
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Designated manpower agency officers: submit monthly attendance sheets, staff rosters, and apply digital e-signatures.
                  </p>
                </div>

                {agencySession ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4 text-xs">
                    <p className="text-green-800 font-bold flex items-center gap-1 mb-1">
                      <FiCheckCircle className="text-sm" /> Agency Authenticated
                    </p>
                    <p className="text-gray-700">
                      Logged in as <strong>{agencySession.officerName}</strong> ({agencySession.agencyName})
                    </p>
                    <div className="mt-3">
                      <button
                        onClick={() => navigate("/agency")}
                        className="px-4 py-2 bg-[#003366] text-white rounded-lg font-bold text-xs hover:bg-[#004080] transition"
                      >
                        Proceed to Agency Console →
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAgencyLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Agency ID / Official Email *
                      </label>
                      <input
                        type="text"
                        value={agencyUser}
                        onChange={(e) => setAgencyUser(e.target.value)}
                        placeholder="agency@optatechinnovation.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#003366]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Security Password *
                      </label>
                      <input
                        type="password"
                        value={agencyPass}
                        onChange={(e) => setAgencyPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#003366]"
                        required
                      />
                    </div>

                    {/* Demo credential badge */}
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-center justify-between">
                      <div>
                        <span className="font-bold">Authorized Partner Demo Credentials:</span>
                        <div className="font-mono text-gray-700 mt-0.5">
                          agency@optatechinnovation.com / Agency@123
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAgencyUser("agency@optatechinnovation.com");
                          setAgencyPass("Agency@123");
                        }}
                        className="text-[10px] bg-amber-600 text-white font-bold px-2 py-1 rounded hover:bg-amber-700"
                      >
                        Auto Fill
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-sm rounded-lg shadow-md transition flex items-center justify-center gap-2"
                    >
                      Authenticate Agency Partner <FiArrowRight />
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ════════ TAB 3: ADMIN LOGIN ════════ */}
            {activeTab === "admin" && (
              <div>
                <div className="mb-5">
                  <h2 className="text-base font-bold text-[#003366] flex items-center gap-2">
                    <FiShield className="text-[#FF9933]" /> Department Administrator Console
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    State Nodal Officers & Recruitment Cell: manage candidate applications, review talent pool resumes, issue offer letters, and disburse DBT payroll.
                  </p>
                </div>

                {adminSession ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4 text-xs">
                    <p className="text-green-800 font-bold flex items-center gap-1 mb-1">
                      <FiCheckCircle className="text-sm" /> Admin Console Authenticated
                    </p>
                    <p className="text-gray-700">
                      Logged in as <strong>{adminSession.fullName}</strong> ({adminSession.department})
                    </p>
                    <div className="mt-3">
                      <button
                        onClick={() => navigate("/admin")}
                        className="px-4 py-2 bg-[#003366] text-white rounded-lg font-bold text-xs hover:bg-[#004080] transition"
                      >
                        Enter Administrator Console →
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Admin Official Email / Username *
                      </label>
                      <input
                        type="text"
                        value={adminUser}
                        onChange={(e) => setAdminUser(e.target.value)}
                        placeholder="admin@optatechinnovation.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#003366]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Administrative Password *
                      </label>
                      <input
                        type="password"
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#003366]"
                        required
                      />
                    </div>

                    {/* Demo credential badge */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 flex items-center justify-between">
                      <div>
                        <span className="font-bold">Department Admin Demo Credentials:</span>
                        <div className="font-mono text-gray-700 mt-0.5">
                          admin@optatechinnovation.com / Admin@123
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminUser("admin@optatechinnovation.com");
                          setAdminPass("Admin@123");
                        }}
                        className="text-[10px] bg-[#003366] text-white font-bold px-2 py-1 rounded hover:bg-[#004080]"
                      >
                        Auto Fill
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-sm rounded-lg shadow-md transition flex items-center justify-center gap-2"
                    >
                      Authenticate Admin Console <FiArrowRight />
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Security Footer Notice */}
        <div className="text-center mt-6 text-[11px] text-gray-500">
          <p className="flex items-center justify-center gap-1">
            <FiLock className="text-[#003366]" /> 256-bit SSL Encrypted & Aadhaar Verified Portal
          </p>
          <p className="mt-0.5 text-gray-400">
            Optatech Innovation Private Limited · For technical assistance, call Toll-Free: 1800-180-6127
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
