import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  FiBriefcase, FiMapPin, FiUsers, FiCalendar, FiArrowRight,
  FiUserPlus, FiSearch, FiCheckCircle, FiShield, FiDollarSign,
  FiAlertCircle, FiPhoneCall, FiChevronDown, FiChevronUp, FiFileText
} from "react-icons/fi";
import { useWorkforce } from "./context/WorkforceContext";
import heroImg from "./assets/hero.jpg";
import cmImage from "./assets/cm_rajasthan.png";
import govtLogo from "./assets/rajasthan_govt_logo.png";
import { RAJASTHAN_DISTRICTS } from "./data/mockInitialData";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Hero = () => {
  const { jobs, resumeRegistrations } = useWorkforce();
  const [faqOpen, setFaqOpen] = useState(null);

  const faqs = [
    {
      q: "How can I apply directly if a job is open?",
      a: "If an active job opening matches your qualifications, click 'Apply Directly' on the job card. You will verify your Aadhaar number, fill your contact and academic details, and receive an instant online Application Tracking ID (e.g. APP-XXXX) to monitor through all 12 stages."
    },
    {
      q: "What should I do if no jobs are currently open in my trade or district?",
      a: "If there are no vacancies currently matching your degree or preferred district, click 'Submit Resume to Talent Pool'. Submit your Aadhaar, education, and resume. As soon as the Department of Panchayati Raj announces new contractual or regular vacancies, our recruitment cell will directly contact you via SMS, WhatsApp, and Email."
    },
    {
      q: "I have already registered once. Do I need to enter all my details again?",
      a: "No! If you have registered or applied once on Rozgar Rajasthan, simply go to Candidate Login and enter your 12-digit Aadhaar number or 10-digit mobile number. Your profile, qualifications, and past applications will load immediately without re-entering."
    },
    {
      q: "How are salaries disbursed to contractual personnel?",
      a: "Salaries are processed strictly through Direct Benefit Transfer (DBT) directly into the candidate's Aadhaar-linked bank account, following biometric/field attendance entry by the authorized Partner Agency (Optatech Innovation Private Limited) and statutory approvals."
    },
    {
      q: "Who is the technology and implementation partner for this portal?",
      a: "This centralized workforce recruitment and governance platform is developed, hosted, and operated by Optatech Innovation Private Limited in coordination with the Department of Panchayati Raj, Government of Rajasthan."
    }
  ];

  return (
    <div id="main-content">

      {/* ═══════ CONTINUOUS MOVING TICKER (NO SLIDER / NO SCROLLBAR) ═══════ */}
      <div className="bg-[#002244] text-white py-2 px-3 text-xs border-b border-[#003366] flex items-center overflow-hidden">
        <div className="bg-[#FF9933] text-[#001d3d] font-black uppercase text-[10px] px-2.5 py-1 rounded-md mr-3 whitespace-nowrap flex items-center gap-1 shadow-sm flex-shrink-0 z-10">
          📢 सूचना / LATEST
        </div>
        <div className="marquee-container flex-1">
          <div className="marquee-content text-[11px] text-gray-200 tracking-wide font-medium space-x-12">
            <span>• Department of Panchayati Raj: Contractual Staff Recruitment 2026 for Junior Technical Assistants & Accountants now open across 33 districts.</span>
            <span>• Last date for direct application submission: 31st October 2026.</span>
            <span>• No opening in your trade? Register your resume in the State Talent Pool to get contacted directly when recruitment begins!</span>
            <span>• 100% Aadhaar verified candidate screening and Direct Benefit Transfer (DBT) enabled via Optatech Innovation.</span>
            <span>• Helpline Toll-Free: 1800-180-6127 (Mon–Sat, 9:30 AM to 6:00 PM).</span>
            {/* Duplicated for smooth continuous infinite flow */}
            <span>• Department of Panchayati Raj: Contractual Staff Recruitment 2026 for Junior Technical Assistants & Accountants now open across 33 districts.</span>
            <span>• Last date for direct application submission: 31st October 2026.</span>
            <span>• No opening in your trade? Register your resume in the State Talent Pool to get contacted directly when recruitment begins!</span>
            <span>• 100% Aadhaar verified candidate screening and Direct Benefit Transfer (DBT) enabled via Optatech Innovation.</span>
            <span>• Helpline Toll-Free: 1800-180-6127 (Mon–Sat, 9:30 AM to 6:00 PM).</span>
          </div>
        </div>
      </div>

      {/* ═══════ HERO BANNER WITH CM CARD & GOVT BRANDING ═══════ */}
      <section
        className="relative min-h-[530px] flex items-center"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#001428]/95 via-[#002b54]/90 to-[#003366]/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left 7-8 Cols: Main Heading & CTAs */}
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[#FF9933] text-xs font-bold mb-4">
                <span>🇮🇳</span> Government of Rajasthan · Department of Panchayati Raj
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                रोज़गार राजस्थान<br />
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                  Panchayati Raj Workforce & Employment Portal
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-200 mb-8 leading-relaxed max-w-2xl font-normal">
                A transparent, Aadhaar-authenticated workforce deployment system developed by <strong>Optatech Innovation Private Limited</strong>.
                Apply directly to open positions or submit your resume into the State Talent Pool for upcoming Panchayati Raj vacancies.
              </p>

              <div className="flex flex-wrap gap-3.5">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 bg-[#FF9933] hover:bg-[#e68a00] text-[#001d3d] px-6 py-3.5 rounded-xl font-black text-sm shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <FiSearch className="text-base" /> View Job Openings (Direct Apply)
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-6 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition"
                >
                  <FiFileText className="text-base text-amber-300" /> Submit Resume (When No Opening)
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-[#003366] hover:bg-[#004080] text-white px-5 py-3.5 rounded-xl font-bold text-sm border border-blue-400/40 shadow-lg transition"
                >
                  <FiShield className="text-base text-[#FF9933]" /> Portal Login
                </Link>
              </div>
            </Motion.div>

            {/* Right 4 Cols: Hon'ble Chief Minister Dignitary Message Card */}
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="lg:col-span-4"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-5 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9933]/15 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-3 pb-3 border-b border-white/15">
                  <img
                    src={cmImage}
                    alt="Shri Bhajan Lal Sharma, Hon'ble Chief Minister of Rajasthan"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#FF9933] shadow-md flex-shrink-0"
                  />
                  <div>
                    <h2 className="text-sm font-extrabold text-white leading-tight">
                      श्री भजन लाल शर्मा
                    </h2>
                    <p className="text-[11px] text-amber-300 font-bold">
                      माननीय मुख्यमंत्री, राजस्थान
                    </p>
                    <span className="text-[10px] text-gray-300 block mt-0.5">
                      Government of Rajasthan
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-200 italic leading-relaxed space-y-1.5">
                  <p>
                    "राजस्थान के प्रत्येक योग्य युवा को पारदर्शी, निष्पक्ष और भ्रष्टाचार-मुक्त रोज़गार उपलब्ध कराना राज्य सरकार का सर्वोच्च संकल्प है।"
                  </p>
                  <div className="pt-2 text-[10px] text-amber-200/90 font-medium not-italic flex items-center gap-1.5">
                    <FiCheckCircle className="text-[#FF9933]" /> 100% Aadhaar Verified & Direct Benefit Transfer
                  </div>
                </div>
              </div>
            </Motion.div>

          </div>
        </div>
      </section>

      {/* ═══════ KEY METRICS DASHBOARD ═══════ */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { val: "33 Districts", label: "Statewide Coverage", icon: "🗺️", sub: "All Rajasthan blocks" },
              { val: "11,280+", label: "Gram Panchayats", icon: "🏛️", sub: "Panchayati Raj network" },
              { val: "100%", label: "Aadhaar Authenticated", icon: "🔐", sub: "Zero ghost candidates" },
              { val: "₹14.8+ Cr", label: "Disbursed via DBT", icon: "💰", sub: "Direct electronic transfer" },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-blue-300 transition">
                <span className="text-2xl block mb-1">{m.icon}</span>
                <span className="text-xl sm:text-2xl font-black text-[#003366] block">{m.val}</span>
                <span className="text-xs font-bold text-gray-800 block mt-0.5">{m.label}</span>
                <span className="text-[10px] text-gray-500">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS (DIRECT APPLY VS NO OPENINGS) ═══════ */}
      <section className="py-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-[#FF9933]/15 px-2.5 py-1 rounded">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] mt-2 gov-heading-underline">
              How the Recruitment System Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-3">
              Clear, transparent process designed for every job-seeking citizen of Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "1. Browse or Search Jobs",
                desc: "Explore current openings across all 33 districts by qualification, department, and salary.",
                icon: "🔍"
              },
              {
                step: "02",
                title: "2. If Job Open → Direct Apply",
                desc: "Apply directly using your 12-digit Aadhaar number and contact verification. Instant tracking ID generated.",
                icon: "📝"
              },
              {
                step: "03",
                title: "3. If No Job Open → Submit Resume",
                desc: "No vacancy in your trade? Deposit your profile in the State Talent Pool. Get contacted when jobs open.",
                icon: "📄"
              },
              {
                step: "04",
                title: "4. E-Sign & DBT Salary",
                desc: "Selected candidates are deployed, attendance is e-signed by Agency, and monthly salary is released via DBT.",
                icon: "💳"
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition bg-gray-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[10px] font-black text-[#FF9933] bg-[#FF9933]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#003366] mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CURRENT OPENINGS WITH DIRECT APPLY ═══════ */}
      <section className="py-14 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded border border-green-200">
                ● Live Vacancies
              </span>
              <h2 className="text-2xl font-extrabold text-[#003366] mt-1 gov-heading-underline">
                Current Panchayati Raj Job Openings
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                Active positions under Department of Panchayati Raj. Apply directly online.
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-xs font-bold text-[#003366] hover:text-[#FF9933] flex items-center gap-1 transition self-start sm:self-auto"
            >
              Browse All Openings ({jobs.length}) <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#003366] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                      {job.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {job.openings} Posts
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-gray-900 mb-1 leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mb-3">{job.department}</p>

                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-600 mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <FiMapPin className="text-[#003366]" /> {job.district} ({job.block})
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <FiBriefcase className="text-[#003366]" /> {job.type}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-green-800 bg-green-50 px-2.5 py-1 rounded-lg inline-block mb-3">
                    {job.salaryRange}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <FiCalendar className="text-gray-400" /> Last Date: <strong className="text-red-600">{job.lastDate}</strong>
                  </span>
                  <Link
                    to={`/apply?jobId=${job.id}`}
                    className="px-3.5 py-1.5 bg-[#003366] hover:bg-[#004080] text-white text-[11px] font-bold rounded-lg transition flex items-center gap-1"
                  >
                    Apply Directly →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ═══════ CONDITIONAL BANNER: NO MATCHING JOB? SUBMIT RESUME ═══════ */}
          <div className="mt-8 bg-gradient-to-r from-[#003366] to-[#002244] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-blue-900">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded">
                State Talent Pool Open
              </span>
              <h3 className="text-lg sm:text-xl font-black mt-2 mb-1">
                Don't See an Opening in Your District or Subject?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Submit your resume and academic profile now. Whenever recruitment begins for your trade or home block, you will be shortlisted and contacted directly via SMS & Email.
              </p>
            </div>
            <Link
              to="/register"
              className="px-6 py-3.5 bg-[#FF9933] hover:bg-[#e68a00] text-[#001d3d] font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 whitespace-nowrap"
            >
              <FiUserPlus /> Submit Resume & Register Profile
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ PILLARS OF GOVERNANCE ═══════ */}
      <section className="py-14 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#003366] gov-heading-underline">
              Pillars of Transparent Governance
            </h2>
            <p className="text-xs text-gray-500 mt-3">
              Zero tolerance for discrepancies · Full digital traceability from application to bank transfer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: "📋",
                title: "12-Stage Traceability",
                desc: "Real-time candidate tracking across screening, document verification, offer letters, and deployment."
              },
              {
                icon: "🔐",
                title: "Aadhaar Verified",
                desc: "UIDAI compliant identity verification preventing duplicate applications and proxy candidates."
              },
              {
                icon: "💰",
                title: "Direct Benefit Transfer",
                desc: "Automated salary computation with PF/ESI and direct bank transfer with immutable UTR reference."
              },
              {
                icon: "🏢",
                title: "Agency Digital E-Sign",
                desc: "Field attendance signed cryptographically by partner agency officers before payroll processing."
              },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="text-sm font-extrabold text-[#003366] mb-1.5">{f.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FREQUENTLY ASKED QUESTIONS (FAQ) ═══════ */}
      <section className="py-14 bg-[#f8f9fa] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#003366] gov-heading-underline">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-gray-500 mt-3">
              Everything candidates need to know about job applications and resume submission.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#003366] flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  {faqOpen === idx ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                </button>
                {faqOpen === idx && (
                  <div className="p-4 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ POWERED BY / TECH PARTNER ═══════ */}
      <section className="py-6 bg-[#001e3d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>
            Technology Architecture & Deployment: <strong className="text-[#FF9933]">Optatech Innovation Private Limited</strong>
          </span>
          <div className="flex gap-4 text-gray-300">
            <Link to="/about" className="hover:text-white">About the Initiative</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white">Helpdesk Support</Link>
            <span>•</span>
            <Link to="/login" className="hover:text-white">Official Login</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;
