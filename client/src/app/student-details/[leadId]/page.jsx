"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
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
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] font-poppins">
      <Header />

      <div className="flex flex-1 w-full max-w-[1440px] mx-auto px-[24px] pt-[24px] gap-[24px]">
        <Sidebar />

        <main className="flex-1 min-w-0">
          <StudentDetailsClient leadId={leadId} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
