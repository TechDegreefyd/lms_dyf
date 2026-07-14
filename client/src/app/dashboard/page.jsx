"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_STATS = [
  { label: "Total Leads Assigned", value: "1,248", change: "+12% vs last week", trend: "up", icon: "👥" },
  { label: "Fresh Uncontacted", value: "342", change: "42 new today", trend: "up", icon: "📥" },
  { label: "Callbacks Scheduled", value: "87", change: "15 pending action", trend: "neutral", icon: "📞" },
  { label: "Wishlist Applications", value: "194", change: "+8% conversion", trend: "up", icon: "❤️" },
];

const RECENT_LEADS = [
  { id: "L-9043", name: "Rohan Sharma", college: "IIT Delhi", course: "B.Tech CSE", status: "Fresh", date: "Just now" },
  { id: "L-9042", name: "Ananya Iyer", college: "BITS Pilani", course: "M.Sc Economics", status: "Callback", date: "10 mins ago" },
  { id: "L-9041", name: "Kabir Mehta", college: "SRM Chennai", course: "BBA Finance", status: "Interested", date: "1 hr ago" },
  { id: "L-9040", name: "Sneha Sen", college: "Delhi University", course: "B.Com Hons", status: "Followup", date: "3 hrs ago" },
  { id: "L-9039", name: "Devansh Dixit", college: "VIT Vellore", course: "B.Tech Biotech", status: "Fresh", date: "Yesterday" },
];

export default function DashboardOverview() {
  const [stats] = useState(INITIAL_STATS);
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
    <div className="flex flex-col gap-8 font-poppins">
      {/* Welcome banner */}
      <div className="bg-white rounded-[12px] p-6 border border-slate-200 shadow-premium flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Welcome Back, Aditya!</h3>
          <p className="text-[13px] text-slate-500 mt-1">You have 15 callback reminders scheduled for today. Let's close some leads!</p>
        </div>
        <div className="text-2xl bg-brand-50 p-3 rounded-full">👋</div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[12px] p-6 border border-slate-200 shadow-premium flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-semibold text-slate-500">{stat.label}</span>
              <span className="text-xl bg-slate-50 p-1.5 rounded-[8px]">{stat.icon}</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
              <p className="text-[11px] font-medium text-slate-400 mt-1 flex items-center gap-1">
                {stat.trend === "up" ? <span className="text-emerald-600">▲</span> : stat.trend === "down" ? <span className="text-rose-500">▼</span> : null}
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of Leads and Reminders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent leads table */}
        <div className="xl:col-span-2 bg-white rounded-[12px] border border-slate-200 shadow-premium overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-slate-800">Recent Leads Activity</h4>
            <Link href="/dashboard/fresh-leads" className="text-[12px] font-bold text-brand-800 hover:text-brand-900 transition-colors">
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
        <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col">
          <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-slate-800">Todays Callbacks</h4>
            <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">15 Left</span>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="p-3.5 bg-slate-50 rounded-[8px] border border-slate-100 flex justify-between items-start">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">Ananya Iyer</p>
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
