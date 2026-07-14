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

// 6 Stats Cards matching Image 11 exactly with bottom borders
const STATS_DATA = [
  { label: "Fresh Leads", value: "15", icon: FRESH_LEADS_ICON, borderColor: "#EAB308" },
  { label: "Today's Callback", value: "04", icon: TODAY_CALLBACK_ICON, borderColor: "#1D4ED8" },
  { label: "Reactive Students", value: "114", icon: REACTIVE_STUDENTS_ICON, borderColor: "#EA580C" },
  { label: "Not Connected Yet", value: "56", icon: NOT_CONNECTED_ICON, borderColor: "#DC2626" },
  { label: "Unread Messages", value: "03", icon: UNREAD_MESSAGES_ICON, borderColor: "#16A34A" },
  { label: "Total leads", value: "1411", icon: TOTAL_LEADS_ICON, borderColor: "#475569" },
];

// Exact 5 data rows as specified in the mockup
const MOCK_LEADS = [
  { createdOn: "Dec 1, 2025, 02:12 PM", remark: "67", leadId: "STD-90EABBCE", name: "RAJENDRA SHARMA", phone: "931XXXXXXX", mail: "kin***@xxxxxx.com", lastCall: "Dec 03, 2025", whatsappBadge: 2 },
  { createdOn: "Feb 14, 2026, 11:59 AM", remark: "68", leadId: "STD-91EABBCE", name: "Anjali Sharma", phone: "932XXXXXXX", mail: "Mun***@xxxxxx.com", lastCall: "Jul 04, 2026", whatsappBadge: 0 },
  { createdOn: "Mar 27, 2026, 04:32 AM", remark: "69", leadId: "STD-92EABBCE", name: "Nina Patel", phone: "833XXXXXXX", mail: "Sun***@xxxxxx.com", lastCall: "Sep 12, 2026", whatsappBadge: 0 },
  { createdOn: "Apr 09, 2026, 08:01 PM", remark: "70", leadId: "STD-93EABBCE", name: "Jaxon Lee", phone: "730XXXXXXX", mail: "Fun***@xxxxxx.com", lastCall: "Apr 14, 2026", whatsappBadge: 5 },
  { createdOn: "May 12, 2026, 01:23 PM", remark: "71", leadId: "STD-94EABBCE", name: "Sofia Kim", phone: "930XXXXXXX", mail: "ani***@xxxxxx.com", lastCall: "Jun 11, 2026", whatsappBadge: 6 },
];

export default function DashboardOverview() {
  const [leads] = useState(MOCK_LEADS);
  const [searchTerm, setSearchTerm] = useState("");

  const renderSortIndicator = () => (
    <svg className="inline ml-1 text-slate-400" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.leadId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col font-poppins">
      
      {/* Welcome Heading (Creates 68px top offset when combined with main padding) */}
      <div className="mb-[20px]">
        <h3 className="text-[20px] font-bold text-[#121212] leading-none">Welcome Vikash</h3>
      </div>

      {/* Stats Cards Row (6 Columns, gap 16px, each has a colored bottom border) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[16px] mb-6">
        {STATS_DATA.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col justify-between h-[92px] p-[12px] bg-white border border-[#E5E9EC] rounded-[8px] transition-all duration-200 hover:shadow-sm"
            style={{ borderBottomColor: stat.borderColor, borderBottomWidth: "3px" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[26px] font-bold text-slate-850 leading-none">{stat.value}</span>
              {stat.icon}
            </div>
            <span className="text-[12px] text-slate-505 font-medium leading-none">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter Row */}
      <div className="flex items-center gap-[16px] mb-6">
        {/* Search Input, Full Width */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, email, phone, lead ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-white border border-[#CFD8DE] rounded-[8px] text-[13px] outline-none focus:border-[#0D3B59] transition-colors placeholder-slate-400"
          />
          <svg className="absolute left-3.5 top-[12px] text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Filter Button (Funnel icon with blue badge showing count "4") */}
        <button className="relative w-[40px] h-[40px] bg-white border border-[#CFD8DE] rounded-[8px] flex items-center justify-center text-[#0D3B59] hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 bg-[#0D3B59] text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">4</span>
        </button>

        {/* Clear All Button (Red outlined, trash icon + text) */}
        <button
          onClick={() => setSearchTerm("")}
          className="h-[40px] px-4 border border-[#BC3B3B] text-[#BC3B3B] hover:bg-red-55 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span>Clear All</span>
        </button>
      </div>

      {/* Main Table Card Wrapper */}
      <div className="bg-white rounded-[12px] border border-[#CFD8DE] shadow-sm overflow-hidden flex flex-col">
        
        {/* Legend row (Height fits filters + padding: 16px horizontal align) */}
        <div className="px-[16px] py-[14px] flex items-center justify-between border-b border-[#E5E9EC]">
          {/* Checkboxes Legend Row */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] font-medium text-slate-700">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600 bg-emerald-50 border-emerald-400 focus:ring-emerald-500 accent-emerald-600" />
              <span>Reactive Lead</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] font-medium text-slate-700">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-rose-600 bg-rose-50 border-rose-400 focus:ring-rose-500 accent-rose-600" />
              <span>Overdue Callback</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] font-medium text-slate-700">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-500 bg-amber-50 border-amber-400 focus:ring-amber-500 accent-amber-500" />
              <span>Today Callback</span>
            </label>
          </div>

          {/* Quick Header Pagination controls */}
          <div className="flex items-center gap-1.5">
            <button className="w-[28px] h-[28px] rounded-full border border-[#E5E9EC] flex items-center justify-center text-slate-400 hover:text-slate-700 bg-white transition-colors cursor-pointer text-xs">
              &lt;
            </button>
            <button className="w-[28px] h-[28px] rounded-full border border-[#E5E9EC] flex items-center justify-center text-slate-400 hover:text-slate-700 bg-white transition-colors cursor-pointer text-xs">
              &gt;
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#E5E9EC] text-[13px] font-bold text-slate-700">
                <th className="px-[16px] py-4 whitespace-nowrap cursor-pointer hover:bg-slate-50 transition-colors">Created on {renderSortIndicator()}</th>
                <th className="px-[16px] py-4 whitespace-nowrap cursor-pointer hover:bg-slate-50 transition-colors">Remark {renderSortIndicator()}</th>
                <th className="px-[16px] py-4 whitespace-nowrap">Lead ID</th>
                <th className="px-[16px] py-4 whitespace-nowrap">Name</th>
                <th className="px-[16px] py-4 whitespace-nowrap">Phone</th>
                <th className="px-[16px] py-4 whitespace-nowrap">Mail</th>
                <th className="px-[16px] py-4 whitespace-nowrap cursor-pointer hover:bg-slate-50 transition-colors">Last Call {renderSortIndicator()}</th>
                <th className="px-[16px] py-4 whitespace-nowrap text-right">Whtsapp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600 font-medium">
              {filteredLeads.map((lead, idx) => (
                <tr key={lead.leadId} className={`hover:bg-slate-50/60 transition-colors ${idx % 2 === 0 ? "bg-slate-50/30" : "bg-white"}`}>
                  
                  {/* Created On with Calendar icon */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap">
                    <span className="flex items-center gap-2 text-slate-500 font-normal">
                      <svg className="text-slate-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{lead.createdOn}</span>
                    </span>
                  </td>

                  {/* Remark */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap text-slate-500 font-normal">{lead.remark}</td>

                  {/* Lead ID */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap">
                    <Link href={`/dashboard/lead/${lead.leadId}`} className="text-[#0D3B59] hover:underline font-semibold">
                      {lead.leadId}
                    </Link>
                  </td>

                  {/* Student Name */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap text-slate-800 font-semibold">{lead.name}</td>

                  {/* Phone */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap text-slate-600 font-normal">{lead.phone}</td>

                  {/* Mail */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap text-slate-600 font-normal">{lead.mail}</td>

                  {/* Last Call with Calendar icon */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap">
                    <span className="flex items-center gap-2 text-slate-500 font-normal">
                      <svg className="text-slate-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{lead.lastCall}</span>
                    </span>
                  </td>

                  {/* WhatsApp green icon with notification badge */}
                  <td className="px-[16px] py-3.5 whitespace-nowrap text-right">
                    <div className="relative inline-block align-middle cursor-pointer">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="hover:scale-105 transition-transform">
                        <path d="M12.0377 3.29028C7.09761 3.29028 3.07723 7.16261 3.07548 11.9216C3.07432 13.4434 3.48774 14.9287 4.27161 16.2369L3 20.7096L7.75142 19.5094C9.07309 20.2008 10.5427 20.5614 12.0343 20.5604H12.0377C16.9779 20.5604 20.9983 16.6875 21 11.9285C21.0012 9.62338 20.0698 7.45351 18.3772 5.82248C16.6852 4.19086 14.4352 3.29086 12.0377 3.29028ZM12.0377 19.1024H12.0348C10.6982 19.1024 9.3871 18.7563 8.24323 18.1025L7.97032 17.9469L5.15187 18.6588L5.90439 16.0111L5.72729 15.7399C4.98343 14.6007 4.58745 13.2782 4.58806 11.9216C4.58981 7.96564 7.932 4.74828 12.0406 4.74828C14.0299 4.74886 15.9002 5.49615 17.3071 6.85196C18.714 8.20777 19.488 10.0107 19.4868 11.928C19.4851 15.8839 16.1435 19.1024 12.0372 19.1024H12.0377ZM16.1237 13.7285C15.8996 13.6211 14.7987 13.0991 14.5932 13.0265C14.3882 12.9551 14.239 12.918 14.0897 13.134C13.9411 13.35 13.5114 13.836 13.3814 13.9794C13.2501 14.1234 13.1195 14.1408 12.8954 14.0334C12.6712 13.9254 11.9495 13.6978 11.0948 12.9627C10.4288 12.3913 9.97935 11.6853 9.84871 11.4687C9.71806 11.2533 9.83477 11.1365 9.94684 11.0291C10.0473 10.9333 10.171 10.7777 10.2825 10.6517C10.3939 10.5257 10.4311 10.4357 10.5066 10.2917C10.5809 10.1483 10.5437 10.0217 10.4874 9.91428C10.4311 9.8057 9.984 8.74428 9.79645 8.31286C9.61529 7.89248 9.43064 7.9488 9.29303 7.94183C9.16239 7.93603 9.01374 7.93428 8.86335 7.93428C8.71529 7.93428 8.472 7.98828 8.26645 8.20428C8.06148 8.42028 7.48258 8.9417 7.48258 10.0031C7.48258 11.0651 8.28503 12.0905 8.3971 12.2345C8.50916 12.378 9.97645 14.5571 12.223 15.492C12.7572 15.7132 13.1741 15.8462 13.4998 15.946C14.0363 16.1103 14.5246 16.0865 14.9102 16.0314C15.3399 15.9693 16.2352 15.51 16.421 15.0065C16.608 14.5031 16.608 14.0711 16.5523 13.9811C16.4977 13.8911 16.3479 13.8371 16.1237 13.7285Z" fill="#25D366" />
                      </svg>
                      {lead.whatsappBadge > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-[#BC3B3B] text-white text-[9px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center border-2 border-white">
                          {lead.whatsappBadge}
                        </span>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-400">
                    No leads found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination bar (Height fits stats + spacing: 16px horizontal padding) */}
        <div className="px-[16px] py-[16px] flex items-center justify-between border-t border-[#E5E9EC] bg-white text-[13px] text-slate-700 font-medium">
          {/* Results count text */}
          <div>
            Showing <span className="text-[#0D3B59] font-bold">01</span> to <span className="text-[#0D3B59] font-bold">05</span> Out of <span className="text-[#0D3B59] font-bold">1473</span> Results
          </div>

          {/* Pagination numbers */}
          <div className="flex items-center gap-1.5">
            <button className="w-[32px] h-[32px] rounded-[6px] border border-[#E5E9EC] bg-white flex items-center justify-center text-slate-400 hover:text-slate-800 cursor-pointer">
              &lt;
            </button>
            <button className="w-[32px] h-[32px] rounded-[6px] bg-[#0D3B59] text-white flex items-center justify-center cursor-pointer font-bold">
              1
            </button>
            <button className="w-[32px] h-[32px] rounded-[6px] border border-[#E5E9EC] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
              2
            </button>
            <button className="w-[32px] h-[32px] rounded-[6px] border border-[#E5E9EC] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
              3
            </button>
            <span className="px-1 text-slate-400 font-bold">....</span>
            <button className="w-[32px] h-[32px] rounded-[6px] border border-[#E5E9EC] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
              199
            </button>
            <button className="h-[32px] px-3 rounded-[6px] border border-[#E5E9EC] bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer gap-1">
              <span>Next</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
