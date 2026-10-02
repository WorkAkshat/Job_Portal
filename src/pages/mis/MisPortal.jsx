import React, { useState } from "react";
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiMapPin,
  FiDownload,
  FiFilter,
  FiFileText,
  FiPieChart
} from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";

const MisPortal = () => {
  const { candidates, employees, attendanceRecords, auditLogs } = useWorkforce();

  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");

  // Analytics Computations
  const totalApplications = candidates.length;
  const totalSelected = candidates.filter((c) => c.currentStage >= 4).length;
  const totalOnboarded = employees.length;
  const totalPayrollDisbursed = attendanceRecords
    .filter((a) => a.payrollGenerated)
    .reduce((sum, item) => sum + (item.netPay || 0), 0);

  const pendingAttendanceSigns = attendanceRecords.filter((a) => !a.agencyESigned).length;

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchDistrict = selectedDistrict === "All" || emp.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchDept = selectedDept === "All" || emp.department.toLowerCase().includes(selectedDept.toLowerCase());
    return matchDistrict && matchDept;
  });

  const handleExportReport = (reportType) => {
    alert(`Generating & Exporting official MIS Report [${reportType}] in CSV/PDF format. (Optatech Innovation Private Limited compliance export)`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-400/30 mb-2">
                <span>MIS & Department User Portal</span> • <span>View. Analyze. Stay informed.</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                Executive Governance & Analytics Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Read-only management intelligence, district drill-downs, payroll disbursement tracking, and audit accountability (Stage 12).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExportReport("Full Panchayati Workforce Summary")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
              >
                <FiDownload /> Export Executive MIS PDF
              </button>
            </div>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Applications</span>
              <h2 className="text-2xl font-black text-gray-900 mt-1">{totalApplications}</h2>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <FiTrendingUp /> 100% Traceable Pipeline
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
              <FiUsers />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Selected & Verified</span>
              <h2 className="text-2xl font-black text-gray-900 mt-1">{totalSelected}</h2>
              <span className="text-[11px] text-purple-600 font-medium flex items-center gap-1 mt-1">
                <FiCheckCircle /> Merit Evaluated
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl">
              <FiCheckCircle />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Active Deployed Staff</span>
              <h2 className="text-2xl font-black text-emerald-700 mt-1">{totalOnboarded}</h2>
              <span className="text-[11px] text-gray-500 font-medium block mt-1">
                Across 4 Rajasthan Districts
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
              <FiMapPin />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Payroll Disbursed (Sep)</span>
              <h2 className="text-2xl font-black text-gray-900 mt-1">₹ {totalPayrollDisbursed.toLocaleString()}</h2>
              <span className="text-[11px] text-emerald-600 font-medium block mt-1">
                Direct Benefit Transfer (DBT)
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl">
              <FiDollarSign />
            </div>
          </div>

        </div>

        {/* WORKFORCE DISTRIBUTION & DISTRICT DRILL-DOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Employee Roster with Filters */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Panchayati Deployed Personnel Breakdown
                </h3>
                <p className="text-xs text-gray-500">
                  Real-time status and biometric attendance compliance
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border">
                  <FiFilter className="text-gray-400" />
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-transparent font-medium outline-none text-gray-700"
                  >
                    <option value="All">All Districts</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Kota">Kota</option>
                    <option value="Udaipur">Udaipur</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Staff & ID</th>
                    <th className="p-3">Designation & Dept</th>
                    <th className="p-3">District / Panchayat</th>
                    <th className="p-3">Monthly CTC</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.empId} className="hover:bg-gray-50 transition">
                      <td className="p-3">
                        <strong className="text-gray-900 block">{emp.name}</strong>
                        <span className="font-mono text-[10px] text-gray-500">{emp.empId}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-gray-800 block">{emp.designation}</span>
                        <span className="text-[10px] text-gray-400">{emp.department}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-gray-700 block">{emp.district}</span>
                        <span className="text-[10px] text-gray-500">{emp.panchayat}</span>
                      </td>
                      <td className="p-3 font-bold text-gray-900">
                        ₹ {emp.baseSalary?.toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                          Active Deployed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Col: District Heatmap / Stats */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FiPieChart className="text-purple-600" /> District Distribution
              </h4>
              <div className="space-y-3 text-xs">
                {[
                  { district: "Jaipur District", count: "35% Allocated", bar: "w-[35%]", color: "bg-purple-600" },
                  { district: "Jodhpur District", count: "25% Allocated", bar: "w-[25%]", color: "bg-blue-600" },
                  { district: "Kota District", count: "22% Allocated", bar: "w-[22%]", color: "bg-emerald-600" },
                  { district: "Udaipur District", count: "18% Allocated", bar: "w-[18%]", color: "bg-amber-600" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-gray-700 font-medium mb-1">
                      <span>{item.district}</span>
                      <span className="font-bold">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${item.bar} ${item.color} rounded-full`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Audit Metrics */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-3 text-xs">
              <h4 className="text-sm font-bold text-gray-900">
                Governance & SLA Compliance
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span>Traceability Index:</span>
                  <strong className="text-emerald-700">100% (Stage 1-12)</strong>
                </li>
                <li className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span>Aadhaar KYC Verification:</span>
                  <strong className="text-emerald-700">98.4% Matched</strong>
                </li>
                <li className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span>DBT Payout Success:</span>
                  <strong className="text-emerald-700">100% Electronic</strong>
                </li>
                <li className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span>Audit Trail Integrity:</span>
                  <strong className="text-emerald-700">Cryptographically Signed</strong>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MisPortal;
