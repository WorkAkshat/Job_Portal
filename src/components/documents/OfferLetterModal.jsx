import React from "react";
import { FiX, FiPrinter, FiCheck, FiAward, FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";

const OfferLetterModal = ({ candidate, onClose, onAccept = null, isCandidateView = false }) => {
  if (!candidate || !candidate.offerDetails) return null;

  const { offerDetails } = candidate;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        
        {/* Action Header Bar (Hidden on print) */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <FiAward className="text-emerald-400 text-lg" />
            <span className="font-semibold text-sm">Official Offer of Appointment</span>
            <span className="text-xs text-gray-400">({offerDetails.offerLetterNo})</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs rounded-lg transition"
            >
              <FiPrinter /> Print / Save PDF
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
        <div className="p-8 sm:p-12 text-gray-800 font-sans print:p-0">
          
          {/* Letterhead */}
          <div className="border-b-2 border-emerald-700 pb-6 mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                OPTATECH INNOVATION PRIVATE LIMITED
              </h1>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mt-0.5">
                Panchayati Raj Workforce & Technology Implementation Partner
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Corporate Office: Jaipur, Rajasthan | Web: www.optatechinnovation.com
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded border border-emerald-300">
                OFFICIAL APPOINTMENT
              </span>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Ref:</strong> {offerDetails.offerLetterNo}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Date:</strong> {offerDetails.issuedDate || "2026-09-26"}
              </p>
            </div>
          </div>

          {/* Candidate Greeting */}
          <div className="mb-6 text-sm">
            <p className="font-semibold text-gray-900">To,</p>
            <p className="font-bold text-base text-gray-900">{candidate.name}</p>
            <p className="text-gray-600">{candidate.panchayat}, {candidate.block} Block</p>
            <p className="text-gray-600">District: {candidate.district}, Rajasthan</p>
            <p className="text-gray-600">Application ID: {candidate.id}</p>
          </div>

          {/* Subject */}
          <div className="mb-6 p-3 bg-gray-50 border-l-4 border-emerald-600 text-sm font-semibold text-gray-900">
            Subject: Offer of Appointment for the position of "{offerDetails.designation}" under Rajasthan Panchayati Workforce Deployment.
          </div>

          {/* Body Content */}
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed mb-8">
            <p>
              Dear <strong>{candidate.name}</strong>,
            </p>
            <p>
              Subsequent to your application, document screening, and successful performance in the selection interview conducted for Panchayati Raj workforce deployment, we are pleased to offer you the contractual position of <strong>{offerDetails.designation}</strong> with <strong>Optatech Innovation Private Limited</strong> for deployment in the Department of Panchayati Raj, Government of Rajasthan.
            </p>

            {/* Compensation Table */}
            <div className="my-6 border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800 border-b text-xs uppercase tracking-wider">
                Monthly Compensation & Benefits Structure (INR)
              </div>
              <table className="w-full text-left text-xs">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-600">Basic Pay</td>
                    <td className="p-3 font-semibold text-right text-gray-900">₹ {offerDetails.basePay?.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b bg-gray-50/50">
                    <td className="p-3 font-medium text-gray-600">House Rent Allowance (HRA - 16%)</td>
                    <td className="p-3 font-semibold text-right text-gray-900">₹ {offerDetails.hra?.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-600">Dearness Allowance (DA - 40%)</td>
                    <td className="p-3 font-semibold text-right text-gray-900">₹ {offerDetails.da?.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-emerald-50 text-emerald-900 font-bold border-t-2 border-emerald-200">
                    <td className="p-3 text-sm">Total Gross CTC (Monthly)</td>
                    <td className="p-3 text-right text-base">₹ {offerDetails.totalCtc?.toLocaleString()} / month</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terms Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-emerald-600 text-base" />
                <span><strong>Reporting Date:</strong> {offerDetails.joiningDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-emerald-600 text-base" />
                <span><strong>Posting:</strong> {offerDetails.postingLocation}</span>
              </div>
            </div>

            <p className="pt-2">
              Your appointment will be governed by the standard service rules, code of conduct, and attendance regulations of the Panchayati Raj deployment project.
            </p>
          </div>

          {/* Signatures */}
          <div className="border-t pt-8 mt-8 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="h-14 flex items-end">
                <span className="font-serif italic font-bold text-gray-700 text-base border-b border-gray-400 pb-1">
                  Harish Gupta
                </span>
              </div>
              <p className="font-bold text-gray-900">Authorized Signatory</p>
              <p className="text-gray-500">Optatech Innovation Private Limited</p>
            </div>
            <div className="text-right">
              <div className="h-14 flex items-end justify-end">
                <span className="font-mono text-xs text-gray-400 border-b border-gray-400 pb-1">
                  {candidate.status === "Onboarded & Employee Record Created" ? "✓ Digitally Accepted" : "[ Candidate Signature ]"}
                </span>
              </div>
              <p className="font-bold text-gray-900">{candidate.name}</p>
              <p className="text-gray-500">Accepted & Confirmed</p>
            </div>
          </div>

        </div>

        {/* Footer Actions for Candidate */}
        {isCandidateView && candidate.currentStage === 6 && (
          <div className="p-4 bg-emerald-50 border-t border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
            <div>
              <p className="text-xs font-semibold text-emerald-900">
                Are you ready to join the Panchayati Workforce?
              </p>
              <p className="text-[11px] text-emerald-700">
                Clicking accept will generate your official Employee ID and move you to Stage 7 (Onboarding).
              </p>
            </div>
            <button
              onClick={() => {
                if (onAccept) onAccept(candidate.id);
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              <FiCheck /> Accept Offer & Onboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default OfferLetterModal;
