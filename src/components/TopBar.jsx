import { useState, useEffect } from "react";

const TopBar = () => {
  const [fontSize, setFontSize] = useState(16);
  useEffect(() => { document.body.style.fontSize = `${fontSize}px`; }, [fontSize]);

  return (
    <>
      {/* Tricolor stripe */}
      <div className="tricolor-stripe" />

      <div className="w-full bg-[#003366] text-white text-[11px] font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-1.5 gap-2">

          <span className="flex items-center gap-2 opacity-90">
            <span>🇮🇳</span>
            <span>Government of Rajasthan | राजस्थान सरकार</span>
          </span>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Skip to content */}
            <a href="#main-content" className="hidden sm:inline text-blue-200 hover:text-white underline">
              Skip to Main Content
            </a>

            {/* Font controls */}
            <div className="flex border border-white/30 rounded overflow-hidden">
              <button onClick={() => setFontSize(f => Math.min(22, f + 1))} className="px-2 py-0.5 hover:bg-white/20 transition" aria-label="Increase font">A+</button>
              <button onClick={() => setFontSize(16)} className="px-2 py-0.5 border-x border-white/30 hover:bg-white/20 transition" aria-label="Reset font">A</button>
              <button onClick={() => setFontSize(f => Math.max(12, f - 1))} className="px-2 py-0.5 hover:bg-white/20 transition" aria-label="Decrease font">A-</button>
            </div>

            {/* Screen Reader */}
            <span className="hidden md:inline text-blue-200">Screen Reader Access</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;