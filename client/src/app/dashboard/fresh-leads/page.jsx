"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data exactly matching the 10 rows visible in the Figma table (Image 7)
const MOCK_LEADS = [
  { createdOn: "Dec 1, 2025, 02:12 PM", remark: "67", leadId: "STD-90EABBCE", name: "RAJENDRA SHARMA", phone: "931XXXXXXX", mail: "kin***@xxxxxx.com", lastCall: "Dec 03, 2025", whatsappBadge: 2 },
  { createdOn: "Feb 14, 2026, 11:59 AM", remark: "68", leadId: "STD-91EABBCE", name: "Anjali Sharma", phone: "932XXXXXXX", mail: "Mun***@xxxxxx.com", lastCall: "Jul 04, 2026", whatsappBadge: 0 },
  { createdOn: "Mar 27, 2026, 04:32 AM", remark: "69", leadId: "STD-92EABBCE", name: "Nina Patel", phone: "833XXXXXXX", mail: "Sun***@xxxxxx.com", lastCall: "Sep 12, 2026", whatsappBadge: 0 },
  { createdOn: "Apr 09, 2026, 08:01 PM", remark: "70", leadId: "STD-93EABBCE", name: "Jaxon Lee", phone: "730XXXXXXX", mail: "Fun***@xxxxxx.com", lastCall: "Apr 14, 2026", whatsappBadge: 5 },
  { createdOn: "May 12, 2026, 01:23 PM", remark: "71", leadId: "STD-94EABBCE", name: "Sofia Kim", phone: "930XXXXXXX", mail: "ani***@xxxxxx.com", lastCall: "Jun 11, 2026", whatsappBadge: 6 },
  { createdOn: "Jun 03, 2026, 09:45 AM", remark: "72", leadId: "STD-95EABBCE", name: "Liam Torres", phone: "630XXXXXXX", mail: "Pra***@xxxxxx.com", lastCall: "Feb 22, 2026", whatsappBadge: 7 },
  { createdOn: "Jul 18, 2026, 06:18 PM", remark: "73", leadId: "STD-96EABBCE", name: "Zara Khan", phone: "940XXXXXXX", mail: "kun***@xxxxxx.com", lastCall: "Dec 19, 2026", whatsappBadge: 8 },
  { createdOn: "Aug 22, 2026, 03:57 AM", remark: "74", leadId: "STD-97EABBCE", name: "Ethan Brooks", phone: "950XXXXXXX", mail: "kin***@xxxxxx.com", lastCall: "Jul 20, 2026", whatsappBadge: 9 },
  { createdOn: "Sep 05, 2026, 12:34 PM", remark: "75", leadId: "STD-98EABBCE", name: "Maya Chen", phone: "830XXXXXXX", mail: "enn***@xxxxxx.com", lastCall: "Sep 24, 2026", whatsappBadge: 10 },
  { createdOn: "Oct 30, 2026, 10:29 PM", remark: "76", leadId: "STD-99EABBCE", name: "Ravi Singh", phone: "730XXXXXXX", mail: "hjn***@xxxxxx.com", lastCall: "Apr 30, 2026", whatsappBadge: 11 },
];

export default function FreshLeadsPage() {
  const [leads] = useState(MOCK_LEADS);

  // Chevron sort indicator SVG helper
  const renderSortIndicator = () => (
    <svg className="inline ml-1 text-slate-400" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-6 font-poppins max-w-[1440px] mx-auto">
      
      {/* Title Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-800">Fresh Unassigned Leads</h3>
        <p className="text-[13px] text-slate-500 mt-1">Direct inquiries from marketing campaigns and portals waiting for follow-up.</p>
      </div>

      {/* Main Table Card Wrapper */}
      <div className="bg-white rounded-[12px] border border-[#CFD8DE] shadow-sm overflow-hidden flex flex-col">
        
        {/* Filter bar (Height fits filters + padding: 16px horizontal align) */}
        <div className="px-[16px] py-[14px] flex items-center justify-between border-b border-[#E5E9EC]">
          {/* Checkboxes Row */}
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
              {leads.map((lead, idx) => (
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
            </tbody>
          </table>
        </div>

        {/* Footer Pagination bar (Height fits stats + spacing: 16px horizontal padding) */}
        <div className="px-[16px] py-[16px] flex items-center justify-between border-t border-[#E5E9EC] bg-white text-[13px] text-slate-700 font-medium">
          {/* Results count text */}
          <div>
            Showing <span className="text-[#0D3B59] font-bold">01</span> to <span className="text-[#0D3B59] font-bold">10</span> Out of <span className="text-[#0D3B59] font-bold">1473</span> Results
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
