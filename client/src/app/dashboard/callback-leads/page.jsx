"use client";

import { useState } from "react";

const INITIAL_CALLBACKS = [
  { id: "L-9042", name: "Ananya Iyer", college: "BITS Pilani", course: "M.Sc Economics", date: "Today", time: "12:45 PM", notes: "Ask for parents contact" },
  { id: "L-9037", name: "Rahul Varma", college: "SRM Chennai", course: "B.Tech ECE", date: "Today", time: "02:00 PM", notes: "Provide fee structure" },
  { id: "L-9034", name: "Priya Nair", college: "Symbiosis Pune", course: "BBA LLB", date: "Today", time: "04:30 PM", notes: "Send hostel brochures" },
  { id: "L-9029", name: "Vikram Sethi", college: "Amity Noida", course: "B.Arch", date: "Tomorrow", time: "11:00 AM", notes: "Wants scholarship info" },
  { id: "L-9025", name: "Tanya Grover", college: "LPU Jalandhar", course: "MBA HR", date: "Tomorrow", time: "03:15 PM", notes: "Review CAT score card" },
];

export default function CallbackLeadsPage() {
  const [callbacks] = useState(INITIAL_CALLBACKS);

  return (
    <div className="flex flex-col gap-6 font-poppins">
      <div>
        <h3 className="text-xl font-bold text-slate-800">Callback Follow-Ups</h3>
        <p className="text-[13px] text-slate-500 mt-1">Review scheduled student callbacks and follow-ups categorized by date and priority.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's callbacks */}
        <div className="lg:col-span-2 bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col gap-4">
          <h4 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-3">Scheduled for Today</h4>
          <div className="flex flex-col gap-3">
            {callbacks
              .filter((c) => c.date === "Today")
              .map((c) => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-[8px] border border-slate-100 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-slate-900">{c.name}</span>
                      <span className="text-[11px] font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded">{c.id}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 mt-1">Target: {c.college} • {c.course}</p>
                    <p className="text-[12px] text-amber-700 font-semibold mt-1">🕒 Time: {c.time}</p>
                    <p className="text-[11px] text-slate-400 italic mt-1.5">Note: {c.notes}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-[32px] px-3 bg-brand-800 text-white rounded-[6px] text-[12px] font-bold hover:bg-brand-900 transition-colors cursor-pointer">
                      Start Call
                    </button>
                    <button className="h-[32px] px-3 bg-white border border-slate-200 text-slate-600 rounded-[6px] text-[12px] font-bold hover:bg-slate-50 transition-colors cursor-pointer">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Upcoming callbacks summary */}
        <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col gap-4">
          <h4 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-3">Upcoming Callbacks</h4>
          <div className="flex flex-col gap-3">
            {callbacks
              .filter((c) => c.date !== "Today")
              .map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-[8px] border border-slate-100">
                  <div className="flex justify-between items-start">
                    <span className="text-[12px] font-bold text-slate-800">{c.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{c.date} • {c.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{c.college} • {c.course}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
