import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiShield, FiBriefcase, FiLock, FiFileText } from "react-icons/fi";
import { useWorkforce } from "../context/WorkforceContext";
import govtLogo from "../assets/rajasthan_govt_logo.png";
import cmImage from "../assets/cm_rajasthan.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    registeredUser, logoutUser,
    adminSession, logoutAdmin,
    agencySession, logoutAgency
  } = useWorkforce();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Job Openings" },
    { to: "/apply", label: "Apply / Track" },
    { to: "/register", label: "Submit Resume" },
    { to: "/admin", label: "Admin" },
    { to: "/agency", label: "Agency" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-white">
      {/* Main Header with Official Logo, CM Portrait and Active Auth Status */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2">

          {/* Left: Official Government of Rajasthan Logo & Branding */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <img
              src={govtLogo}
              alt="Government of Rajasthan Logo"
              className="h-10 sm:h-12 w-auto object-contain transition group-hover:scale-105"
            />
            <div className="border-l border-gray-300 pl-2.5 sm:pl-3 leading-tight">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-extrabold text-[#003366] tracking-tight">
                  रोज़गार राजस्थान
                </h1>
                <span className="hidden md:inline-block text-[9px] font-bold bg-[#FF9933] text-[#001d3d] px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Panchayati Raj
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">
                Workforce Deployment Portal · Optatech Innovation Pvt. Ltd.
              </p>
            </div>
          </Link>

          {/* Right: Hon'ble CM Portrait + Role Badges / Logins & Actions */}
          <div className="flex items-center gap-3">

            {/* Hon'ble Chief Minister Card */}
            <div className="hidden lg:flex items-center gap-2.5 bg-gradient-to-r from-orange-50/90 to-amber-50/50 border border-amber-200/90 px-3 py-1 rounded-xl shadow-xs">
              <img
                src={cmImage}
                alt="Shri Bhajan Lal Sharma, Hon'ble Chief Minister of Rajasthan"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#FF9933] shadow-sm"
              />
              <div className="leading-tight text-left">
                <span className="text-[11px] font-extrabold text-[#003366] block">
                  श्री भजन लाल शर्मा
                </span>
                <span className="text-[9px] text-gray-600 font-medium block">
                  माननीय मुख्यमंत्री, राजस्थान
                </span>
              </div>
            </div>

            {/* Candidate Session Badge */}
            {registeredUser && (
              <div className="hidden md:flex items-center gap-2 text-xs bg-green-50 text-green-800 border border-green-200 px-3 py-1.5 rounded-lg">
                <FiUser className="text-green-700 text-sm" />
                <div className="leading-none text-left">
                  <span className="font-bold block truncate max-w-[110px]">{registeredUser.fullName}</span>
                  <span className="text-[9px] text-green-600">Candidate</span>
                </div>
                <button
                  onClick={logoutUser}
                  className="ml-1 text-red-500 hover:text-red-700 p-1"
                  title="Logout Candidate"
                >
                  <FiLogOut />
                </button>
              </div>
            )}

            {/* Admin Session Badge */}
            {adminSession && (
              <div className="hidden md:flex items-center gap-2 text-xs bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-lg">
                <FiShield className="text-[#003366] text-sm" />
                <div className="leading-none text-left">
                  <span className="font-bold block">Admin Console</span>
                  <span className="text-[9px] text-blue-600">State Nodal Officer</span>
                </div>
                <button
                  onClick={logoutAdmin}
                  className="ml-1 text-red-500 hover:text-red-700 p-1"
                  title="Logout Admin"
                >
                  <FiLogOut />
                </button>
              </div>
            )}

            {/* Agency Session Badge */}
            {agencySession && (
              <div className="hidden md:flex items-center gap-2 text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg">
                <FiBriefcase className="text-amber-700 text-sm" />
                <div className="leading-none text-left">
                  <span className="font-bold block">Agency Partner</span>
                  <span className="text-[9px] text-amber-700">Optatech Placement</span>
                </div>
                <button
                  onClick={logoutAgency}
                  className="ml-1 text-red-500 hover:text-red-700 p-1"
                  title="Logout Agency"
                >
                  <FiLogOut />
                </button>
              </div>
            )}

            {/* Login Button if not logged in to anything */}
            {!registeredUser && !adminSession && !agencySession && (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF9933] hover:bg-[#e68a00] text-[#001d3d] text-xs font-bold rounded-lg shadow-sm transition"
              >
                <FiLock className="text-xs" /> Login / लॉगिन
              </Link>
            )}

            {/* Switch Role link if logged in */}
            {(registeredUser || adminSession || agencySession) && (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#003366] font-bold hover:underline px-1"
                title="Switch role"
              >
                Switch Role
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#003366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-between py-0">
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2.5 text-[13px] font-semibold tracking-wide transition-colors border-b-2 ${
                    isActive(link.to)
                      ? "bg-white/10 text-[#FF9933] border-[#FF9933]"
                      : "text-white/90 hover:text-white hover:bg-white/10 border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Direct Login CTA in Nav */}
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={`text-[12px] font-bold px-3 py-1 rounded transition flex items-center gap-1 ${
                  isActive("/login")
                    ? "bg-[#FF9933] text-[#001d3d]"
                    : "text-white/80 hover:text-white bg-white/10 hover:bg-white/20"
                }`}
              >
                <FiLock className="text-xs" /> Portal Login
              </Link>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden py-3 space-y-1">
              {/* Mobile CM Card */}
              <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 p-2.5 rounded-xl mx-2 mb-2 text-white">
                <img
                  src={cmImage}
                  alt="Shri Bhajan Lal Sharma"
                  className="w-10 h-10 rounded-full object-cover border border-[#FF9933]"
                />
                <div className="leading-tight">
                  <span className="text-xs font-bold block">श्री भजन लाल शर्मा</span>
                  <span className="text-[10px] text-gray-300 block">माननीय मुख्यमंत्री, राजस्थान</span>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2 text-sm font-semibold rounded-lg transition ${
                    isActive(link.to)
                      ? "bg-white/15 text-[#FF9933]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-bold bg-[#FF9933] text-[#001d3d] rounded-lg mt-2 text-center"
              >
                🔐 Portal Login (Candidate / Agency / Admin)
              </Link>

              {/* Mobile Active Logins */}
              <div className="pt-2 border-t border-white/10 space-y-1">
                {registeredUser && (
                  <div className="flex items-center justify-between px-4 py-2 text-xs text-green-300 bg-white/5 rounded">
                    <span>👤 Candidate: {registeredUser.fullName}</span>
                    <button onClick={logoutUser} className="text-red-300 font-bold">Logout</button>
                  </div>
                )}
                {adminSession && (
                  <div className="flex items-center justify-between px-4 py-2 text-xs text-blue-300 bg-white/5 rounded">
                    <span>🛡️ Admin: {adminSession.username}</span>
                    <button onClick={logoutAdmin} className="text-red-300 font-bold">Logout</button>
                  </div>
                )}
                {agencySession && (
                  <div className="flex items-center justify-between px-4 py-2 text-xs text-amber-300 bg-white/5 rounded">
                    <span>🏢 Agency: Optatech</span>
                    <button onClick={logoutAgency} className="text-red-300 font-bold">Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;