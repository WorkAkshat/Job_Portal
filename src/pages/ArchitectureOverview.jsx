import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiLayers,
  FiUsers,
  FiGitCommit,
  FiServer,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiDatabase,
  FiMail,
  FiFileText,
  FiLock,
  FiCpu
} from "react-icons/fi";
import StageTracker from "../components/workflow/StageTracker";

const ArchitectureOverview = () => {
  const [activeTab, setActiveTab] = useState("flow");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Header / Title Card */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-emerald-800/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-emerald-500 text-black text-xs font-black uppercase tracking-wider rounded-md">
                  OPTATECH INNOVATION
                </span>
                <span className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                  WE BUILD. WE MARKET. WE SCALE.
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Building a Digitally Empowered <br />
                <span className="text-emerald-400">Panchayati Workforce</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl leading-relaxed">
                A unified platform for recruitment, resource management, and operational governance developed by <strong>Optatech Innovation Private Limited</strong> for the Government of Rajasthan.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10 text-xs space-y-2 text-right">
              <p className="text-emerald-400 font-bold uppercase tracking-wider">Business Outcome</p>
              <p className="text-gray-300">A structured, traceable, and scalable digital operating model.</p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <span className="px-2 py-0.5 bg-emerald-900/80 text-emerald-200 rounded text-[10px] font-bold">CENTRALIZED</span>
                <span className="px-2 py-0.5 bg-blue-900/80 text-blue-200 rounded text-[10px] font-bold">TRACEABLE</span>
                <span className="px-2 py-0.5 bg-purple-900/80 text-purple-200 rounded text-[10px] font-bold">SCALABLE</span>
              </div>
            </div>
          </div>

          {/* Navigation Bar between blueprints */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2 relative z-10">
            {[
              { id: "flow", label: "04 • 12-Stage End-to-End Flow", icon: FiGitCommit },
              { id: "roles", label: "03 • User Roles & Access Matrix", icon: FiUsers },
              { id: "arch", label: "05 • Proposed 3-Tier Architecture", icon: FiServer },
              { id: "pillars", label: "02 • Executive Overview & 5 Pillars", icon: FiLayers }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/30 scale-105"
                      : "bg-white/10 text-gray-200 hover:bg-white/20"
                  }`}
                >
                  <Icon /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: 12-STAGE END-TO-END WORKFLOW (Image 1) */}
        {activeTab === "flow" && (
          <div className="space-y-6">
            <StageTracker currentStage={6} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center mb-2">1-3</span>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Recruitment Ingestion</h4>
                <p className="text-gray-600">Online form submission, eligibility scoring, candidate screening and automated interview scheduling.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-2">4-6</span>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Selection & Offer</h4>
                <p className="text-gray-600">Panel merit approval, Aadhaar/Degree document verification, and digital PDF offer letter generation.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center mb-2">7-9</span>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Onboarding & Attendance</h4>
                <p className="text-gray-600">Panchayati employee record creation, monthly attendance logging, and agency cryptographic e-sign.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center mb-2">10-12</span>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Payroll & MIS</h4>
                <p className="text-gray-600">Statutory salary computation, bulk DBT electronic release, and real-time executive MIS audit logs.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER ROLES & ACCESS (Image 2) */}
        {activeTab === "roles" && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl font-black text-gray-900">User Roles & Access Control</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Role-based access designed around operational responsibility and data security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Role 1: Candidate */}
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold mb-4">
                    🧑‍💼
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Candidate</h3>
                  <p className="text-xs font-semibold text-blue-600 mb-4">Apply. Track. Grow.</p>
                  
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">✓ Submit online application</li>
                    <li className="flex items-center gap-2">✓ Receive notifications</li>
                    <li className="flex items-center gap-2">✓ Track application status</li>
                    <li className="flex items-center gap-2">✓ Manage profile</li>
                    <li className="flex items-center gap-2">✓ Get interview & offer updates</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full block">
                    Your Opportunity • Our Support
                  </span>
                  <Link to="/candidate" className="inline-block mt-3 text-xs font-bold text-blue-600 hover:underline">
                    Open Candidate Portal →
                  </Link>
                </div>
              </div>

              {/* Role 2: Administrator */}
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold mb-4">
                    ⚙️
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Administrator</h3>
                  <p className="text-xs font-semibold text-emerald-600 mb-4">Manage. Monitor. Enable.</p>
                  
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">✓ Full operational access</li>
                    <li className="flex items-center gap-2">✓ Manage candidates & employees</li>
                    <li className="flex items-center gap-2">✓ Configure masters & workflows</li>
                    <li className="flex items-center gap-2">✓ View reports & audit logs</li>
                    <li className="flex items-center gap-2">✓ Manage user roles & settings</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full block">
                    Full Control • Greater Efficiency
                  </span>
                  <Link to="/admin" className="inline-block mt-3 text-xs font-bold text-emerald-600 hover:underline">
                    Open Admin Portal →
                  </Link>
                </div>
              </div>

              {/* Role 3: Agency User */}
              <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold mb-4">
                    🏢
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Agency User</h3>
                  <p className="text-xs font-semibold text-amber-600 mb-4">Record. Approve. Collaborate.</p>
                  
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">✓ Enter monthly attendance</li>
                    <li className="flex items-center gap-2">✓ Request approval / digital e-sign</li>
                    <li className="flex items-center gap-2">✓ Manage assigned employees</li>
                    <li className="flex items-center gap-2">✓ View attendance status</li>
                    <li className="flex items-center gap-2">✓ Receive system notifications</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full block">
                    Simplified Operations • Collaboration
                  </span>
                  <Link to="/agency" className="inline-block mt-3 text-xs font-bold text-amber-600 hover:underline">
                    Open Agency Portal →
                  </Link>
                </div>
              </div>

              {/* Role 4: MIS / Department User */}
              <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold mb-4">
                    📊
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">MIS / Department</h3>
                  <p className="text-xs font-semibold text-purple-600 mb-4">View. Analyze. Stay informed.</p>
                  
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">✓ Read-only governance access</li>
                    <li className="flex items-center gap-2">✓ View dashboards & summaries</li>
                    <li className="flex items-center gap-2">✓ Access authorized reports</li>
                    <li className="flex items-center gap-2">✓ Use filters & drill-down</li>
                    <li className="flex items-center gap-2">✓ View department-wise data</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full block">
                    Insights for Better Decisions
                  </span>
                  <Link to="/mis" className="inline-block mt-3 text-xs font-bold text-purple-600 hover:underline">
                    Open MIS Portal →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PROPOSED 3-TIER ARCHITECTURE (Image 3) */}
        {activeTab === "arch" && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl font-black text-gray-900">Enterprise Solution Architecture</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Modular three-tier web architecture with supporting document, email, and hosting services.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: 3 Core Layers */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Layer 1 */}
                <div className="bg-white rounded-2xl p-6 border-l-8 border-blue-600 shadow-md flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Front-End Interface</span>
                    <h3 className="text-base font-bold text-gray-900">PRESENTATION LAYER</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Responsive Web UI for Candidate Portal, Administrator Console, Agency Management, and MIS Dashboards with fluid mobile & desktop optimization.
                    </p>
                  </div>
                </div>

                {/* Layer 2 */}
                <div className="bg-white rounded-2xl p-6 border-l-8 border-emerald-600 shadow-md flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Server & Business Rules</span>
                    <h3 className="text-base font-bold text-gray-900">APPLICATION / API LAYER</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Secure server-side business logic: 12-stage state workflow engine, role-based access permissions, automated statutory payroll calculations, and document generation services.
                    </p>
                  </div>
                </div>

                {/* Layer 3 */}
                <div className="bg-white rounded-2xl p-6 border-l-8 border-purple-600 shadow-md flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Persistence & Assets</span>
                    <h3 className="text-base font-bold text-gray-900">DATA & STORAGE LAYER</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Relational database and encrypted private storage for candidate dossiers, employee records, biometric attendance timesheets, payroll ledgers, and verified identity documents.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Col: Supporting Services */}
              <div className="bg-white rounded-2xl p-6 border shadow-md space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-emerald-800 border-b pb-3">
                  SUPPORTING ENTERPRISE SERVICES
                </h4>

                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                  <FiFileText className="text-2xl text-blue-600 flex-shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-gray-900">PDF / Documents</strong>
                    <span className="text-gray-500">Server-side generation & private cloud storage</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                  <FiMail className="text-2xl text-amber-600 flex-shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-gray-900">Email & SMS Gateways</strong>
                    <span className="text-gray-500">Authenticated transactional notifications</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                  <FiServer className="text-2xl text-purple-600 flex-shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-gray-900">High-Availability Cloud VPS</strong>
                    <span className="text-gray-500">Linux • TLS • Backups • Firewall Monitoring</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: EXECUTIVE OVERVIEW & 5 PILLARS (Image 4) */}
        {activeTab === "pillars" && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                ONE PLATFORM • COMPLETE WORKFORCE LIFECYCLE
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                Five Strategic Transformation Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "Digitize Recruitment", desc: "From online application to selection and onboarding.", icon: "📋" },
                { title: "Centralize Information", desc: "Unified database of candidates, employees, and resources.", icon: "🗄️" },
                { title: "Standardize Processes", desc: "Consistent and policy-driven workflows across districts.", icon: "⚙️" },
                { title: "Improve Efficiency", desc: "Reduce manual work and errors through automated payroll.", icon: "⚡" },
                { title: "Ensure Accountability", desc: "Role-based access, audit logs, and transparent operations.", icon: "🛡️" }
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border shadow-sm text-center flex flex-col justify-between">
                  <div>
                    <div className="text-3xl mb-3">{p.icon}</div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optatech Footer Signature */}
        <div className="p-6 bg-gray-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-emerald-400">Optatech Innovation Private Limited | Since 2015</p>
            <p className="text-gray-400">Empowering Rajasthan's Panchayati Governance Infrastructure</p>
          </div>
          <a
            href="https://www.optatechinnovation.com"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-300 hover:underline font-mono"
          >
            www.optatechinnovation.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureOverview;
