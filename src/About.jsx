import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  FiShield, FiCheckCircle, FiUsers, FiAward, FiFileText,
  FiBriefcase, FiCpu, FiExternalLink, FiDollarSign
} from "react-icons/fi";
import orgData from "./data/orgStructure.json";
import { WORKFLOW_STAGES } from "./data/mockInitialData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [activeStage, setActiveStage] = useState(1);

  return (
    <section className="bg-[#f8f9fa] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ════════ HEADER BANNER ════════ */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="bg-[#003366] text-white rounded-2xl p-8 sm:p-10 shadow-lg text-center relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-[#FF9933] text-[#001d3d] text-[10px] font-black uppercase px-3 py-1 rounded tracking-wider mb-3">
              Government of Rajasthan · Panchayati Raj Department
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              About Rozgar Rajasthan Initiative
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-2xl mx-auto">
              A state-of-the-art digital recruitment, deployment, and payroll ecosystem architected and developed by <strong>Optatech Innovation Private Limited</strong> to deliver 100% transparent, merit-based contractual employment across all 33 districts of Rajasthan.
            </p>
          </div>
        </Motion.div>

        {/* ════════ VISION & MISSION ════════ */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center text-2xl mb-4 font-black">
              🎯
            </div>
            <h3 className="font-extrabold text-[#003366] text-base mb-2">Our Vision</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To empower rural youth across Rajasthan by providing dignified, transparent employment opportunities in local governance, eliminating intermediaries, and automating benefit distribution directly to citizen bank accounts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF9933] flex items-center justify-center text-2xl mb-4 font-black">
              🚀
            </div>
            <h3 className="font-extrabold text-[#003366] text-base mb-2">Our Mission</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Standardize recruitment across all 355+ Panchayat Samitis through centralized Aadhaar verification, automated scoring algorithms, partner agency attendance audits, and instant Direct Benefit Transfer (DBT) payroll.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-2xl mb-4 font-black">
              💡
            </div>
            <h3 className="font-extrabold text-[#003366] text-base mb-2">Technology Partner</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Developed and maintained by <strong>Optatech Innovation Private Limited</strong>, providing scalable cloud infrastructure, cryptographic digital signatures, encrypted audit trails, and multi-tenant portal management.
            </p>
          </div>
        </div>

        {/* ════════ CORE CAPABILITIES ════════ */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003366] gov-heading-underline inline-block">
              Integrated Governance Capabilities
            </h2>
            <p className="text-xs text-gray-500 mt-3">
              Built ground-up to solve workforce challenges across rural Rajasthan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🆔",
                title: "Aadhaar Identity Authentication",
                desc: "Every applicant is verified via UIDAI guidelines, eliminating phantom entries, impersonation, and fraudulent registrations. One citizen, one verified identity."
              },
              {
                icon: "📑",
                title: "Statewide Talent Pool & Resume Bank",
                desc: "Candidates without active job openings deposit their credentials into the Talent Pool. When block-level vacancies open, candidate profiles are auto-indexed and contacted."
              },
              {
                icon: "✍️",
                title: "Cryptographic Agency E-Sign",
                desc: "Authorized partner agencies record monthly field attendance which is digitally e-signed with cryptographic timestamps before any public treasury funds are unlocked."
              },
              {
                icon: "💳",
                title: "Automated DBT Payroll Disbursal",
                desc: "Base pay, Dearness Allowance (DA), House Rent Allowance (HRA), EPF, and TDS are computed automatically with immutable UTR electronic salary releases."
              },
              {
                icon: "📊",
                title: "Real-Time MIS & Compliance",
                desc: "Department executives and district collectors gain instantaneous visibility into vacancies, sanctioned posts, employee attendance percentages, and budget utilization."
              },
              {
                icon: "🛡️",
                title: "Immutable 12-Stage Audit Trail",
                desc: "Every administrative decision — from screening shortlist to offer letter generation — is recorded with timestamp and officer ID for absolute RTI compliance."
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h4 className="font-extrabold text-[#003366] text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════ 12-STAGE LIFECYCLE TRACKER ════════ */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003366] gov-heading-underline inline-block">
              12-Stage Recruitment & Governance Lifecycle
            </h2>
            <p className="text-xs text-gray-500 mt-3">
              Click any stage below to inspect the statutory workflow requirements
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
            {WORKFLOW_STAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className={`p-3 rounded-xl text-left border transition text-xs ${
                  activeStage === s.id
                    ? "bg-[#003366] text-white border-[#003366] shadow-md scale-102"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                <span className="text-[10px] block opacity-70 font-mono font-bold">Stage {s.id}</span>
                <strong className="block text-[11px] mt-0.5 truncate">{s.name}</strong>
              </button>
            ))}
          </div>

          {/* Active Stage Detail */}
          {(() => {
            const cur = WORKFLOW_STAGES.find((s) => s.id === activeStage);
            return (
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#003366]">
                    Stage {cur?.id}: {cur?.name}
                  </span>
                  <span className="text-[10px] font-bold text-blue-900 bg-white px-2.5 py-0.5 rounded border border-blue-200">
                    Mandatory Compliance Step
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{cur?.desc}</p>
                <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  <span>Verified across Department Admin, Agency Officer, and Candidate dashboards</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ════════ ORGANIZATIONAL STRUCTURE ════════ */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#003366] gov-heading-underline inline-block mb-3">
            Administrative & Governance Hierarchy
          </h2>
          <p className="text-xs text-gray-500 mb-8 max-w-lg mx-auto">
            Click on any institutional authority to understand their role in the Rozgar Rajasthan ecosystem.
          </p>

          <div className="flex flex-col items-center">
            {orgData.hierarchy.map((item, i) => (
              <div key={i} className="flex flex-col items-center w-full max-w-md">
                <button
                  onClick={() => setActiveNode(activeNode?.title === item.title ? null : item)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-between shadow-sm ${
                    activeNode?.title === item.title
                      ? "bg-[#003366] text-white shadow-lg scale-102 border-2 border-[#FF9933]"
                      : "bg-[#003366]/90 text-white hover:bg-[#003366]"
                  }`}
                >
                  <span>{item.title}</span>
                  <span className="text-xs text-[#FF9933]">
                    {activeNode?.title === item.title ? "▲" : "▼"}
                  </span>
                </button>
                {i < orgData.hierarchy.length - 1 && (
                  <div className="w-0.5 h-6 bg-[#003366]/40" />
                )}
              </div>
            ))}

            {activeNode && (
              <Motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-blue-50 border border-blue-200 p-5 rounded-2xl shadow-md max-w-md text-left text-xs"
              >
                <h4 className="font-extrabold text-[#003366] text-sm mb-1">{activeNode.title}</h4>
                <p className="text-gray-700 leading-relaxed">{activeNode.desc}</p>
              </Motion.div>
            )}
          </div>
        </div>

        {/* ════════ STATUTORY COMPLIANCE & LEGAL ACCORD ════════ */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm text-xs text-gray-700 space-y-3">
          <h2 className="text-base font-extrabold text-[#003366] gov-heading-underline inline-block">
            Statutory & Legal Compliance
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-600">
            Rozgar Rajasthan operates strictly under the provisions of the <strong>Rajasthan Panchayati Raj Act</strong>, the <strong>Rajasthan Transparency in Public Procurement (RTPP) Act</strong>, and the <strong>Direct Benefit Transfer (DBT) Guidelines</strong> formulated by the Department of Information Technology & Communication (DoIT&C), Government of Rajasthan.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100 text-gray-500">
            <span>
              Technology Partner: <strong className="text-[#003366]">Optatech Innovation Private Limited</strong> · CIN: U72900RJ2021PTC076891
            </span>
            <Link to="/contact" className="text-[#003366] font-bold hover:underline flex items-center gap-1">
              Contact Nodal Officers <FiExternalLink />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;