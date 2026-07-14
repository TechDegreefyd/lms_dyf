import React from "react";

export function Table({ headers, children }) {
  return (
    <div className="w-full bg-white rounded-[12px] border border-slate-200 shadow-premium overflow-hidden font-poppins">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {headers.map((h, i) => (
                <th key={i} className="px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600 font-medium">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
