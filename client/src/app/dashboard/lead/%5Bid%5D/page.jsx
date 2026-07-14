"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";

const LEAD_DATA = {
  id: "L-9043",
  name: "Rohan Sharma",
  email: "rohan.sharma@gmail.com",
  phone: "+91 98765 43210",
  college: "IIT Delhi",
  course: "B.Tech CSE",
  status: "Fresh",
  source: "Website Form",
  assignedTo: "Aditya Kumar",
  timeline: [
    { event: "Lead Created", details: "Form submitted via main landing page", date: "July 14, 2026, 12:15 PM" },
    { event: "Assigned to Counselor", details: "Auto-assigned to counselor Aditya Kumar", date: "July 14, 2026, 12:16 PM" },
  ]
};

export default function LeadDetailsPage({ params }) {
  // Use React.use() to unwrap params since in Next.js 16 it is a Promise.
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [lead] = useState({ ...LEAD_DATA, id: id || LEAD_DATA.id });
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([
    { author: "System", text: "Auto-allocation completed successfully.", date: "July 14, 2026, 12:16 PM" }
  ]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotes([
      ...notes,
      { author: "Aditya Kumar", text: noteText, date: new Date().toLocaleString() }
    ]);
    setNoteText("");
  };

  return (
    <div className="flex flex-col gap-6 font-poppins">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-slate-400 hover:text-brand-800 text-[13px] font-bold">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">{lead.status}</span>
            <span className="text-[12px] font-bold text-slate-400">ID: {lead.id}</span>
          </div>

          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-lg font-bold text-slate-800">{lead.name}</h3>
            <p className="text-[12px] text-slate-400 mt-1">{lead.course} Candidate</p>
          </div>

          <div className="flex flex-col gap-3.5 text-[13px] text-slate-600">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Email address</p>
              <p className="font-semibold text-slate-800 mt-0.5">{lead.email}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Mobile Number</p>
              <p className="font-semibold text-slate-800 mt-0.5">{lead.phone}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Target Institution</p>
              <p className="font-semibold text-slate-800 mt-0.5">{lead.college}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Lead Source</p>
              <p className="font-semibold text-slate-800 mt-0.5">{lead.source}</p>
            </div>
          </div>
        </div>

        {/* Notes and timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Counselor Notes */}
          <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col gap-4">
            <h4 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-3">Counselor Log Notes</h4>
            
            <div className="flex flex-col gap-3.5 max-h-[220px] overflow-y-auto pr-1">
              {notes.map((note, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-[8px]">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 mb-1">
                    <span>{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                  <p className="text-[12px] text-slate-700 leading-relaxed font-medium">{note.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-3 mt-2 border-t border-slate-100 pt-4">
              <input
                type="text"
                placeholder="Log a new comment/counselor note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 h-[38px] border border-slate-200 rounded-[8px] bg-slate-50 px-3 text-[12px] outline-none focus:border-brand-800"
              />
              <button type="submit" className="h-[38px] px-4 bg-brand-800 hover:bg-brand-900 text-white rounded-[8px] text-[12px] font-semibold transition-colors cursor-pointer">
                Log Note
              </button>
            </form>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium p-6 flex flex-col gap-4">
            <h4 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-3">Lead History Timeline</h4>
            <div className="relative pl-6 border-l border-slate-100 flex flex-col gap-6 ml-2 py-2">
              {lead.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-brand-800 ring-4 ring-white" />
                  <p className="text-[13px] font-bold text-slate-800">{item.event}</p>
                  <p className="text-[12px] text-slate-500 mt-0.5">{item.details}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
