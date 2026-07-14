import React from "react";

export function Input({ label, type = "text", placeholder = "", value, onChange, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="text-[13px] font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[44px] px-4 w-full border border-slate-200 rounded-[8px] bg-white text-[13px] outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-colors placeholder-slate-400 text-slate-800"
        {...props}
      />
    </div>
  );
}
