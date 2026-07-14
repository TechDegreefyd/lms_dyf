"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-poppins">
      
      {/* Top Navbar */}
      <Header />

      {/* Main Container: Sidebar + Main Workspace */}
      <div className="flex flex-1 min-w-0">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <main className="flex-1 p-[16px] overflow-y-auto transition-all duration-300">
          {children}
        </main>
      </div>

      {/* Full-width Brand Footer */}
      <footer className="h-[48px] bg-[#0D3B59] text-white text-[12px] flex items-center justify-center font-medium self-stretch shrink-0 border-t border-[#092C42]">
        © 2026 Nuvora Education Private Limited. All rights reserved.
      </footer>

    </div>
  );
}
