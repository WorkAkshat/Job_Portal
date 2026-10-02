import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCheckSquare, FiUsers, FiEdit3, FiPlus, FiCheckCircle,
  FiClock, FiBriefcase, FiLock, FiLogOut, FiArrowRight
} from "react-icons/fi";
import { useWorkforce } from "../../context/WorkforceContext";

const AgencyPortal = () => {
  const {
    agencySession, loginAgency, logoutAgency,
    employees, attendanceRecords, recordAttendance, agencyESign
  } = useWorkforce();

  const [tab, setTab] = useState("attendance");
  const [modal, setModal] = useState(null); // "attendance" | "esign"
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [selectedRec, setSelectedRec] = useState(null);

  // Agency login credentials state for unauthenticated gate
  const [agencyUser, setAgencyUser] = useState("agency@optatechinnovation.com");
  const [agencyPass, setAgencyPass] = useState("Agency@123");

  const [attForm, setAttForm] = useState({
    month: "October 2026",
    presentDays: 28,
    paidLeaves: 2,
    unpaidLeaves: 0,
    remarks: "Regular field attendance logged."
  });

  const [signerName, setSignerName] = useState(
    agencySession?.officerName || "Harish Gupta (Optatech Agency Lead)"
  );

  // ══════════════════════════════════════════════
  //  UNAUTHENTICATED GATE (LOGIN REQUIRED)
  // ══════════════════════════════════════════════
  if (!agencySession) {
    return (
      <div className="bg-[#f8f9fa] min-h-[calc(100vh-140px)] py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-4">
            <FiBriefcase />
          </div>

          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
            Authorized Agency Partner Wing
          </span>
          <h1 className="text-xl font-black text-[#003366] mt-2 mb-1">
            Agency User Login
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Optatech Innovation Private Limited & Partner Agencies: submit monthly staff attendance sheets and apply authorized digital e-signatures.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAgency(agencyUser, agencyPass);
            }}
            className="space-y-4 text-left"
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Agency ID / Email *
              </label>
              <input
                type="text"
                value={agencyUser}
                onChange={(e) => setAgencyUser(e.target.value)}
                placeholder="agency@optatechinnovation.com"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#003366]"
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
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-center justify-between">
              <div>
                <span className="font-bold">Agency Partner Demo Credentials:</span>
                <p className="font-mono text-gray-700">agency@optatechinnovation.com / Agency@123</p>
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
              className="w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center gap-2"
            >
              <FiLock /> Sign In to Agency Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <Link to="/login" className="text-[#003366] font-bold hover:underline">
              Switch to Candidate or Admin Login →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  //  AUTHENTICATED AGENCY CONSOLE
  // ══════════════════════════════════════════════
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-[#003366] text-white rounded-2xl p-6 sm:p-7 mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                Manpower Partner Console · Rozgar Rajasthan
              </span>
              <h1 className="text-xl sm:text-2xl font-black mt-1">
                Agency Attendance & Digital E-Sign Portal
              </h1>
              <p className="text-xs text-gray-300 mt-1">
                {agencySession.agencyName} · Officer: <strong>{agencySession.officerName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={logoutAgency}
                className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <FiLogOut /> Logout Agency
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-5 pt-4 border-t border-white/15">
            <button
              onClick={() => setTab("attendance")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                tab === "attendance"
                  ? "bg-[#FF9933] text-[#001d3d] shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white/80"
              }`}
            >
              <FiCheckSquare /> Monthly Attendance & E-Sign ({attendanceRecords.length})
            </button>
            <button
              onClick={() => setTab("roster")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                tab === "roster"
                  ? "bg-[#FF9933] text-[#001d3d] shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white/80"
              }`}
            >
              <FiUsers /> Deployed Staff Roster ({employees.length})
            </button>
          </div>
        </div>

        {/* ════════ TAB 1: ATTENDANCE ════════ */}
        {tab === "attendance" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#003366]">
                  Monthly Attendance Records & Digital E-Sign
                </h3>
                <p className="text-xs text-gray-500">
                  Every attendance record must be digitally signed before Department Administrator can disburse DBT salaries.
                </p>
              </div>
            </div>

            {attendanceRecords.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-bold text-gray-600 mb-1">No attendance records submitted yet.</p>
                <p className="text-xs">
                  Switch to the "Deployed Staff Roster" tab to record monthly attendance for onboarded employees.
                </p>
              </div>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b">
                  <tr>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Month</th>
                    <th className="p-3">Attendance Days</th>
                    <th className="p-3">Digital E-Sign</th>
                    <th className="p-3">Audit Timestamp</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendanceRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <strong className="text-gray-900 block text-sm">{r.empName}</strong>
                        <span className="text-[10px] text-gray-400 font-mono">{r.empId} · Ref: {r.id}</span>
                      </td>
                      <td className="p-3 font-semibold text-gray-800">{r.month}</td>
                      <td className="p-3">
                        <span className="text-green-700 font-bold">{r.presentDays} Days Present</span>
                        <span className="text-gray-400 block text-[10px]">Leaves: {r.paidLeaves || 0} PL / {r.unpaidLeaves || 0} UL</span>
                      </td>
                      <td className="p-3">
                        {r.agencyESigned ? (
                          <span className="text-green-700 font-bold flex items-center gap-1">
                            <FiCheckCircle /> E-Signed by {r.agencyOfficer}
                          </span>
                        ) : (
                          <span className="text-amber-600 font-bold flex items-center gap-1">
                            <FiClock /> Awaiting Digital E-Sign
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-[10px] text-gray-500 font-mono">
                        {r.eSignTimestamp || "Pending"}
                      </td>
                      <td className="p-3 text-right">
                        {!r.agencyESigned && (
                          <button
                            onClick={() => { setSelectedRec(r); setModal("esign"); }}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold shadow-sm transition"
                          >
                            Apply Digital E-Sign
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ════════ TAB 2: STAFF ROSTER ════════ */}
        {tab === "roster" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <h3 className="text-base font-extrabold text-[#003366] mb-1">
              Contractual Staff Roster
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Contractual personnel deployed across Rajasthan districts. Select any employee to enter monthly attendance.
            </p>

            {employees.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-bold text-gray-600 mb-1">No employees onboarded yet.</p>
                <p className="text-xs">
                  Once Department Admin approves and onboards candidates in Stage 7, they appear in this roster.
                </p>
              </div>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b">
                  <tr>
                    <th className="p-3">Employee ID / Name</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">District & Block</th>
                    <th className="p-3">Date of Joining</th>
                    <th className="p-3 text-right">Monthly Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {employees.map((emp) => (
                    <tr key={emp.empId} className="hover:bg-gray-50">
                      <td className="p-3">
                        <strong className="text-gray-900 block text-sm">{emp.name}</strong>
                        <span className="text-[10px] text-gray-400 font-mono">{emp.empId}</span>
                      </td>
                      <td className="p-3 font-semibold text-gray-800">{emp.designation}</td>
                      <td className="p-3 text-gray-600">{emp.district} ({emp.block || "HQ"})</td>
                      <td className="p-3 text-gray-600">{emp.doj}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => { setSelectedEmp(emp); setModal("attendance"); }}
                          className="px-3 py-1.5 bg-[#003366] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 ml-auto"
                        >
                          <FiPlus className="text-xs" /> Log Attendance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>

      {/* ── Attendance Modal ── */}
      {modal === "attendance" && selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              recordAttendance({
                empId: selectedEmp.empId,
                empName: selectedEmp.name,
                month: attForm.month,
                presentDays: Number(attForm.presentDays),
                paidLeaves: Number(attForm.paidLeaves),
                unpaidLeaves: Number(attForm.unpaidLeaves),
                remarks: attForm.remarks
              });
              setModal(null);
            }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl text-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-[#003366]">
              Record Monthly Field Attendance
            </h3>
            <div className="bg-gray-50 p-3 rounded-xl border text-xs">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Employee</span>
              <strong className="text-gray-900 text-sm">{selectedEmp.name}</strong>
              <span className="text-gray-500 block font-mono text-[10px]">{selectedEmp.empId} · {selectedEmp.designation}</span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Billing Month *</label>
              <select
                value={attForm.month}
                onChange={(e) => setAttForm({ ...attForm, month: e.target.value })}
                className="w-full p-2.5 border rounded-lg bg-white"
              >
                {["October 2026", "November 2026", "December 2026", "September 2026"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Present Days *</label>
                <input
                  type="number"
                  min="0"
                  max="31"
                  value={attForm.presentDays}
                  onChange={(e) => setAttForm({ ...attForm, presentDays: e.target.value })}
                  className="w-full p-2.5 border rounded-lg font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Paid Leaves (PL)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={attForm.paidLeaves}
                  onChange={(e) => setAttForm({ ...attForm, paidLeaves: e.target.value })}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Field Officer Remarks</label>
              <textarea
                rows={2}
                value={attForm.remarks}
                onChange={(e) => setAttForm({ ...attForm, remarks: e.target.value })}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-lg text-gray-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#003366] text-white font-bold rounded-lg shadow-sm"
              >
                Save Attendance Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── E-Sign Modal ── */}
      {modal === "esign" && selectedRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              agencyESign(selectedRec.id, signerName);
              setModal(null);
            }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl text-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-[#003366] flex items-center gap-2">
              <FiCheckCircle className="text-green-600" /> Apply Authorized Agency E-Sign
            </h3>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 space-y-1">
              <p><strong>Employee:</strong> {selectedRec.empName} ({selectedRec.empId})</p>
              <p><strong>Month:</strong> {selectedRec.month}</p>
              <p><strong>Days Present:</strong> {selectedRec.presentDays} Days</p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Authorized Signer Name & Designation *
              </label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full p-2.5 border rounded-lg font-bold"
                required
              />
            </div>

            <div className="p-3 bg-gray-50 border rounded-xl text-[11px] text-gray-500">
              🔒 By clicking "Sign Digitally", a cryptographic certificate token is appended to the attendance record for compliance auditing by Department of Panchayati Raj.
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-lg text-gray-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg shadow-sm"
              >
                Sign Digitally & Authenticate
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default AgencyPortal;
