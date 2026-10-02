import { useState } from "react";

const colors = [
  { name: "Default", value: "#009933" },
  { name: "Red", value: "#ED1C24" },
  { name: "Brown", value: "#CC9900" },
  { name: "Blue", value: "#4650DC" },
  { name: "Orange", value: "#FF9900" },
  { name: "Black", value: "#222222" },
];

const ColorSwitcher = () => {
  const [open, setOpen] = useState(false);

  const changeColor = (color) => {
    document.documentElement.style.setProperty("--theme-color", color);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        🎨
      </button>

      {/* Color Panel */}
      {open && (
        <div className="mt-3 bg-white p-3 rounded-xl shadow-xl flex flex-col gap-2">
          {colors.map((c, i) => (
            <button
              key={i}
              title={c.name}
              onClick={() => changeColor(c.value)}
              className="w-8 h-8 rounded-full border hover:scale-110 transition"
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSwitcher;