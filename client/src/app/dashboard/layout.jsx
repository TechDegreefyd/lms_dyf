"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-poppins overflow-hidden">
      
      {/* Top Navbar */}
      <Header />

      {/* Main Container: Sidebar + Main Workspace */}
      <div className="flex flex-1 min-w-0 h-[calc(100vh-76px-48px)]">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        
        {/* Right side content wrapper */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <main className="flex-1 p-[16px] overflow-y-auto transition-all duration-300">
            {children}
          </main>
        </div>
      </div>

      {/* Brand Footer sitting at the very bottom spanning full width */}
      <footer className="h-[48px] bg-[#0D3B59] text-white text-[12px] flex items-center justify-center font-medium self-stretch shrink-0 border-t border-[#092C42]">
        © 2026 Nuvora Education Private Limited. All rights reserved.
      </footer>

    </div>
  );
}
