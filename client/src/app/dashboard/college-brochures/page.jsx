"use client";

import { useState } from "react";

const INITIAL_BROCHURES = [
  { id: "B-101", college: "IIT Bombay", courses: ["B.Tech", "M.Tech", "PhD"], fileSize: "4.2 MB", downloads: 284 },
  { id: "B-102", college: "BITS Pilani", courses: ["B.E", "M.E", "MBA"], fileSize: "5.8 MB", downloads: 412 },
  { id: "B-103", college: "SRM University", courses: ["B.Tech", "BBA", "MCA"], fileSize: "3.1 MB", downloads: 198 },
  { id: "B-104", college: "Symbiosis Pune", courses: ["BBA", "MBA", "LLB"], fileSize: "6.5 MB", downloads: 304 },
  { id: "B-105", college: "VIT Vellore", courses: ["B.Tech", "MCA", "M.Sc"], fileSize: "4.8 MB", downloads: 521 },
];

export default function CollegeBrochuresPage() {
  const [brochures] = useState(INITIAL_BROCHURES);

  return (
    <div className="flex flex-col gap-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">College Brochures</h3>
          <p className="text-[13px] text-slate-500 mt-1">Manage and share course brochures, admission pamphlets, and fees brochures directly with students.</p>
        </div>
        <button className="h-[40px] px-4 bg-brand-800 hover:bg-brand-900 text-white rounded-[8px] text-[13px] font-semibold transition-colors shadow-premium cursor-pointer">
          + Upload Brochure
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brochures.map((brochure) => (
          <div key={brochure.id} className="bg-white rounded-[12px] p-6 border border-slate-200 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[28px]">📄</span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">{brochure.id}</span>
              </div>
              <h4 className="text-[15px] font-bold text-slate-800">{brochure.college}</h4>
              <p className="text-[11px] text-slate-400 mt-1">Size: {brochure.fileSize} • Downloads: {brochure.downloads}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {brochure.courses.map((course, idx) => (
                  <span key={idx} className="text-[10px] font-semibold bg-brand-50 text-brand-800 px-2 py-0.5 rounded border border-brand-100">
                    {course}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 border-t border-slate-100 pt-4">
              <button className="flex-1 h-[34px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[6px] text-[12px] font-bold transition-colors cursor-pointer">
                Download
              </button>
              <button className="flex-1 h-[34px] bg-brand-800 hover:bg-brand-900 text-white rounded-[6px] text-[12px] font-bold transition-colors cursor-pointer">
                Share Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
