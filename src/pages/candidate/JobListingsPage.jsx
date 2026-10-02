import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin, FiBriefcase, FiCalendar, FiArrowRight, FiSearch,
  FiFilter, FiFileText, FiCheckCircle, FiAlertCircle, FiPhoneCall, FiUserCheck
} from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";
import { RAJASTHAN_DISTRICTS } from "../../data/mockInitialData";

const JobListingsPage = () => {
  const { jobs, resumeRegistrations } = useWorkforce();
  const [activeTab, setActiveTab] = useState("active"); // "active" | "talentpool"
  const [searchText, setSearchText] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch =
        !searchText ||
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.department.toLowerCase().includes(searchText.toLowerCase()) ||
        job.district.toLowerCase().includes(searchText.toLowerCase());
      const matchDistrict = filterDistrict === "All" || job.district === filterDistrict;
      const matchCategory = filterCategory === "All" || job.category === filterCategory;
      return matchSearch && matchDistrict && matchCategory;
    });
  }, [jobs, searchText, filterDistrict, filterCategory]);

  const categories = [...new Set(jobs.map(j => j.category))];

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Banner */}
        <div className="bg-[#003366] text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block bg-[#FF9933] text-[#001d3d] text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider mb-2">
              Department of Panchayati Raj · Govt of Rajasthan
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Panchayati Raj Recruitment & Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed">
              Explore active job openings to apply directly, or submit your resume and profile into the State Talent Pool if no vacancies currently match your qualification.
            </p>

            {/* Tab switchers */}
            <div className="flex flex-wrap gap-2.5 mt-5">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "active"
                    ? "bg-[#FF9933] text-[#001d3d] shadow-lg"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <FiBriefcase /> Active Job Openings ({jobs.length})
              </button>

              <button
                onClick={() => setActiveTab("talentpool")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "talentpool"
                    ? "bg-[#FF9933] text-[#001d3d] shadow-lg"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <FiFileText /> Submit Resume / Talent Pool
              </button>
            </div>
          </div>
        </div>

        {/* ════════ TAB 1: ACTIVE OPENINGS ════════ */}
        {activeTab === "active" && (
          <div>
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by role, department, or district..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent font-medium"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <select
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm bg-white font-medium text-gray-700 focus:ring-2 focus:ring-[#003366]"
                  >
                    <option value="All">All 33 Districts</option>
                    {RAJASTHAN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm bg-white font-medium text-gray-700 focus:ring-2 focus:ring-[#003366]"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {(searchText || filterDistrict !== "All" || filterCategory !== "All") && (
                    <button
                      onClick={() => { setSearchText(""); setFilterDistrict("All"); setFilterCategory("All"); }}
                      className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-600 transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Notification alert: Direct apply vs Resume pool */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <FiAlertCircle className="text-amber-600 text-lg flex-shrink-0 mt-0.5" />
                <p className="text-amber-900 leading-relaxed">
                  <strong>Notice for Applicants:</strong> You can apply directly to any active position below using your Aadhaar verification. If your desired trade or district does not have an opening today, submit your resume to the <strong>State Talent Pool</strong> so the department can contact you as soon as recruitment commences.
                </p>
              </div>
              <Link
                to="/register"
                className="whitespace-nowrap px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-sm transition text-center"
              >
                Submit Resume →
              </Link>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-500 font-semibold">
                Showing {filteredJobs.length} active vacancies
              </p>
              <span className="text-[11px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">
                ● 100% Aadhaar Verified & DBT Enabled
              </span>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition duration-200 relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#003366] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                          {job.category}
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {job.type}
                        </span>
                        <span className="text-[10px] font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded border border-green-200">
                          {job.openings} Openings
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          ID: {job.id}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-extrabold text-[#003366] mb-1">
                        {job.title}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium mb-3">
                        {job.department}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {job.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-gray-600 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Posting District</span>
                          <strong className="text-gray-900 flex items-center gap-1">
                            <FiMapPin className="text-[#003366]" /> {job.district} ({job.block})
                          </strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Salary / Pay Scale</span>
                          <strong className="text-green-700">{job.salaryRange}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Min Qualification</span>
                          <strong className="text-gray-900">{job.minQualification}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Age Criteria</span>
                          <strong className="text-gray-900">{job.ageLimit}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Right Action Box */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 lg:border-l lg:border-gray-100 lg:pl-6 pt-3 lg:pt-0 border-t border-gray-100 lg:border-t-0">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] text-gray-400 block uppercase font-bold flex items-center gap-1">
                          <FiCalendar /> Last Date to Apply
                        </span>
                        <span className="text-sm font-extrabold text-red-600">{job.lastDate}</span>
                      </div>

                      <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                        <Link
                          to={`/apply?jobId=${job.id}`}
                          className="px-5 py-2.5 bg-[#003366] hover:bg-[#004080] text-white text-xs font-bold rounded-lg shadow-md transition flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          Apply Directly to Job <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ════════ IF NO JOBS MATCH SEARCH / FILTER ════════ */}
            {filteredJobs.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center my-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-4">
                  <FiAlertCircle />
                </div>
                <h3 className="text-lg font-extrabold text-[#003366] mb-2">
                  No Direct Job Openings Found Matching Your Search
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto mb-6 leading-relaxed">
                  There are currently no active vacancies in <strong>{filterDistrict !== "All" ? filterDistrict : "this category"}</strong>.
                  However, you can <strong>submit your resume & profile</strong> into the official Panchayati Raj Talent Pool right now.
                  Our team will contact you via SMS & Email as soon as new positions open in your preferred district!
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/register"
                    className="px-6 py-3 bg-[#FF9933] hover:bg-[#e68a00] text-[#001d3d] font-extrabold text-sm rounded-lg shadow-md transition flex items-center gap-2"
                  >
                    <FiFileText /> Submit Resume & Profile Now →
                  </Link>
                  <button
                    onClick={() => { setSearchText(""); setFilterDistrict("All"); setFilterCategory("All"); }}
                    className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-lg transition"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════ TAB 2: TALENT POOL / SUBMIT RESUME INFO ════════ */}
        {activeTab === "talentpool" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl">
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-[#FF9933]/15 px-2.5 py-1 rounded">
                State Talent Pool · Rajasthan Panchayati Raj
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#003366] mt-2 mb-3">
                No Opening In Your Trade? Submit Your Resume to Get Contacted
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Recruitment drives for Panchayati Raj projects (Water Sanitation, Digital Gram, MGNREGA, Accounts, Civil Engineering) happen continuously throughout the year across all 33 districts.
                By registering your profile in the central talent pool, you don't have to check the portal every day — the recruitment cell and Optatech Innovation Private Limited will directly notify and invite you.
              </p>

              {/* 3 Step Process for Resume Submission */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-2xl mb-2">🆔</div>
                  <h4 className="text-xs font-bold text-[#003366] mb-1">1. Aadhaar Authentication</h4>
                  <p className="text-[11px] text-gray-500">Fast identity verification with 12-digit Aadhaar and contact numbers.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-2xl mb-2">📄</div>
                  <h4 className="text-xs font-bold text-[#003366] mb-1">2. Upload Resume & Skills</h4>
                  <p className="text-[11px] text-gray-500">Provide education, preferred districts, domain skills, and experience.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-2xl mb-2">📞</div>
                  <h4 className="text-xs font-bold text-[#003366] mb-1">3. Direct SMS/Call When Job Opens</h4>
                  <p className="text-[11px] text-gray-500">Recruitment officers match vacancies and contact you immediately for interview.</p>
                </div>
              </div>

              {/* Active Talent Pool Counter */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-900 font-bold block">Current Registered Candidates in Talent Pool</span>
                  <span className="text-[11px] text-blue-700">Profiles actively indexed for upcoming contractual deployments</span>
                </div>
                <span className="text-xl font-extrabold text-[#003366] bg-white px-3 py-1 rounded-lg border border-blue-200">
                  {resumeRegistrations.length + 148} Candidates
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-[#003366] hover:bg-[#004080] text-white font-extrabold text-sm rounded-lg shadow-md transition flex items-center gap-2"
                >
                  <FiFileText /> Register Profile & Submit Resume Now →
                </Link>
                <Link
                  to="/apply"
                  className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-lg transition"
                >
                  Already Registered? Track Status
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobListingsPage;
