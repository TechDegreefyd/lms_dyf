"use client";

import { useState } from "react";

const INITIAL_WISHLISTS = [
  { id: "W-301", student: "Aarav Rawat", college: "IIT Bombay", course: "B.Tech CSE", matchProbability: "92%", status: "Application Sent" },
  { id: "W-302", student: "Kriti Malhotra", college: "Narsee Monjee", course: "BBA Finance", matchProbability: "85%", status: "Under Review" },
  { id: "W-303", student: "Divya Teja", college: "RV College of Eng", course: "B.Tech Mech", matchProbability: "78%", status: "Documents Pending" },
  { id: "W-304", student: "Nikhil Joshi", college: "Manipal University", course: "B.Tech IT", matchProbability: "64%", status: "Interested Only" },
];

export default function WishlistPage() {
  const [wishlists] = useState(INITIAL_WISHLISTS);

  const getStatusColor = (status) => {
    switch (status) {
      case "Application Sent":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Under Review":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Documents Pending":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 font-poppins">
      <div>
        <h3 className="text-xl font-bold text-slate-800">Student College Wishlists</h3>
        <p className="text-[13px] text-slate-500 mt-1">Colleges and programs flagged by prospective students along with their matching probability and admission status.</p>
      </div>

      <div className="bg-white rounded-[12px] border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Wishlist ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">College Choice</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Match Index</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600 font-medium">
              {wishlists.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-slate-800">{item.student}</td>
                  <td className="px-6 py-4">{item.college}</td>
                  <td className="px-6 py-4 text-slate-500">{item.course}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-[60px] bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-800 h-full rounded-full" style={{ width: item.matchProbability }} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700">{item.matchProbability}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold border rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="h-[32px] px-3 bg-brand-800 text-white rounded-[6px] text-[12px] font-bold hover:bg-brand-900 transition-colors cursor-pointer">
                      Send Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
