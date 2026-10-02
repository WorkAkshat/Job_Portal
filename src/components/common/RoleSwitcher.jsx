import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiSettings, FiUsers, FiBarChart2, FiLayers, FiRotateCcw } from "react-icons/fi";
import { useWorkforce, ROLES } from "../../context/WorkforceContext";

const RoleSwitcher = () => {
  const { activeRole, setActiveRole, resetToDefaults } = useWorkforce();
  const location = useLocation();

  const roles = [
    {
      role: ROLES.CANDIDATE,
      label: "Candidate Portal",
      tagline: "Apply. Track. Grow.",
      path: "/candidate",
      icon: FiUser,
      color: "from-blue-600 to-indigo-600"
    },
    {
      role: ROLES.ADMIN,
      label: "Administrator Portal",
      tagline: "Manage. Monitor. Enable.",
      path: "/admin",
      icon: FiSettings,
      color: "from-emerald-600 to-teal-700"
    },
    {
      role: ROLES.AGENCY,
      label: "Agency User Portal",
      tagline: "Record. Approve. Collaborate.",
      path: "/agency",
      icon: FiUsers,
      color: "from-amber-600 to-orange-600"
    },
    {
      role: ROLES.MIS,
      label: "MIS / Department Portal",
      tagline: "View. Analyze. Stay informed.",
      path: "/mis",
      icon: FiBarChart2,
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white py-2.5 px-4 sm:px-6 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Organization & Active Role Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Role-Based Access:
          </span>
          <span className="bg-emerald-950 text-emerald-300 px-3 py-1 rounded-md border border-emerald-700 font-semibold flex items-center gap-1.5">
            Active: <span className="underline">{activeRole}</span>
          </span>
        </div>

        {/* Center: Switch Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.role;
            const isCurrentPage = location.pathname.startsWith(r.path);

            return (
              <Link
                key={r.role}
                to={r.path}
                onClick={() => setActiveRole(r.role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive || isCurrentPage
                    ? `bg-gradient-to-r ${r.color} text-white shadow-md ring-1 ring-white/30 scale-105`
                    : "bg-gray-800/80 hover:bg-gray-700 text-gray-300"
                }`}
                title={r.tagline}
              >
                <Icon className="text-sm" />
                <span>{r.label.replace(" Portal", "")}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Architecture & Reset Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/architecture"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-medium text-[11px] border border-slate-700"
            title="View Solution Architecture & End-to-End Scope"
          >
            <FiLayers />
            <span>Architecture & Scope</span>
          </Link>
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-red-900/60 text-gray-400 hover:text-red-200 text-[11px] transition"
            title="Reset simulation data to initial defaults"
          >
            <FiRotateCcw />
            <span>Reset Data</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoleSwitcher;
