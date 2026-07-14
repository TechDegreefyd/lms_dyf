import React from "react";

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-poppins">
      <div className="bg-white rounded-[12px] border border-slate-200 w-full max-w-[500px] p-6 shadow-premium relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
        >
          ✕
        </button>
        {title && <h3 className="text-[16px] font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
}
