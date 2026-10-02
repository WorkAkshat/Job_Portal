import React from "react";
import { FiX, FiPrinter, FiCheckCircle, FiShield, FiFileText } from "react-icons/fi";

const SalarySlipModal = ({ record, employee, onClose }) => {
  if (!record) return null;

  const baseSalary = employee ? employee.baseSalary : 32000;
  const hra = Math.round(baseSalary * 0.16);
  const da = Math.round(baseSalary * 0.40);
  const grossSalary = baseSalary + hra + da;
  const daysWorked = record.presentDays + (record.paidLeaves || 0);
  const earnedGross = Math.round((grossSalary / 30) * daysWorked);
  const pf = Math.round(baseSalary * 0.12);
  const tax = Math.round(baseSalary * 0.05);
  const totalDeductions = pf + tax;
  const netPay = record.netPay || (earnedGross - totalDeductions);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        
        {/* Action Header Bar */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <FiFileText className="text-emerald-400 text-lg" />
            <span className="font-semibold text-sm">Monthly Panchayati Salary Slip</span>
            <span className="text-xs text-gray-400">({record.month})</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs rounded-lg transition"
            >
              <FiPrinter /> Print Pay Slip
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-10 text-gray-800 font-sans print:p-0">
          
          {/* Letterhead */}
          <div className="border-b-2 border-emerald-700 pb-5 mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                OPTATECH INNOVATION PRIVATE LIMITED
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Panchayati Raj Contractual Workforce & Payroll Administration
              </p>
              <p className="text-[11px] text-gray-500">
                Jaipur, Rajasthan | www.optatechinnovation.com
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded">
                PAYSLIP: {record.month?.toUpperCase()}
              </span>
              <p className="text-[11px] text-gray-500 mt-1">
                <strong>Slip No:</strong> {record.salarySlipNo || "OPT/PAY/2026/091"}
              </p>
            </div>
          </div>

          {/* Employee & Attendance Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl text-xs mb-6 border border-gray-200">
            <div>
              <span className="text-gray-500 block">Employee Name:</span>
              <span className="font-bold text-gray-900">{record.empName}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Employee ID:</span>
              <span className="font-bold text-gray-900">{record.empId}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Designation:</span>
              <span className="font-bold text-gray-900">{employee?.designation || "Panchayat Staff"}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Posting District / Block:</span>
              <span className="font-bold text-gray-900">{employee?.district || "Rajasthan"} / {employee?.block || "Central"}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Total Days in Month:</span>
              <span className="font-bold text-gray-900">{record.totalDays} Days</span>
            </div>
            <div>
              <span className="text-gray-500 block">Days Present:</span>
              <span className="font-bold text-emerald-700">{record.presentDays} Days</span>
            </div>
            <div>
              <span className="text-gray-500 block">Paid Leaves:</span>
              <span className="font-bold text-blue-700">{record.paidLeaves || 0} Days</span>
            </div>
            <div>
              <span className="text-gray-500 block">Bank Account:</span>
              <span className="font-bold text-gray-900">{employee?.bankAccount || "SBI Verified"}</span>
            </div>
          </div>

          {/* Earnings & Deductions Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
            {/* Earnings */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-emerald-50 text-emerald-900 px-3 py-2 font-bold uppercase tracking-wider text-[11px] border-b border-emerald-200">
                Earnings (INR)
              </div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2.5 text-gray-600">Basic Salary</td>
                    <td className="p-2.5 text-right font-medium">₹ {baseSalary.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b bg-gray-50/50">
                    <td className="p-2.5 text-gray-600">House Rent Allowance (HRA)</td>
                    <td className="p-2.5 text-right font-medium">₹ {hra.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2.5 text-gray-600">Dearness Allowance (DA)</td>
                    <td className="p-2.5 text-right font-medium">₹ {da.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold text-gray-900">
                    <td className="p-2.5">Total Payable Gross</td>
                    <td className="p-2.5 text-right">₹ {earnedGross.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions */}
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-rose-50 text-rose-900 px-3 py-2 font-bold uppercase tracking-wider text-[11px] border-b border-rose-200">
                Deductions & Statutory (INR)
              </div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2.5 text-gray-600">Provident Fund (EPF 12%)</td>
                    <td className="p-2.5 text-right font-medium">₹ {pf.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b bg-gray-50/50">
                    <td className="p-2.5 text-gray-600">TDS / Professional Tax</td>
                    <td className="p-2.5 text-right font-medium">₹ {tax.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2.5 text-gray-600">Unpaid Leave Deductions</td>
                    <td className="p-2.5 text-right font-medium">₹ 0</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold text-rose-800">
                    <td className="p-2.5">Total Deductions</td>
                    <td className="p-2.5 text-right">₹ {totalDeductions.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Salary Highlight */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-xl flex items-center justify-between shadow-md mb-6">
            <div>
              <span className="text-xs text-emerald-100 uppercase tracking-wider block">Net Take Home Pay</span>
              <h2 className="text-2xl font-black">₹ {netPay.toLocaleString()}</h2>
            </div>
            <div className="text-right text-xs text-emerald-100">
              <p>Disbursement Method: <strong>Direct Benefit Transfer (DBT)</strong></p>
              <p className="text-[11px] opacity-90">{record.dbtStatus}</p>
            </div>
          </div>

          {/* E-Sign & Audit Compliance Stamp */}
          <div className="border border-gray-200 bg-gray-50 p-4 rounded-xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                <FiShield />
              </div>
              <div>
                <p className="font-bold text-gray-900 flex items-center gap-1.5">
                  <FiCheckCircle className="text-emerald-600" /> Digitally E-Signed by Agency
                </p>
                <p className="text-gray-500 text-[11px]">
                  Signer: {record.agencyOfficer || "Optatech Nodal Agency Lead"} | Time: {record.eSignTimestamp || "2026-09-28 17:45:10 IST"}
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-[10px] text-gray-400">
              HASH: OPT-SHA256-{record.id}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SalarySlipModal;
