"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BreakModal from "./BreakModal";

// SVG Icons matching Figma design (proper React camelCase properties)
const DASHBOARD_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const LEAF_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M4 20C4 17.4737 5.55789 15.4863 8.27789 14.9474C10.3158 14.5432 12.4211 13.2632 13.2632 12.4211M11.5789 19.1579C10.1002 19.1624 8.67388 18.6109 7.58273 17.613C6.49159 16.615 5.81536 15.2434 5.68818 13.7702C5.561 12.297 5.99214 10.8298 6.89611 9.65957C7.80007 8.48937 9.11083 7.70164 10.5684 7.45263C15.3684 6.52632 16.6316 6.08842 18.3158 4C19.1579 5.68421 20 7.52 20 10.7368C20 15.3684 15.9747 19.1579 11.5789 19.1579Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CALLBACK_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M19.9834 8.81729H15.1661V4M15.1661 8.81729L19.9834 4M19.9834 15.9791V18.3877C19.9843 18.6113 19.9385 18.8327 19.849 19.0375C19.7594 19.2424 19.628 19.4263 19.4632 19.5775C19.2985 19.7286 19.1039 19.8437 18.8921 19.9154C18.6803 19.987 18.4558 20.0136 18.2331 19.9935C15.7625 19.725 13.3894 18.8808 11.3043 17.5286C9.36438 16.2959 7.71968 14.6512 6.48699 12.7113C5.1301 10.6168 4.28568 8.23206 4.02214 5.75036C4.00208 5.52834 4.02846 5.30457 4.09962 5.0933C4.17078 4.88203 4.28514 4.6879 4.43544 4.52325C4.58573 4.35861 4.76867 4.22706 4.97259 4.13699C5.17651 4.04691 5.39695 4.00029 5.61988 4.00008H8.02852C8.41817 3.99624 8.79591 4.13422 9.09135 4.3883C9.38678 4.64237 9.57975 4.99521 9.63429 5.38103C9.73595 6.15185 9.92449 6.9087 10.1963 7.63713C10.3043 7.9245 10.3277 8.23682 10.2637 8.53707C10.1996 8.83732 10.0509 9.11292 9.83501 9.33121L8.81535 10.3509C9.95829 12.3609 11.6226 14.0252 13.6326 15.1682L14.6523 14.1485C14.8706 13.9326 15.1462 13.7839 15.4464 13.7198C15.7467 13.6558 16.059 13.6792 16.3464 13.7872C17.0748 14.059 17.8317 14.2476 18.6025 14.3492C18.9925 14.4042 19.3487 14.6007 19.6033 14.9012C19.8579 15.2017 19.9932 15.5853 19.9834 15.9791Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HEART_ICON = (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
    <path d="M15.4807 2.0196C15.0797 1.61718 14.6031 1.29788 14.0784 1.08002C13.5538 0.862149 12.9912 0.75 12.4231 0.75C11.855 0.75 11.2924 0.862149 10.7678 1.08002C10.2431 1.29788 9.76654 1.61718 9.36551 2.0196L8.75 2.64311L8.13449 2.0196C7.73346 1.61718 7.25694 1.29788 6.73225 1.08002C6.20756 0.862149 5.64503 0.75 5.0769 0.75C4.50878 0.75 3.94624 0.862149 3.42155 1.08002C2.89686 1.29788 2.42034 1.61718 2.01932 2.0196C0.324655 3.71427 0.220737 6.57601 2.35505 8.75029L8.75 15.1452L15.1449 8.75029C17.2793 6.57601 17.1753 3.71427 15.4807 2.0196Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BROCHURE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <polyline points="9 15 12 18 15 15" />
  </svg>
);

const WHATSAPP_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12.0377 3.29028C7.09761 3.29028 3.07723 7.16261 3.07548 11.9216C3.07432 13.4434 3.48774 14.9287 4.27161 16.2369L3 20.7096L7.75142 19.5094C9.07309 20.2008 10.5427 20.5614 12.0343 20.5604H12.0377C16.9779 20.5604 20.9983 16.6875 21 11.9285C21.0012 9.62338 20.0698 7.45351 18.3772 5.82248C16.6852 4.19086 14.4352 3.29086 12.0377 3.29028ZM12.0377 19.1024H12.0348C10.6982 19.1024 9.3871 18.7563 8.24323 18.1025L7.97032 17.9469L5.15187 18.6588L5.90439 16.0111L5.72729 15.7399C4.98343 14.6007 4.58745 13.2782 4.58806 11.9216C4.58981 7.96564 7.932 4.74828 12.0406 4.74828C14.0299 4.74886 15.9002 5.49615 17.3071 6.85196C18.714 8.20777 19.488 10.0107 19.4868 11.928C19.4851 15.8839 16.1435 19.1024 12.0377 19.1024H12.0377ZM16.1237 13.7285C15.8996 13.6211 14.7987 13.0991 14.5932 13.0265C14.3882 12.9551 14.239 12.918 14.0897 13.134C13.9411 13.35 13.5114 13.836 13.3814 13.9794C13.2501 14.1234 13.1195 14.1408 12.8954 14.0334C12.6712 13.9254 11.9495 13.6978 11.0948 12.9627C10.4288 12.3913 9.97935 11.6853 9.84871 11.4687C9.71806 11.2533 9.83477 11.1365 9.94684 11.0291C10.0473 10.9333 10.171 10.7777 10.2825 10.6517C10.3939 10.5257 10.4311 10.4357 10.5066 10.2917C10.5809 10.1483 10.5437 10.0217 10.4874 9.91428C10.4311 9.8057 9.984 8.74428 9.79645 8.31286C9.61529 7.89248 9.43064 7.9488 9.29303 7.94183C9.16239 7.93603 9.01374 7.93428 8.86335 7.93428C8.71529 7.93428 8.472 7.98828 8.26645 8.20428C8.06148 8.42028 7.48258 8.9417 7.48258 10.0031C7.48258 11.0651 8.28503 12.0905 8.3971 12.2345C8.50916 12.378 9.97645 14.5571 12.223 15.492C12.7572 15.7132 13.1741 15.8462 13.4998 15.946C14.0363 16.1103 14.5246 16.0865 14.9102 16.0314C15.3399 15.9693 16.2352 15.51 16.421 15.0065C16.608 14.5031 16.608 14.0711 16.5523 13.9811C16.4977 13.8911 16.3479 13.8371 16.1237 13.7285Z" fill="currentColor" />
  </svg>
);

const CHAT_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 14.6667C20 15.1382 19.8127 15.5903 19.4793 15.9237C19.1459 16.2571 18.6937 16.4444 18.2222 16.4444H7.55556L4 20V5.77778C4 5.30628 4.1873 4.8541 4.5207 4.5207C4.8541 4.1873 5.30628 4 5.77778 4H18.2222C18.6937 4 19.1459 4.1873 19.4793 4.5207C19.8127 4.8541 20 5.30628 20 5.77778V14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const COFFEE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const LOGOUT_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Sidebar Navigation Items list
const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: DASHBOARD_ICON, hasBorder: true },
  { name: "Fresh Leads", path: "/dashboard/fresh-leads", icon: LEAF_ICON, hasBorder: true },
  { name: "Call Back Leads", path: "/dashboard/callback-leads", icon: CALLBACK_ICON, hasBorder: true },
  { name: "Wishlist", path: "/dashboard/wishlist", icon: HEART_ICON, hasBorder: true },
  { name: "College Brochures", path: "/dashboard/college-brochures", icon: BROCHURE_ICON, hasBorder: true }, 
  { name: "WhatsApp Chat", path: "/dashboard/whatsapp-chat", icon: WHATSAPP_ICON, hasBorder: false },
  { name: "Website Chat", path: "/dashboard/website-chat", icon: CHAT_ICON, hasBorder: false },
];

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const [showBreakModal, setShowBreakModal] = useState(false);

  return (
    <aside className={`h-full bg-white flex flex-col justify-between items-start border-r border-[#CFD8DE] py-[16px] px-0 font-poppins shrink-0 relative transition-all duration-300 ${
      collapsed ? "w-0 border-r-0" : "w-[264px]"
    }`}>
      
      {/* Sidebar Content wrapper (prevents text distortion / overflow during collapse animation) */}
      <div className={`w-[264px] flex flex-col justify-between h-full transition-opacity duration-200 ${
        collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
        {/* Top Section */}
        <div className="w-full flex flex-col items-start">
          {/* Continuous Single List Navigation - 10px Gap, Padding 12px top/bottom, 16px left/right */}
          <nav className="flex px-[16px] pt-[12px] pb-[12px] flex-col items-start gap-[10px] self-stretch">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={`${item.name}-${idx}`}
                  href={item.path}
                  className={`group py-[8px] px-[16px] flex items-center gap-[10px] rounded-[8px] w-full transition-all duration-200 border text-[14px] font-normal font-poppins ${
                    item.hasBorder
                      ? isActive
                        ? "bg-white border-[#E5E9EC] text-[#0D3B59] shadow-[0_1px_3px_rgba(13,59,89,0.06)]"
                        : "bg-white border-transparent text-[#121212] hover:bg-slate-50 hover:border-[#E5E9EC] hover:text-slate-800"
                      : isActive
                        ? "bg-slate-50 border-transparent text-[#0D3B59]"
                        : "bg-transparent border-transparent text-[#121212] hover:bg-slate-50/60 hover:text-slate-800"
                  }`}
                >
                  <span className={`transition-colors duration-200 ${
                    isActive 
                      ? "text-[#0D3B59]" 
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}>
                    {item.icon}
                  </span>
                  <span className="leading-none">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section - Contains Take a Break + Log Out */}
        <div className="w-full flex flex-col items-start px-[16px] pb-0 gap-[20px] self-stretch">       
     {/* Take a break */}
          <button 
            onClick={() => setShowBreakModal(true)}
            className="group py-[8px] px-[16px] flex items-center gap-[10px] rounded-[8px] w-full transition-all duration-200 border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left cursor-pointer text-[14px] font-normal font-poppins"
          >
            <span className="text-slate-400 group-hover:text-slate-600">
              {COFFEE_ICON}
            </span>
            <span className="leading-none">Take a Break</span>
          </button>

          {/* Log Out */}
          <button className="group py-[8px] px-[16px] flex items-center gap-[10px] rounded-[8px] w-full transition-all duration-200 border border-transparent text-[#BC3B3B] hover:bg-red-55 text-left cursor-pointer text-[14px] font-normal font-poppins">
            <span className="text-[#BC3B3B]">
              {LOGOUT_ICON}
            </span>
            <span className="leading-none font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Collapse arrow toggle button - Vertically centered on top border line (Navbar bottom) */}
      <button 
        onClick={onToggle}
        className={`absolute top-[24px] w-[24px] h-[24px] rounded-full border border-[#E5E9EC] bg-white flex items-center justify-center hover:bg-slate-50 shadow-sm cursor-pointer z-50 transition-all duration-300 ${
          collapsed ? "left-[12px]" : "-right-[12px]"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {collapsed ? (
            <path d="M5.3332 13.3334L10.6665 8.00008L5.3332 2.66675" stroke="#0D3B59" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M10.6668 13.3334L5.3335 8.00008L10.6668 2.66675" stroke="#0D3B59" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
      </button>

      {/* Break Type Modal Dialog */}
      <BreakModal show={showBreakModal} onClose={() => setShowBreakModal(false)} />

    </aside>
  );
}
