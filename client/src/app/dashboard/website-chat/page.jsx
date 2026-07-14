"use client";

import { useState } from "react";

const INITIAL_VISITORS = [
  { id: "v-801", name: "Guest Visitor #801", page: "/courses/engineering", duration: "3m 42s", ip: "192.168.1.45" },
  { id: "v-802", name: "Guest Visitor #802", page: "/admission/eligibility", duration: "1m 15s", ip: "103.88.22.4" },
];

export default function WebsiteChatPage() {
  const [visitors] = useState(INITIAL_VISITORS);

  return (
    <div className="flex flex-col gap-6 font-poppins">
      <div>
        <h3 className="text-xl font-bold text-slate-800">Live Website Chat Support</h3>
        <p className="text-[13px] text-slate-500 mt-1">Real-time tracking and active support chats for students browsing the website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col gap-4">
          <h4 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-3">Active Visitors Online</h4>
          <div className="flex flex-col gap-3">
            {visitors.map((v) => (
              <div key={v.id} className="p-4 bg-slate-50 rounded-[8px] border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-slate-900">{v.name}</p>
                  <p className="text-[12px] text-slate-500 mt-1">Viewing: <code className="text-brand-800 bg-slate-100 px-1 rounded">{v.page}</code></p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Session length: {v.duration} • IP: {v.ip}</p>
                </div>
                <button className="h-[32px] px-3 bg-brand-800 text-white rounded-[6px] text-[12px] font-bold hover:bg-brand-900 transition-colors cursor-pointer">
                  Initiate Chat
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col justify-center items-center text-center text-slate-400 gap-3">
          <span className="text-3xl">📭</span>
          <p className="text-[13px] font-bold">No active support conversations right now.</p>
          <p className="text-[11px] text-slate-400">Incoming support inquiries from the website chat widget will display here instantly.</p>
        </div>
      </div>
    </div>
  );
}
