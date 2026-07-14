"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18.7307 6.07209C18.3297 5.66967 17.8531 5.35037 17.3284 5.13251C16.8038 4.91464 16.2412 4.80249 15.6731 4.80249C15.105 4.80249 14.5424 4.91464 14.0178 5.13251C13.4931 5.35037 13.0165 5.66967 12.6155 6.07209L12 6.6956L11.3845 6.07209C10.9835 5.66967 10.5069 5.35037 9.98225 5.13251C9.45756 4.91464 8.89503 4.80249 8.3269 4.80249C7.75878 4.80249 7.19624 4.91464 6.67155 5.13251C6.14686 5.35037 5.67034 5.66967 5.26932 6.07209C3.57466 7.76676 3.47074 10.6285 5.60505 12.8028L12 19.1977L18.3949 12.8028C20.5293 10.6285 20.4253 7.76676 18.7307 6.07209Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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

// Sidebar Navigation Items list (Replicating exact 7 items in order from Image 13)
const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: DASHBOARD_ICON, hasBorder: true },
  { name: "Fresh Leads", path: "/dashboard/fresh-leads", icon: LEAF_ICON, hasBorder: true },
  { name: "Call Back Leads", path: "/dashboard/callback-leads", icon: CALLBACK_ICON, hasBorder: true },
  { name: "Wishlist", path: "/dashboard/wishlist", icon: HEART_ICON, hasBorder: true },
  { name: "College Brochures", path: "/dashboard/college-brochures", icon: BROCHURE_ICON, hasBorder: true }, 
  { name: "WhatsApp Chat", path: "/dashboard/whatsapp-chat", icon: WHATSAPP_ICON, hasBorder: false },
  { name: "Website Chat", path: "/dashboard/website-chat", icon: CHAT_ICON, hasBorder: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[264px] min-h-[740px] h-screen bg-white flex flex-col justify-between items-start border-r border-[#E5E9EC] py-[16px] px-0 font-poppins shrink-0 relative">
      
      {/* Top Section */}
      <div className="w-full flex flex-col items-start">
        
        {/* Brand logo container - height aligned exactly with top header bottom border */}
        <div className="h-[104px] flex items-center px-6 border-b border-[#CFD8DE] w-full mb-2">
          <div className="relative w-[130px] h-[36px]">
            <Image
              src="/logo.png"
              alt="DegreeFYD Logo"
              fill
              sizes="130px"
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

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
      <div className="w-full flex flex-col items-start px-[16px] pb-[16px] gap-[8px] self-stretch mt-auto">
        {/* Take a break */}
        <button className="group py-[8px] px-[16px] flex items-center gap-[10px] rounded-[8px] w-full transition-all duration-200 border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-left cursor-pointer text-[14px] font-normal font-poppins">
          <span className="text-slate-400 group-hover:text-slate-600">
            {COFFEE_ICON}
          </span>
          <span className="leading-none">Take a Break</span>
        </button>

        {/* Log Out */}
        <button className="group py-[8px] px-[16px] flex items-center gap-[10px] rounded-[8px] w-full transition-all duration-200 border border-transparent text-[#BC3B3B] hover:bg-red-50 text-left cursor-pointer text-[14px] font-normal font-poppins">
          <span className="text-[#BC3B3B]">
            {LOGOUT_ICON}
          </span>
          <span className="leading-none font-medium">Log Out</span>
        </button>
      </div>

      {/* Collapse arrow toggle button */}
      <button className="absolute top-[22px] -right-[12px] w-[24px] h-[24px] rounded-full border border-[#E5E9EC] bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-sm cursor-pointer z-10 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

    </aside>
  );
}
