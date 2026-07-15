"use client";

import React from "react";

// User profile outline icon SVG
const USER_PROFILE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const NOTIFICATIONS_DATA = [
  {
    name: "Jiya Tyagi",
    time: "Just Now",
    badge: "New Lead",
    badgeType: "green",
    source: "CP_Ref"
  },
  {
    name: "Anirudh Sharma",
    time: "3h ago",
    badge: "Reactive Lead",
    badgeType: "orange",
    source: "FaceBook_University_Admit"
  },
  {
    name: "Jessica Lee",
    time: "3 days ago",
    badge: "New Lead",
    badgeType: "green",
    source: "Website Chat"
  },
  {
    name: "Michael Johnson",
    time: "2 days ago",
    badge: "New Lead",
    badgeType: "green",
    source: "Facebook"
  }
];

export default function NotificationDropdown({ onClose }) {
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
          New Lead notification (38)
        </span>
        <button className="bg-[#E0F2FE] text-[#0D3B59] px-[8px] py-[4px] rounded-[4px] text-[12px] font-semibold hover:bg-[#BAE6FD] transition-colors cursor-pointer leading-none">
          Read All
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-[12px] w-full max-h-[480px] overflow-y-auto pr-[2px] no-scrollbar">
        {NOTIFICATIONS_DATA.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col gap-[12px] p-[12px] bg-white border border-[#CFD8DE] rounded-[8px] w-full"
          >
            {/* Top row: Avatar Badge, Name/Time Stack, and Badge status pill */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-[10px]">
                {/* User avatar circle */}
                <div className="w-[32px] h-[32px] bg-[#F2F4F7] text-[#475569] rounded-full flex items-center justify-center shrink-0">
                  {USER_PROFILE_ICON}
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

              {/* Status Badge with custom styling */}
              {item.badgeType === "green" ? (
                <div className="flex bg-[#E6F7ED] text-[#16A34A] text-[11px] font-semibold py-[2px] px-[8px] justify-center items-center gap-[10px] rounded-full shrink-0">
                  {item.badge}
                </div>
              ) : (
                <div className="flex bg-[#FFF9E6] text-[#EA580C] text-[11px] font-semibold py-[2px] px-[8px] justify-center items-center gap-[10px] rounded-full shrink-0">
                  {item.badge}
                </div>
              )}
            </div>

            {/* Bottom row: Source badge tag */}
            <div className="self-start bg-[#F2F4F7] text-[#344054] px-[8px] py-[4px] rounded-[4px] text-[12px] font-medium max-w-full truncate whitespace-nowrap text-ellipsis">
              {item.source}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
