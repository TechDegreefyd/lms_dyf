"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StudentDetailsClient from "@/components/StudentDetailsClient";
import { use } from "react";

// Route: /student-details/[leadId]
// Opened by clicking a Lead ID or student Name in the Dashboard leads table
// (e.g. STD-90EABBCE), which navigates here with that lead's ID as the
// dynamic route param.
export default function StudentDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const leadId = unwrappedParams.leadId;

  return (
    <div className="h-screen flex flex-col bg-[#F7F8FA] font-poppins overflow-hidden">
      <Header />

      <div className="flex flex-1 w-full mx-auto min-h-0 overflow-hidden">
        <Sidebar />

        <main className="flex-1 min-w-0 h-full overflow-hidden">
          <StudentDetailsClient leadId={leadId} />
        </main>
      </div>
    </div>
  );
}
