"use client";

import React from "react";

// WhatsApp icon SVG matching Sidebar and header green design
const WHATSAPP_GREEN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12.0377 3.29028C7.09761 3.29028 3.07723 7.16261 3.07548 11.9216C3.07432 13.4434 3.48774 14.9287 4.27161 16.2369L3 20.7096L7.75142 19.5094C9.07309 20.2008 10.5427 20.5614 12.0343 20.5604H12.0377C16.9779 20.5604 20.9983 16.6875 21 11.9285C21.0012 9.62338 20.0698 7.45351 18.3772 5.82248C16.6852 4.19086 14.4352 3.29086 12.0377 3.29028ZM12.0377 19.1024H12.0348C10.6982 19.1024 9.3871 18.7563 8.24323 18.1025L7.97032 17.9469L5.15187 18.6588L5.90439 16.0111L5.72729 15.7399C4.98343 14.6007 4.58745 13.2782 4.58806 11.9216C4.58981 7.96564 7.932 4.74828 12.0406 4.74828C14.0299 4.74886 15.9002 5.49615 17.3071 6.85196C18.714 8.20777 19.488 10.0107 19.4868 11.928C19.4851 15.8839 16.1435 19.1024 12.0377 19.1024H12.0377ZM16.1237 13.7285C15.8996 13.6211 14.7987 13.0991 14.5932 13.0265C14.3882 12.9551 14.239 12.918 14.0897 13.134C13.9411 13.35 13.5114 13.836 13.3814 13.9794C13.2501 14.1234 13.1195 14.1408 12.8954 14.0334C12.6712 13.9254 11.9495 13.6978 11.0948 12.9627C10.4288 12.3913 9.97935 11.6853 9.84871 11.4687C9.71806 11.2533 9.83477 11.1365 9.94684 11.0291C10.0473 10.9333 10.171 10.7777 10.2825 10.6517C10.3939 10.5257 10.4311 10.4357 10.5066 10.2917C10.5809 10.1483 10.5437 10.0217 10.4874 9.91428C10.4311 9.8057 9.984 8.74428 9.79645 8.31286C9.61529 7.89248 9.43064 7.9488 9.29303 7.94183C9.16239 7.93603 9.01374 7.93428 8.86335 7.93428C8.71529 7.93428 8.472 7.98828 8.26645 8.20428C8.06148 8.42028 7.48258 8.9417 7.48258 10.0031C7.48258 11.0651 8.28503 12.0905 8.3971 12.2345C8.50916 12.378 9.97645 14.5571 12.223 15.492C12.7572 15.7132 13.1741 15.8462 13.4998 15.946C14.0363 16.1103 14.5246 16.0865 14.9102 16.0314C15.3399 15.9693 16.2352 15.51 16.421 15.0065C16.608 14.5031 16.608 14.0711 16.5523 13.9811C16.4977 13.8911 16.3479 13.8371 16.1237 13.7285Z" fill="currentColor" />
  </svg>
);

const MESSAGES_DATA = [
  {
    name: "Jiya Tyagi",
    time: "Just Now",
    badge: "4+ Messages",
    preview: "hii i have filled the form in your websit..."
  },
  {
    name: "Anirudh Sharma",
    time: "3h ago",
    badge: "4+ Messages",
    preview: "Hii"
  },
  {
    name: "Jessica Lee",
    time: "3 days ago",
    badge: "3 Messages",
    preview: "Hello"
  },
  {
    name: "Michael Johnson",
    time: "2 days ago",
    badge: "2 Messages",
    preview: "hii i have filled the form in your websit..."
  }
];

export default function WhatsappDropdown({ onClose }) {
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
        <span className="font-semibold text-[#121212] text-[14px]">
          Whatsapp Messages (38)
        </span>
        <button className="bg-[#E0F2FE] text-[#0D3B59] px-[8px] py-[4px] rounded-[4px] text-[12px] font-semibold hover:bg-[#BAE6FD] transition-colors cursor-pointer leading-none">
          Read All
        </button>
      </div>

      {/* Message List */}
      <div className="flex flex-col gap-[12px] w-full">
        {MESSAGES_DATA.map((msg, index) => (
          <div 
            key={index}
            className="flex flex-col gap-[12px] p-[12px] bg-white border border-[#E5E9EC] rounded-[8px] w-full"
          >
            {/* Top row: WhatsApp Badge, Name/Time, and Message count pill */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-[10px]">
                {/* WhatsApp circular icon badge */}
                <div className="w-[32px] h-[32px] bg-[#E6F7ED] rounded-full flex items-center justify-center text-[#25D366] shrink-0">
                  {WHATSAPP_GREEN_ICON}
                </div>
                {/* Sender Name and Time Stack */}
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-[#121212] text-[14px] leading-tight">
                    {msg.name}
                  </span>
                  <span className="text-[11px] text-[#808080] font-normal leading-normal mt-[1px]">
                    {msg.time}
                  </span>
                </div>
              </div>

              {/* Message count badge */}
              <div className="flex bg-[#FEEBEB] text-[#BC3B3B] text-[11px] font-semibold py-[2px] px-[8px] justify-center items-center gap-[10px] rounded-full shrink-0">
                {msg.badge}
              </div>
            </div>

            {/* Bottom row: Message preview box */}
            <div className="self-start bg-[#E6F7ED] text-[#121212] px-[12px] py-[8px] rounded-[6px] text-[13px] font-normal max-w-full truncate whitespace-nowrap text-ellipsis">
              {msg.preview}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
