import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#001d3d] text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛</span>
            <div className="leading-tight">
              <h3 className="font-bold text-white text-base">रोज़गार राजस्थान</h3>
              <p className="text-[10px] text-[#FF9933] font-semibold uppercase tracking-wider">Panchayati Raj Job Portal</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            End-to-end digital workforce platform for Panchayati Raj recruitment, attendance management, and Direct Benefit Transfer payroll.
          </p>
          <div className="pt-1">
            <p className="text-[11px] text-gray-500">Technology & Deployment Partner:</p>
            <p className="text-xs font-bold text-[#FF9933]">Optatech Innovation Private Limited</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 border-b border-gray-700 pb-2">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            {[
              { to: "/", label: "Home" },
              { to: "/jobs", label: "Current Openings (Direct Apply)" },
              { to: "/apply", label: "Apply / Track Application" },
              { to: "/register", label: "Submit Resume (Talent Pool)" },
              { to: "/login", label: "Portal Login (Candidate / Admin / Agency)" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact & Helpdesk" },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-[#FF9933] transition">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 border-b border-gray-700 pb-2">Government Portals</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="https://rajasthan.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#FF9933]">rajasthan.gov.in (State Portal)</a></li>
            <li><a href="https://sso.rajasthan.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#FF9933]">SSO Rajasthan Single Sign-On</a></li>
            <li><a href="https://panchayat.rajasthan.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#FF9933]">Panchayati Raj Department</a></li>
            <li><a href="https://janaadhaar.rajasthan.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#FF9933]">Jan Aadhaar Authority</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 border-b border-gray-700 pb-2">Support & Assistance</h4>
          <div className="text-xs text-gray-400 space-y-2">
            <p>Optatech Innovation Private Limited<br />Jaipur, Rajasthan – 302017, India</p>
            <p>📧 contact@optatechinnovation.com</p>
            <p>📞 Toll-Free: 1800-180-6127</p>
            <p className="pt-2">
              <a href="https://www.optatechinnovation.com" target="_blank" rel="noreferrer" className="text-[#FF9933] font-semibold hover:underline text-[11px]">
                www.optatechinnovation.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-3 px-4 text-center text-[11px] text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Government of Rajasthan · Developed by Optatech Innovation Private Limited.</span>
          <span className="text-[#FF9933] font-medium">Department of Panchayati Raj · All Rights Reserved</span>
        </div>
      </div>

      {/* Bottom tricolor */}
      <div className="tricolor-stripe" />
    </footer>
  );
};

export default Footer;
