"use client";

import { useState } from "react";
import Link from "next/link";

// Custom stats icons matching Figma design
const FRESH_LEADS_ICON = (
  <div className="w-[32px] h-[32px] rounded-full bg-[#FEF9C3] flex items-center justify-center text-[#EAB308]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
    </svg>
  </div>
);

const TODAY_CALLBACK_ICON = (
  <div className="w-[32px] h-[32px] rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  </div>
);

const REACTIVE_STUDENTS_ICON = (
  <div className="w-[32px] h-[32px] rounded-full bg-[#FFEDD5] flex items-center justify-center text-[#EA580C]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  </div>
);

const NOT_CONNECTED_ICON = (
  <div className="w-[32px] h-[32px] rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
    </svg>
  </div>
);

const UNREAD_MESSAGES_ICON = (
  <div className="w-[32px] h-[32px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  </div>
);

const TOTAL_LEADS_ICON = (
  <div className="w-[32px] h-[32px] rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  </div>
);

// 6 Stats Cards matching Image 11 exactly
const STATS_DATA = [
  { label: "Fresh Leads", value: "15", icon: FRESH_LEADS_ICON, isActive: false },
  { label: "Today's Callback", value: "04", icon: TODAY_CALLBACK_ICON, isActive: true }, // Highlighted card
  { label: "Reactive Students", value: "114", icon: REACTIVE_STUDENTS_ICON, isActive: false },
  { label: "Not Connected Yet", value: "56", icon: NOT_CONNECTED_ICON, isActive: false },
  { label: "Unread Messages", value: "03", icon: UNREAD_MESSAGES_ICON, isActive: false },
  { label: "Total leads", value: "1411", icon: TOTAL_LEADS_ICON, isActive: false },
];

const RECENT_LEADS = [
  { id: "L-9043", name: "Rohan Sharma", college: "IIT Delhi", course: "B.Tech CSE", status: "Fresh", date: "Just now" },
  { id: "L-9042", name: "Aditya shah", college: "BITS Pilani", course: "M.Sc Economics", status: "Callback", date: "10 mins ago" },
  { id: "L-9041", name: "Kabir Mehta", college: "SRM Chennai", course: "BBA Finance", status: "Interested", date: "1 hr ago" },
  { id: "L-9040", name: "Sneha Sen", college: "Delhi University", course: "B.Com Hons", status: "Followup", date: "3 hrs ago" },
  { id: "L-9039", name: "Devansh Dixit", college: "VIT Vellore", course: "B.Tech Biotech", status: "Fresh", date: "Yesterday" },
];

export default function DashboardOverview() {
  const [stats] = useState(STATS_DATA);
  const [recentLeads] = useState(RECENT_LEADS);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Fresh":
        return <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">Fresh</span>;
      case "Callback":
        return <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-50 text-amber-700 rounded-full border border-amber-200">Callback</span>;
      case "Interested":
        return <span className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">Interested</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-50 text-slate-700 rounded-full border border-slate-200">Follow-up</span>;
    }
  };

  return (
    <div className="flex flex-col font-poppins">
      
      {/* Welcome Heading (Forms 68px top offset when combined with padding) */}
      <div className="mb-[20px]">
        <h3 className="text-[20px] font-bold text-slate-800 leading-none">Welcome Vikash</h3>
      </div>

      {/* Stats Cards Row (6 Columns, gap 16px) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[16px] mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between h-[92px] p-[12px] bg-white border rounded-[8px] transition-all duration-200 hover:shadow-sm ${
              stat.isActive ? "border-[#0D3B59] ring-1 ring-[#0D3B59]" : "border-[#E5E9EC]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[26px] font-bold text-slate-850 leading-none">{stat.value}</span>
              {stat.icon}
            </div>
            <span className="text-[12px] text-slate-500 font-medium leading-none">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Grid of Leads and Reminders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Recent leads table */}
        <div className="xl:col-span-2 bg-white rounded-[12px] border border-[#CFD8DE] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#E5E9EC] flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-slate-800">Recent Leads Activity</h4>
            <Link href="/dashboard/fresh-leads" className="text-[12px] font-bold text-brand-800 hover:text-[#092C42] transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Lead ID</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Target College</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600 font-medium">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{lead.id}</td>
                    <td className="px-6 py-4">{lead.name}</td>
                    <td className="px-6 py-4">{lead.college}</td>
                    <td className="px-6 py-4 text-slate-500">{lead.course}</td>
                    <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/lead/${lead.id}`} className="text-brand-800 hover:underline font-bold text-[12px]">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Callback panel */}
        <div className="bg-white rounded-[12px] border border-[#CFD8DE] shadow-sm p-6 flex flex-col">
          <div className="border-b border-[#E5E9EC] pb-4 mb-4 flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-slate-800">Today's Callbacks</h4>
            <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">15 Left</span>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="p-3.5 bg-slate-50 rounded-[8px] border border-slate-100 flex justify-between items-start">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">Aditya shah</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Time: 12:45 PM • BITS Economics</p>
              </div>
              <button className="text-[11px] font-bold text-brand-800 bg-white border border-slate-200 hover:border-brand-800 px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer">
                Call
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-[8px] border border-slate-100 flex justify-between items-start">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">Rahul Varma</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Time: 02:00 PM • SRM Chennai</p>
              </div>
              <button className="text-[11px] font-bold text-brand-800 bg-white border border-slate-200 hover:border-brand-800 px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer">
                Call
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-[8px] border border-slate-100 flex justify-between items-start">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">Priya Nair</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Time: 04:30 PM • Symbiosis Pune</p>
              </div>
              <button className="text-[11px] font-bold text-brand-800 bg-white border border-slate-200 hover:border-brand-800 px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer">
                Call
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
