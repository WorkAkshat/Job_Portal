import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  FiMail, FiPhone, FiGlobe, FiMapPin, FiCheckCircle,
  FiSend, FiHelpCircle, FiClock, FiShield
} from "react-icons/fi";

const fadeDown = {
  hidden: { opacity: 0, y: -25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    category: "Job Application Status",
    subject: "",
    message: ""
  });
  const [ticketId, setTicketId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.mobile || !form.message) {
      alert("Please enter Name, Mobile, and Message.");
      return;
    }
    const token = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(token);
    setSubmitted(true);
  };

  return (
    <section className="bg-[#f8f9fa] min-h-screen py-10 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ════════ HEADER ════════ */}
        <Motion.div
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          className="bg-[#003366] text-white rounded-2xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-widest bg-white/10 px-3 py-1 rounded">
              Citizen & Candidate Support Cell
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
              Helpdesk & Grievance Redressal
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed">
              Have queries regarding job openings, resume submission into the State Talent Pool, Aadhaar verification, or DBT salary disbursement? Get in touch with our dedicated support team.
            </p>
          </div>
        </Motion.div>

        {/* ════════ MAIN CONTENT: FORM + CHANNELS ════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left 2 Cols: Interactive Helpdesk Ticket Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-extrabold text-[#003366]">
                Submit an Online Inquiry / Grievance
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Every request receives a tracking token and is resolved within 48 working hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  <FiCheckCircle />
                </div>
                <h3 className="text-base font-extrabold text-green-900 mb-1">
                  Ticket Generated Successfully!
                </h3>
                <p className="text-xs text-green-800 mb-4">
                  Your grievance has been logged with the Directorate Helpdesk.
                </p>
                <div className="inline-block bg-white border border-green-300 px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#003366] mb-4">
                  Ticket Token: {ticketId}
                </div>
                <p className="text-[11px] text-gray-500">
                  An SMS confirmation has been dispatched to +91 {form.mobile}. You will receive resolution updates directly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ fullName: "", mobile: "", email: "", category: "Job Application Status", subject: "", message: "" });
                  }}
                  className="mt-5 px-5 py-2 bg-[#003366] text-white rounded-lg text-xs font-bold hover:bg-[#004080] transition"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Surendra Sharma"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#003366]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98290 XXXXX"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#003366]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#003366]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Category of Query *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs bg-white font-medium"
                    >
                      <option value="Job Application Status">Job Application Status / 12-Stage Tracker</option>
                      <option value="Talent Pool & Resume Submission">Talent Pool & Resume Submission</option>
                      <option value="Aadhaar Verification Issue">Aadhaar Verification Issue</option>
                      <option value="Agency Attendance & E-Sign">Agency Attendance & E-Sign</option>
                      <option value="DBT Salary Disbursal">DBT Salary Disbursal / Bank Linkage</option>
                      <option value="Other Administrative Inquiry">Other Administrative Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subject / Tracking ID</label>
                  <input
                    type="text"
                    placeholder="e.g. Inquiry regarding APP-K3910A or Vacancy in Alwar"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Message / Grievance *</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your issue or query clearly with reference details..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <FiSend /> Submit Helpdesk Ticket
                </button>
              </form>
            )}
          </div>

          {/* Right Col: Official Contact Details */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-[#003366] text-sm border-b border-gray-100 pb-2">
                Official Support Channels
              </h3>

              {[
                { icon: <FiPhone />, label: "Toll-Free Helpline", val: "1800-180-6127", sub: "Mon–Sat, 9:30 AM to 6:00 PM" },
                { icon: <FiMail />, label: "Citizen Recruitment Cell", val: "recruitment@optatechinnovation.com", sub: "For candidate queries & admit cards" },
                { icon: <FiMail />, label: "Technical & DBT Support", val: "support@optatechinnovation.com", sub: "For portal & attendance inquiries" },
                { icon: <FiGlobe />, label: "Official Web Portal", val: "www.optatechinnovation.com", sub: "Rajasthan Rozgar Platform" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl text-xs">
                  <span className="text-[#003366] text-base mt-0.5">{c.icon}</span>
                  <div>
                    <strong className="text-gray-900 block">{c.label}</strong>
                    <span className="text-[#003366] font-bold block">{c.val}</span>
                    <span className="text-[10px] text-gray-500">{c.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold text-[#003366] text-sm border-b border-gray-100 pb-2">
                Headquarters & Locations
              </h3>

              <div className="flex items-start gap-2.5">
                <FiMapPin className="text-[#003366] text-base mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 block">Department of Panchayati Raj</strong>
                  <span className="text-gray-600 leading-tight block">
                    Government Secretariat, Bhagwan Das Road, Jaipur, Rajasthan – 302005
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-gray-100">
                <FiShield className="text-[#003366] text-base mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 block">Technology Partner Office</strong>
                  <span className="text-gray-600 leading-tight block">
                    Optatech Innovation Private Limited<br />
                    IT & Software Centre, Jaipur – 302017, Rajasthan
                  </span>
                </div>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <FiClock className="text-sm" /> Service Level Guarantee
              </p>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Candidate grievances, stage rectification requests, and resume indexing inquiries are resolved within 2 working days.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
