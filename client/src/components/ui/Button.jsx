import React from "react";

export function Button({ children, onClick, type = "button", variant = "primary", className = "", ...props }) {
  const baseStyle = "h-[40px] px-4 rounded-[8px] text-[13px] font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer";
  const variants = {
    primary: "bg-brand-800 hover:bg-brand-900 text-white shadow-premium",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-[0_4px_12px_rgba(225,29,72,0.15)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
