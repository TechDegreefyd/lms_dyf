"use client";

import { useState } from "react";

const INITIAL_FRESH_LEADS = [
  { id: "L-9043", name: "Rohan Sharma", college: "IIT Delhi", course: "B.Tech CSE", date: "5 mins ago", source: "Website Form" },
  { id: "L-9039", name: "Devansh Dixit", college: "VIT Vellore", course: "B.Tech Biotech", date: "2 hrs ago", source: "CollegeDekho" },
  { id: "L-9035", name: "Aarushi Jain", college: "DU Kirori Mal", course: "B.Sc Physics", date: "4 hrs ago", source: "Google Ads" },
  { id: "L-9031", name: "Rithvik Sen", college: "Manipal IT", course: "B.Tech IT", date: "1 day ago", source: "Facebook Lead Form" },
  { id: "L-9028", name: "Prerna Gupta", college: "NMIMS Mumbai", course: "BBA Marketing", date: "1 day ago", source: "Organic Search" },
];

export default function FreshLeadsPage() {
  const [leads] = useState(INITIAL_FRESH_LEADS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Fresh Unassigned Leads</h3>
          <p className="text-[13px] text-slate-500 mt-1">Direct inquiries from marketing campaigns and portals waiting for follow-up.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search fresh leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[40px] px-4 border border-slate-200 rounded-[8px] bg-white text-[13px] outline-none focus:border-brand-800 transition-colors w-[220px]"
          />
        </div>
      </div>

      <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Lead ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Target College</th>
                <th className="px-6 py-4">Preferred Course</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Received</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600 font-medium">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{lead.id}</td>
                  <td className="px-6 py-4 text-slate-800">{lead.name}</td>
                  <td className="px-6 py-4">{lead.college}</td>
                  <td className="px-6 py-4 text-slate-500">{lead.course}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-[11px] bg-slate-100 text-slate-600 rounded-full font-semibold">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{lead.date}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button className="h-[32px] px-3 bg-brand-800 text-white rounded-[6px] text-[12px] font-bold hover:bg-brand-900 transition-colors cursor-pointer">
                      Claim Lead
                    </button>
                    <button className="h-[32px] px-3 border border-slate-200 text-slate-600 rounded-[6px] text-[12px] font-bold hover:bg-slate-50 transition-colors cursor-pointer">
                      Ignore
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                    No fresh leads found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
