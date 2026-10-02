import React from "react";
import {
  FiFileText,
  FiUsers,
  FiCalendar,
  FiUserCheck,
  FiCheckCircle,
  FiMail,
  FiUserPlus,
  FiCheckSquare,
  FiEdit3,
  FiDollarSign,
  FiSend,
  FiBarChart2
} from "react-icons/fi";
import { WORKFLOW_STAGES } from "../../data/mockInitialData";

const iconMap = {
  1: FiFileText,
  2: FiUsers,
  3: FiCalendar,
  4: FiUserCheck,
  5: FiCheckCircle,
  6: FiMail,
  7: FiUserPlus,
  8: FiCheckSquare,
  9: FiEdit3,
  10: FiDollarSign,
  11: FiSend,
  12: FiBarChart2
};

const StageTracker = ({ currentStage = 1, candidateName = "", interactive = false, onStageClick = null }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            End-to-End Process Flow
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            12-Stage Panchayati Workforce Lifecycle
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            From candidate application to payroll, salary slip, and management reporting
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">
          <FiCheckCircle className="text-base" />
          <span>TRACEABLE STATUS AT EVERY STAGE</span>
        </div>
      </div>

      {candidateName && (
        <div className="mb-6 p-3 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-700">
            Tracking Pipeline for: <strong className="text-blue-900">{candidateName}</strong>
          </span>
          <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-bold">
            Stage {currentStage} of 12: {WORKFLOW_STAGES.find((s) => s.id === currentStage)?.name}
          </span>
        </div>
      )}

      {/* Row 1: Stages 1 to 6 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 relative">
        {WORKFLOW_STAGES.slice(0, 6).map((stage) => {
          const Icon = iconMap[stage.id] || FiFileText;
          const isCompleted = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => interactive && onStageClick && onStageClick(stage.id)}
              className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300 ${
                interactive ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""
              } ${
                isCurrent
                  ? "bg-gradient-to-b from-green-50 to-emerald-100/60 border-green-600 shadow-md ring-2 ring-green-400/50"
                  : isCompleted
                  ? "bg-emerald-50/40 border-emerald-300 text-gray-800"
                  : "bg-gray-50/70 border-gray-200 text-gray-400 opacity-70"
              }`}
            >
              {/* Step number bubble */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 shadow-sm transition-transform duration-300 ${
                  isCurrent
                    ? "bg-green-700 text-white scale-110 shadow-green-300"
                    : isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {stage.id}
              </div>

              {/* Icon */}
              <div
                className={`text-xl mb-1.5 ${
                  isCurrent ? "text-green-700 font-bold" : isCompleted ? "text-emerald-700" : "text-gray-400"
                }`}
              >
                <Icon />
              </div>

              {/* Title & Sub */}
              <h4 className={`text-xs font-bold leading-tight ${isCurrent ? "text-green-900" : isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                {stage.name}
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                {stage.sub}
              </p>

              {/* Role badge */}
              <span className="mt-2 text-[9px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
                {stage.role}
              </span>
            </div>
          );
        })}
      </div>

      {/* Row 2: Stages 7 to 12 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {WORKFLOW_STAGES.slice(6, 12).map((stage) => {
          const Icon = iconMap[stage.id] || FiFileText;
          const isCompleted = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => interactive && onStageClick && onStageClick(stage.id)}
              className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300 ${
                interactive ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""
              } ${
                isCurrent
                  ? "bg-gradient-to-b from-green-50 to-emerald-100/60 border-green-600 shadow-md ring-2 ring-green-400/50"
                  : isCompleted
                  ? "bg-emerald-50/40 border-emerald-300 text-gray-800"
                  : "bg-gray-50/70 border-gray-200 text-gray-400 opacity-70"
              }`}
            >
              {/* Step number bubble */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 shadow-sm transition-transform duration-300 ${
                  isCurrent
                    ? "bg-green-700 text-white scale-110 shadow-green-300"
                    : isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {stage.id}
              </div>

              {/* Icon */}
              <div
                className={`text-xl mb-1.5 ${
                  isCurrent ? "text-green-700 font-bold" : isCompleted ? "text-emerald-700" : "text-gray-400"
                }`}
              >
                <Icon />
              </div>

              {/* Title & Sub */}
              <h4 className={`text-xs font-bold leading-tight ${isCurrent ? "text-green-900" : isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                {stage.name}
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                {stage.sub}
              </p>

              {/* Role badge */}
              <span className="mt-2 text-[9px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
                {stage.role}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageTracker;
