import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiUserPlus, FiFileText, FiPhoneCall, FiMapPin, FiBriefcase, FiInfo, FiArrowRight } from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";
import { RAJASTHAN_DISTRICTS } from "../../data/mockInitialData";

const RegisterProfilePage = () => {
  const { registerResume, registeredUser, registerUser, loginCandidate, registeredCandidates } = useWorkforce();
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState("");
  const [autoFilled, setAutoFilled] = useState(false);

  const [form, setForm] = useState({
    aadhaarNo: registeredUser?.aadhaarNo || "",
    fullName: registeredUser?.fullName || "",
    mobile: registeredUser?.mobile || "",
    email: registeredUser?.email || "",
    gender: registeredUser?.gender || "Male",
    fatherName: "",
    dob: "",
    district: registeredUser?.district || "",
    block: "",
    highestQualification: "",
    university: "",
    passingYear: "2024",
    percentage: "",
    experience: "",
    skills: "",
    preferredDepartment: "Panchayati Raj & Rural Development",
    preferredDistrict: "",
    resumeFileName: "Candidate_Resume.pdf"
  });

  // Sync if registeredUser logs in or exists
  useEffect(() => {
    if (registeredUser && !autoFilled) {
      setForm(prev => ({
        ...prev,
        aadhaarNo: registeredUser.aadhaarNo || prev.aadhaarNo,
        fullName: registeredUser.fullName || prev.fullName,
        mobile: registeredUser.mobile || prev.mobile,
        email: registeredUser.email || prev.email,
        gender: registeredUser.gender || prev.gender,
        district: registeredUser.district || prev.district
      }));
      setAutoFilled(true);
    }
  }, [registeredUser, autoFilled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanAadhaar = form.aadhaarNo.replace(/\s+/g, "");
    if (cleanAadhaar.length !== 12 || !/^\d+$/.test(cleanAadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    if (!form.fullName || !form.mobile || !form.email) {
      alert("Please fill all required identity fields (Name, Mobile, Email).");
      return;
    }
    if (!form.highestQualification) {
      alert("Please enter your highest educational qualification.");
      return;
    }
    if (!form.preferredDistrict) {
      alert("Please select your preferred district for posting.");
      return;
    }

    // Ensure user session is registered
    if (!registeredUser) {
      registerUser({
        aadhaarNo: form.aadhaarNo,
        fullName: form.fullName,
        mobile: form.mobile,
        email: form.email,
        gender: form.gender,
        district: form.preferredDistrict
      });
    }

    const id = registerResume(form);
    setRegId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#f8f9fa] min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl mx-auto mb-4">
            <FiCheckCircle />
          </div>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider bg-green-50 px-2.5 py-1 rounded border border-green-200">
            Registered in State Talent Pool
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#003366] mt-2 mb-2">
            Resume & Profile Submitted Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
            Your qualifications and contact details have been indexed. Whenever new contractual or regular Panchayati Raj openings are announced in <strong>{form.preferredDistrict || "your preferred area"}</strong>, our recruitment cell and Optatech Innovation Private Limited will contact you directly via SMS, WhatsApp & Email.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-xs space-y-2 text-left mb-6">
            <div className="flex justify-between items-center pb-2 border-b border-blue-200/60">
              <span className="text-gray-500">Talent Pool Registration ID:</span>
              <strong className="font-mono text-sm text-[#003366] bg-white px-2 py-0.5 rounded border border-blue-300">{regId}</strong>
            </div>
            <p><strong>Candidate Name:</strong> {form.fullName}</p>
            <p><strong>Aadhaar Number:</strong> <span className="font-mono">{form.aadhaarNo}</span></p>
            <p><strong>Highest Qualification:</strong> {form.highestQualification} ({form.university || "Recognized Univ"})</p>
            <p><strong>Skills & Trade:</strong> {form.skills || "General Administration & Field Work"}</p>
            <p><strong>Preferred Posting District:</strong> <span className="text-green-800 font-bold">{form.preferredDistrict}</span></p>
            <p><strong>Registered Contact:</strong> +91 {form.mobile} · {form.email}</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 mb-6 text-left">
            ℹ️ <strong>Status:</strong> Active in candidate pool. No further action needed today. Keep your mobile reachable for interview call letters.
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/jobs"
              className="px-5 py-2.5 bg-[#003366] hover:bg-[#004080] text-white font-bold text-xs rounded-lg transition"
            >
              Browse Active Openings
            </Link>
            <Link
              to="/apply"
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-lg transition"
            >
              Go to Candidate Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-[#003366] text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                Government of Rajasthan · Panchayati Raj
              </span>
              <h1 className="text-2xl font-extrabold mt-1">
                State Talent Pool & Resume Submission
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
                If no open job currently matches your specific degree, skill, or home district, register your resume below.
                You will be contacted directly for upcoming Panchayati Raj vacancies.
              </p>
            </div>
            <div className="text-right sm:border-l sm:border-white/20 sm:pl-6">
              <span className="text-[10px] text-gray-300 block">Direct Channel</span>
              <span className="text-xs font-bold text-[#FF9933]">SMS & Email Alerts</span>
            </div>
          </div>
        </div>

        {/* If candidate already registered prompt */}
        {!registeredUser && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <FiInfo className="text-blue-600 text-lg flex-shrink-0" />
              <p className="text-blue-900">
                Already registered or applied for a post before? You can log in to auto-fill your profile details.
              </p>
            </div>
            <Link
              to="/login?role=candidate"
              className="px-3 py-1.5 bg-[#003366] text-white rounded-lg font-bold text-xs hover:bg-[#004080] whitespace-nowrap text-center"
            >
              Log In as Existing Candidate →
            </Link>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">

          {/* Section 1: Identity */}
          <div className="p-6 sm:p-7">
            <h3 className="text-sm font-bold text-[#003366] mb-4 flex items-center gap-2">
              <span className="text-base">🆔</span> Step 1: Candidate Identity Details (Aadhaar Verified)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  12-Digit Aadhaar Number (आधार संख्या) *
                </label>
                <input
                  type="text"
                  maxLength={14}
                  placeholder="XXXX XXXX XXXX"
                  value={form.aadhaarNo}
                  onChange={(e) => setForm({ ...form, aadhaarNo: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-mono tracking-wider focus:ring-2 focus:ring-[#003366]"
                  required
                />
                <span className="text-[10px] text-gray-400">UIDAI verified</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name (पूरा नाम) *
                </label>
                <input
                  type="text"
                  placeholder="As printed on Aadhaar"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number (मोबाइल नंबर) *
                </label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-xs font-medium text-gray-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98290 XXXXX"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })}
                    className="flex-1 p-2.5 border border-gray-300 rounded-r-lg text-sm"
                    required
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
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gender (लिंग)</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="Male">Male (पुरुष)</option>
                  <option value="Female">Female (महिला)</option>
                  <option value="Other">Other (अन्य)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Father's / Husband's Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shri Surendra Sharma"
                  value={form.fatherName}
                  onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Education & Skills */}
          <div className="p-6 sm:p-7">
            <h3 className="text-sm font-bold text-[#003366] mb-4 flex items-center gap-2">
              <span className="text-base">🎓</span> Step 2: Educational Qualifications & Technical Trade
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Highest Degree / Diploma (उच्चतम योग्यता) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech / Diploma Civil / B.Com / BCA / 12th Pass"
                  value={form.highestQualification}
                  onChange={(e) => setForm({ ...form, highestQualification: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  University / College / Board
                </label>
                <input
                  type="text"
                  placeholder="e.g. University of Rajasthan / RTU Kota / RBSE"
                  value={form.university}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Passing Year</label>
                <select
                  value={form.passingYear}
                  onChange={(e) => setForm({ ...form, passingYear: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  {["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Aggregate Percentage / CGPA</label>
                <input
                  type="text"
                  placeholder="e.g. 74.5% or 7.8 CGPA"
                  value={form.percentage}
                  onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Prior Experience (if any)</label>
                <input
                  type="text"
                  placeholder="e.g. 1 Year in Rural Survey / Accounting / None"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Key Skills & Certifications</label>
                <input
                  type="text"
                  placeholder="e.g. RS-CIT, Tally ERP, AutoCAD, MS Office, Hindi/English Typing"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Job Preferences */}
          <div className="p-6 sm:p-7">
            <h3 className="text-sm font-bold text-[#003366] mb-4 flex items-center gap-2">
              <span className="text-base">📍</span> Step 3: Location & Department Preference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Preferred District for Posting *
                </label>
                <select
                  value={form.preferredDistrict}
                  onChange={(e) => setForm({ ...form, preferredDistrict: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                  required
                >
                  <option value="">-- Select Preferred District --</option>
                  {RAJASTHAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <span className="text-[10px] text-gray-400">You will be matched to vacancies in this district</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Panchayati Raj Wing
                </label>
                <select
                  value={form.preferredDepartment}
                  onChange={(e) => setForm({ ...form, preferredDepartment: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="Panchayati Raj & Rural Development">Panchayati Raj & Rural Development</option>
                  <option value="Jal Jeevan Mission / Water & Sanitation">Jal Jeevan Mission / Water & Sanitation</option>
                  <option value="MGNREGA Technical & Accounts Cell">MGNREGA Technical & Accounts Cell</option>
                  <option value="e-Mitra / Gram Panchayat IT & Digitization">e-Mitra / Gram Panchayat IT & Digitization</option>
                  <option value="Any Wing (First Available Opening)">Any Wing (First Available Opening)</option>
                </select>
              </div>
            </div>

            {/* Resume File Upload Simulation */}
            <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <FiFileText className="text-2xl text-[#003366]" />
                <div>
                  <span className="font-bold text-gray-800 block">Resume / Curriculum Vitae</span>
                  <span className="text-gray-500 font-mono text-[11px]">{form.resumeFileName} (PDF attached)</span>
                </div>
              </div>
              <label className="cursor-pointer px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg text-xs font-bold text-[#003366] transition">
                Change File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setForm({ ...form, resumeFileName: e.target.files[0].name });
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-lg">
              By submitting, your resume is deposited in the official Panchayati Raj State Talent Pool maintained by <strong>Optatech Innovation Private Limited</strong> for automated screening when openings are posted.
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF9933] hover:bg-[#e68a00] text-[#001d3d] font-black text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <FiCheckCircle /> Submit Resume to Talent Pool
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default RegisterProfilePage;
