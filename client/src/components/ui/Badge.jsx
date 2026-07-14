import React from "react";

export function Badge({ children, variant = "default", className = "" }) {
  const baseStyle = "px-2.5 py-1 text-[11px] font-semibold border rounded-full inline-flex items-center justify-center";
  const variants = {
    default: "bg-slate-50 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
