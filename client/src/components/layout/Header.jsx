"use client";

// Custom WhatsApp SVG path from specs
const WHATSAPP_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.0377 3.29028C7.09761 3.29028 3.07723 7.16261 3.07548 11.9216C3.07432 13.4434 3.48774 14.9287 4.27161 16.2369L3 20.7096L7.75142 19.5094C9.07309 20.2008 10.5427 20.5614 12.0343 20.5604H12.0377C16.9779 20.5604 20.9983 16.6875 21 11.9285C21.0012 9.62338 20.0698 7.45351 18.3772 5.82248C16.6852 4.19086 14.4352 3.29086 12.0377 3.29028ZM12.0377 19.1024H12.0348C10.6982 19.1024 9.3871 18.7563 8.24323 18.1025L7.97032 17.9469L5.15187 18.6588L5.90439 16.0111L5.72729 15.7399C4.98343 14.6054 4.58745 13.2782 4.58806 11.9216C4.58981 7.96564 7.932 4.74828 12.0406 4.74828C14.0299 4.74886 15.9002 5.49615 17.3071 6.85196C18.714 8.20777 19.488 10.0107 19.4868 11.928C19.4851 15.8839 16.1435 19.1024 12.0372 19.1024H12.0377ZM16.1237 13.7285C15.8996 13.6211 14.7987 13.0991 14.5932 13.0265C14.3882 12.9551 14.239 12.918 14.0897 13.134C13.9411 13.35 13.5114 13.836 13.3814 13.9794C13.2501 14.1234 13.1195 14.1408 12.8954 14.0334C12.6712 13.9254 11.9495 13.6978 11.0948 12.9627C10.4288 12.3913 9.97935 11.6853 9.84871 11.4687C9.71806 11.2533 9.83477 11.1365 9.94684 11.0291C10.0473 10.9333 10.171 10.7777 10.2825 10.6517C10.3939 10.5257 10.4311 10.4357 10.5066 10.2917C10.5809 10.1483 10.5437 10.0217 10.4874 9.91428C10.4311 9.8057 9.984 8.74428 9.79645 8.31286C9.61529 7.89248 9.43064 7.9488 9.29303 7.94183C9.16239 7.93603 9.01374 7.93428 8.86335 7.93428C8.71529 7.93428 8.472 7.98828 8.26645 8.20428C8.06148 8.42028 7.48258 8.9417 7.48258 10.0031C7.48258 11.0651 8.28503 12.0905 8.3971 12.2345C8.50916 12.378 9.97645 14.5571 12.223 15.492C12.7572 15.7132 13.1741 15.8462 13.4998 15.946C14.0363 16.1103 14.5246 16.0865 14.9102 16.0314C15.3399 15.9693 16.2352 15.51 16.421 15.0065C16.608 14.5031 16.608 14.0711 16.5523 13.9811C16.4977 13.8911 16.3479 13.8371 16.1237 13.7285Z" fill="#121212"/>
  </svg>
);

// Custom Bell SVG path from specs (React camelCase properties fixed)
const BELL_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13.384 19.2015C13.2434 19.4439 13.0415 19.6452 12.7986 19.7851C12.5557 19.925 12.2803 19.9986 12 19.9986C11.7197 19.9986 11.4443 19.925 11.2014 19.7851C10.9585 19.6452 10.7567 19.4439 10.616 19.2015M4 8.80146C4 7.04146 4.56 5.36146 5.6 4.00146M20 8.80146C20 7.0705 19.4386 5.38623 18.4 4.00146M16.8 8.80146C16.8 7.52843 16.2943 6.30753 15.3941 5.40735C14.4939 4.50718 13.273 4.00146 12 4.00146C10.727 4.00146 9.50606 4.50718 8.60589 5.40735C7.70571 6.30753 7.2 7.52843 7.2 8.80146C7.2 14.4015 4.8 16.0015 4.8 16.0015H19.2C19.2 16.0015 16.8 14.4015 16.8 8.80146Z" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Standard Phone Incoming SVG
const PHONE_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Custom Plus Icon SVG from specifications
const PLUS_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.0002 3.33325V16.6666M3.3335 9.99992H16.6668" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Header() {
  return (
    <header className="w-full max-w-[1440px] h-[76px] bg-white border-b border-[#CFD8DE] flex justify-end items-center py-[12px] px-[32px] gap-[28px] font-poppins shrink-0 mx-auto">
      
      {/* WhatsApp Circular Button with Badge 2 */}
      <button className="relative w-[40px] h-[40px] rounded-full bg-[#F2F4F7] flex items-center justify-center hover:bg-[#E4E7EC] transition-colors cursor-pointer shrink-0">
        {WHATSAPP_ICON}
        <span className="absolute -top-1 -right-1 bg-[#BC3B3B] text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">2</span>
      </button>

      {/* Call Icon Circular Button with Badge 7 */}
      <button className="relative w-[40px] h-[40px] rounded-full bg-[#F2F4F7] flex items-center justify-center hover:bg-[#E4E7EC] transition-colors cursor-pointer shrink-0">
        {PHONE_ICON}
        <span className="absolute -top-1 -right-1 bg-[#BC3B3B] text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">7</span>
      </button>

      {/* Bell Notification Button with Badge 9+ */}
      <button className="relative w-[40px] h-[40px] rounded-full bg-[#F2F4F7] flex items-center justify-center hover:bg-[#E4E7EC] transition-colors cursor-pointer shrink-0">
        {BELL_ICON}
        <span className="absolute -top-1 -right-1 bg-[#BC3B3B] text-white text-[8px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">9+</span>
      </button>

      {/* New Lead Action Button with custom SVG plus icon */}
      <button className="h-[40px] px-[16px] bg-[#0D3B59] hover:bg-[#092c42] text-white rounded-[8px] text-[14px] font-medium transition-colors shadow-premium cursor-pointer flex items-center justify-center gap-[6px] shrink-0 font-poppins">
        {PLUS_ICON}
        <span>New Lead</span>
      </button>

      {/* User Profile Info - Font set explicitly to Poppins */}
      <div className="flex items-center gap-3 shrink-0 font-poppins">
        <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 border border-[#E5E9EC] overflow-hidden">
          V
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[14px] font-semibold text-[#121212] leading-tight font-poppins">Vikash</span>
          <span className="text-[11px] text-[#808080] font-normal font-poppins">L2 Counsellor</span>
        </div>
      </div>

    </header>
  );
}
