"use client";

import React from "react";

// Orange Call icon SVG provided in the spec
const CALL_ORANGE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M19.9836 8.81729H15.1663V4M15.1663 8.81729L19.9836 4M19.9837 15.9791V18.3877C19.9846 18.6113 19.9388 18.8327 19.8492 19.0375C19.7596 19.2424 19.6282 19.4263 19.4635 19.5775C19.2987 19.7286 19.1042 19.8437 18.8924 19.9154C18.6805 19.987 18.4561 20.0136 18.2334 19.9935C15.7628 19.725 13.3896 18.8808 11.3045 17.5286C9.36462 16.2959 7.71993 14.6512 6.48723 12.7113C5.13035 10.6168 4.28593 8.23206 4.02239 5.75036C4.00232 5.52834 4.02871 5.30457 4.09986 5.0933C4.17102 4.88203 4.28539 4.6879 4.43568 4.52325C4.58598 4.35861 4.76891 4.22706 4.97283 4.13699C5.17675 4.04691 5.39719 4.00029 5.62012 4.00008H8.02877C8.41841 3.99624 8.79615 4.13422 9.09159 4.3883C9.38703 4.64237 9.58 4.99521 9.63453 5.38103C9.73619 6.15185 9.92473 6.9087 10.1965 7.63713C10.3046 7.9245 10.3279 8.23682 10.2639 8.53707C10.1999 8.83732 10.0511 9.11292 9.83525 9.33121L8.81559 10.3509C9.95854 12.3609 11.6228 14.0252 13.6329 15.1682L14.6525 14.1485C14.8708 13.9326 15.1464 13.7839 15.4467 13.7198C15.7469 13.6558 16.0593 13.6792 16.3466 13.7872C17.0751 14.059 17.8319 14.2476 18.6027 14.3492C18.9927 14.4042 19.3489 14.6007 19.6035 14.9012C19.8582 15.2017 19.9934 15.5853 19.9837 15.9791Z" stroke="#ED923D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const REMINDERS_DATA = [
  {
    name: "Jiya Tyagi",
    time: "Just Now",
    badge: "Call Back",
    preview: "12:00 am Today"
  },
  {
    name: "Kartikay Sharma",
    time: "3h ago",
    badge: "Call Back",
    preview: "12:00 am Tomorrow"
  },
  {
    name: "Jessica Lee",
    time: "3 days ago",
    badge: "Call Back",
    preview: "12:00 am on 13 Apr,2026"
  },
  {
    name: "Michael Johnson",
    time: "2 days ago",
    badge: "Call Back",
    preview: "12:00 am 15 Apr, 2026"
  },
  {
    name: "Michael Johnson",
    time: "2 days ago",
    badge: "Call Back",
    preview: "12:00 am 15 Apr, 2026"
  }
];

export default function CallbackDropdown({ onClose }) {
  return (
    <div className="absolute right-0 top-[48px] z-50 flex w-[348px] p-[12px] flex-col items-start rounded-[8px] bg-white border border-[#E5E9EC] shadow-[0_4px_24px_rgba(0,0,0,0.08)] font-poppins text-left">
      
      {/* Close (X) button - Overlapping the top-right corner of the panel */}
      <button 
        onClick={onClose}
        className="absolute -top-[8px] -right-[8px] w-[24px] h-[24px] rounded-full border border-[#E5E9EC] bg-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 transition-colors z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 2.66675L2.66675 13.3334M2.66675 2.66675L13.3334 13.3334" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Header Row */}
      <div className="flex items-center justify-between w-full mb-[15px]">
        <span className="font-medium text-[#121212] text-[16px] leading-normal font-poppins">
          Callback Reminders (38)
        </span>
        <button className="bg-[#E0F2FE] text-[#0D3B59] px-[8px] py-[4px] rounded-[4px] text-[12px] font-semibold hover:bg-[#BAE6FD] transition-colors cursor-pointer leading-none">
          Read All
        </button>
      </div>

      {/* Reminders List (Constrained scrollable container to prevent extending off-screen) */}
      <div className="flex flex-col gap-[12px] w-full max-h-[480px] overflow-y-auto pr-[2px] no-scrollbar">
        {REMINDERS_DATA.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col gap-[12px] p-[12px] bg-white border border-[#E5E9EC] rounded-[8px] w-full"
          >
            {/* Top row: Orange Call Icon Circle, Name/Time Stack, and badge */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-[10px]">
                {/* Call orange badge circular wrapper */}
                <div className="w-[32px] h-[32px] bg-[#FFF4EB] rounded-full flex items-center justify-center text-[#ED923D] shrink-0">
                  {CALL_ORANGE_ICON}
                </div>
                {/* Sender name and time stack */}
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-[#121212] text-[14px] leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#808080] font-normal leading-normal mt-[1px]">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Status Badge with flex spacing 2px 8px and gap 10px */}
              <div className="flex bg-[#FFF9E6] text-[#ED923D] text-[11px] font-semibold py-[2px] px-[8px] justify-center items-center gap-[10px] rounded-full shrink-0">
                {item.badge}
              </div>
            </div>

            {/* Bottom row: Time/date preview with custom red border box */}
            <div className="self-start border border-[#BC3B3B] bg-[#FFF8F8] text-[#BC3B3B] px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium max-w-full truncate whitespace-nowrap text-ellipsis">
              {item.preview}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
