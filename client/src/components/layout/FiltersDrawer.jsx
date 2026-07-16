"use client";

import React, { useState, useRef, useEffect } from "react";

// Trash can icon SVG for Clear All button
const TRASH_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4.80005 7.2H19.2M17.6 7.2V18.4C17.6 19.2 16.8 20 16 20H8.00005C7.20005 20 6.40005 19.2 6.40005 18.4V7.2M8.80005 7.2V5.6C8.80005 4.8 9.60005 4 10.4 4H13.6C14.4 4 15.2 4.8 15.2 5.6V7.2M10.4 11.2V16M13.6 11.2V16" stroke="#0D3B59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chevron right icon SVG for Apply filters button
const CHEVRON_RIGHT_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chevron down icon SVG for select inputs
const CHEVRON_DOWN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Calendar icon SVG for date inputs
const CALENDAR_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-slate-400">
    <path d="M11.4001 3V5.4M6.6001 3V5.4M3.6001 7.8H14.4001M6.6001 10.2H6.6061M9.0001 10.2H9.0061M11.4001 10.2H11.4061M6.6001 12.6H6.6061M9.0001 12.6H9.0061M11.4001 12.6H11.4061M4.8001 4.2H13.2001C13.8628 4.2 14.4001 4.73726 14.4001 5.4V13.8C14.4001 14.4627 13.8628 15 13.2001 15H4.8001C4.13736 15 3.6001 14.4627 3.6001 13.8V5.4C3.6001 4.73726 4.13736 4.2 4.8001 4.2Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Close (X) icon SVG
const CLOSE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function FiltersDrawer({ show, onClose, onApply }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [source, setSource] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [subStatus, setSubStatus] = useState("");
  const [campaign, setCampaign] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(""); // 'Connected' | 'Not Connected'
  const [unreadMessages, setUnreadMessages] = useState(""); // 'Yes' | 'No'

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState(""); // 'source' | 'leadStatus' | 'subStatus' | 'campaign'

  // Calendar states
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);
  const [showCalendarTo, setShowCalendarTo] = useState(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(26);

  const calendarRefFrom = useRef(null);
  const calendarRefTo = useRef(null);

  // Close calendar popovers on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRefFrom.current && !calendarRefFrom.current.contains(event.target)) {
        setShowCalendarFrom(false);
      }
      if (calendarRefTo.current && !calendarRefTo.current.contains(event.target)) {
        setShowCalendarTo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearAll = () => {
    setDateFrom("");
    setDateTo("");
    setSource("");
    setLeadStatus("");
    setSubStatus("");
    setCampaign("");
    setConnectionStatus("");
    setUnreadMessages("");
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        dateFrom,
        dateTo,
        source,
        leadStatus,
        subStatus,
        campaign,
        connectionStatus,
        unreadMessages
      });
    }
    onClose();
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop overlay (dimming background with 25% opacity) */}
      <div
        className="fixed inset-0 bg-black/25 z-40 cursor-default"
        onClick={onClose}
      />

      {/*
        Right sliding filters panel container - Width 511px.
        FIX: top-[76px] bottom-[68px] restricts the drawer to sit exactly inside
        the main content workspace, so it NEVER overlaps the top navbar (header)
        and leaves a 20px gap above the bottom page brand footer (height 48px).
        Header and Footer are shrink-0 (fixed height), and the body between them is
        flex-1 + min-h-0 + overflow-y-auto so IT scrolls internally.
      */}
      <div className="fixed right-0 top-[76px] bottom-[68px] w-full max-w-[511px] bg-white border-l border-[#CFD8DE] shadow-[0_4px_24px_rgba(0,0,0,0.08)] z-50 flex flex-col font-poppins text-left overflow-hidden">

        {/* Drawer Header (Filters title and X close button) - fixed height, never scrolls */}
        <div className="flex items-center justify-between w-full pl-[15px] pr-[32px] pt-[12px] pb-[12px] border-b border-[#E5E9EC] mb-[15px] shrink-0">
          <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
            Filters
          </span>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {CLOSE_ICON}
          </button>
        </div>

        {/* Scrollable Drawer Body with form fields - indents Left: 15px, Right: 32px */}
        {/* min-h-0 is the critical fix: without it, a flex child refuses to shrink
            below its content height, so overflow-y-auto never actually engages. */}
        <div className="flex-1 min-h-0 overflow-y-auto pl-[15px] pr-[32px] flex flex-col gap-[12px] pb-6 no-scrollbar">
          
          {/* Added On Date Range */}
          <div className="flex flex-col gap-[8px] w-full relative">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              Added On Date Range
            </span>
            <div className="flex items-center gap-[12px] w-full">
              {/* Date From */}
              <div className="relative flex-1" ref={calendarRefFrom}>
                <div 
                  onClick={() => setShowCalendarFrom(!showCalendarFrom)}
                  className="flex items-center justify-between border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white cursor-pointer select-none text-[14px] text-[#121212] font-poppins font-normal leading-normal h-[38px]"
                >
                  <span className={dateFrom ? "text-[#121212] font-normal font-poppins" : "text-[#9CA3AF] font-normal font-poppins"}>
                    {dateFrom || "dd/mm/yyyy"}
                  </span>
                  {CALENDAR_ICON}
                </div>

                {/* Custom March 2026 Calendar Popover */}
                {showCalendarFrom && (
                  <div className="absolute top-[44px] left-0 z-50 bg-white border border-[#E5E9EC] rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-3 w-[260px] select-none">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-normal text-[#121212] text-[14px] font-poppins">March 2026</span>
                      <div className="flex gap-2">
                        <button className="text-[#121212] hover:text-[#0D3B59] text-xs font-normal px-1">&lt;</button>
                        <button className="text-[#121212] hover:text-[#0D3B59] text-xs font-normal px-1">&gt;</button>
                      </div>
                    </div>
                    {/* Weekdays */}
                    <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] text-slate-400 font-normal mb-1">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-y-1 text-[12px] font-normal text-center">
                      {/* March 2026 starts on Sunday (need 6 empty slots) */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const dayNum = i + 1;
                        const isSelected = dayNum === selectedCalendarDay;
                        return (
                          <div 
                            key={`day-${dayNum}`}
                            onClick={() => {
                              setSelectedCalendarDay(dayNum);
                              setDateFrom(`${dayNum.toString().padStart(2, '0')}/03/2026`);
                              setShowCalendarFrom(false);
                            }}
                            className={`w-[28px] h-[28px] flex items-center justify-center rounded-full mx-auto relative cursor-pointer hover:bg-slate-100 ${
                              isSelected ? "bg-[#0D3B59] text-white hover:bg-[#0D3B59]" : "text-[#121212]"
                            }`}
                          >
                            <span>{dayNum}</span>
                            {/* Special Green Dot decoration matching March 26 spec */}
                            {dayNum === 26 && (
                              <span className="absolute bottom-[2px] w-[4px] h-[4px] bg-[#25D366] rounded-full" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* To text */}
              <span className="text-[14px] font-normal text-[#121212] font-poppins">To</span>

              {/* Date To */}
              <div className="relative flex-1" ref={calendarRefTo}>
                <div 
                  onClick={() => setShowCalendarTo(!showCalendarTo)}
                  className="flex items-center justify-between border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white cursor-pointer select-none text-[14px] text-[#121212] font-poppins font-normal leading-normal h-[38px]"
                >
                  <span className={dateTo ? "text-[#121212] font-normal font-poppins" : "text-[#9CA3AF] font-normal font-poppins"}>
                    {dateTo || "dd/mm/yyyy"}
                  </span>
                  {CALENDAR_ICON}
                </div>

                {/* To Date Custom Calendar */}
                {showCalendarTo && (
                  <div className="absolute top-[44px] right-0 z-50 bg-white border border-[#E5E9EC] rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-3 w-[260px] select-none">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-normal text-[#121212] text-[14px] font-poppins">March 2026</span>
                      <div className="flex gap-2">
                        <button className="text-[#121212] hover:text-[#0D3B59] text-xs font-normal px-1">&lt;</button>
                        <button className="text-[#121212] hover:text-[#0D3B59] text-xs font-normal px-1">&gt;</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] text-slate-400 font-normal mb-1">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 text-[12px] font-normal text-center">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`empty-to-${i}`} />
                      ))}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const dayNum = i + 1;
                        return (
                          <div 
                            key={`day-to-${dayNum}`}
                            onClick={() => {
                              setDateTo(`${dayNum.toString().padStart(2, '0')}/03/2026`);
                              setShowCalendarTo(false);
                            }}
                            className="w-[28px] h-[28px] flex items-center justify-center rounded-full mx-auto cursor-pointer hover:bg-slate-100 text-[#121212]"
                          >
                            <span>{dayNum}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Source Dropdown */}
          <div className="flex flex-col gap-[8px] w-full relative">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              Source
            </span>
            <select 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white text-[14px] text-[#121212] font-poppins font-normal leading-normal outline-none appearance-none cursor-pointer h-[38px]"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
            >
              <option value="">Select Source</option>
              <option value="Facebook">Facebook</option>
              <option value="Website Chat">Website Chat</option>
              <option value="CP_Ref">CP_Ref</option>
              <option value="Direct">Direct</option>
            </select>
          </div>

          {/* Lead Status Dropdown */}
          <div className="flex flex-col gap-[8px] w-full relative">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              Lead Status
            </span>
            <select 
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
              className="w-full border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white text-[14px] text-[#121212] font-poppins font-normal leading-normal outline-none appearance-none cursor-pointer h-[38px]"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
            >
              <option value="">Select status</option>
              <option value="Fresh Lead">Fresh Lead</option>
              <option value="Overdue Callback">Overdue Callback</option>
              <option value="Today Callback">Today Callback</option>
              <option value="Reactive Lead">Reactive Lead</option>
            </select>
          </div>

          {/* NI Sub Status Dropdown */}
          <div className="flex flex-col gap-[8px] w-full relative">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              NI Sub Status
            </span>
            <select 
              value={subStatus}
              onChange={(e) => setSubStatus(e.target.value)}
              className="w-full border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white text-[14px] text-[#121212] font-poppins font-normal leading-normal outline-none appearance-none cursor-pointer h-[38px]"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
            >
              <option value="">Select status</option>
              <option value="Follow Up Scheduled">Follow Up Scheduled</option>
              <option value="Not Connected">Not Connected</option>
              <option value="Connected">Connected</option>
            </select>
          </div>

          {/* Campaign name Dropdown */}
          <div className="flex flex-col gap-[8px] w-full relative">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              Campaign name
            </span>
            <select 
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="w-full border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white text-[14px] text-[#121212] font-poppins font-normal leading-normal outline-none appearance-none cursor-pointer h-[38px]"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
            >
              <option value="">Select status</option>
              <option value="Google Search Ads">Google Search Ads</option>
              <option value="Meta Ads Conversion">Meta Ads Conversion</option>
              <option value="Email Newsletter">Email Newsletter</option>
            </select>
          </div>

          {/* Connection Status Radio Buttons */}
          <div className="flex flex-col gap-[8px] w-full">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              Connection Status
            </span>
            <div className="flex items-center gap-[24px] mt-1 select-none">
              <label className="flex items-center gap-[8px] cursor-pointer text-[14px] font-normal text-[#121212] font-poppins">
                <input 
                  type="radio" 
                  name="connectionStatus" 
                  value="Connected"
                  checked={connectionStatus === "Connected"}
                  onChange={() => setConnectionStatus("Connected")}
                  className="w-[16px] h-[16px] border border-[#CFD8DE] text-[#0D3B59] focus:ring-[#0D3B59] accent-[#0D3B59]"
                />
                <span>Connected</span>
              </label>
              <label className="flex items-center gap-[8px] cursor-pointer text-[14px] font-normal text-[#121212] font-poppins">
                <input 
                  type="radio" 
                  name="connectionStatus" 
                  value="Not Connected"
                  checked={connectionStatus === "Not Connected"}
                  onChange={() => setConnectionStatus("Not Connected")}
                  className="w-[16px] h-[16px] border border-[#CFD8DE] text-[#0D3B59] focus:ring-[#0D3B59] accent-[#0D3B59]"
                />
                <span>Not Connected</span>
              </label>
            </div>
          </div>

          {/* Unread Messages Radio Buttons */}
          <div className="flex flex-col gap-[8px] w-full">
            <span className="text-[14px] font-normal text-[#121212] font-poppins leading-normal">
              Unread Messages
            </span>
            <div className="flex items-center gap-[24px] mt-1 select-none">
              <label className="flex items-center gap-[8px] cursor-pointer text-[14px] font-normal text-[#121212] font-poppins">
                <input 
                  type="radio" 
                  name="unreadMessages" 
                  value="Yes"
                  checked={unreadMessages === "Yes"}
                  onChange={() => setUnreadMessages("Yes")}
                  className="w-[16px] h-[16px] border border-[#CFD8DE] text-[#0D3B59] focus:ring-[#0D3B59] accent-[#0D3B59]"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-[8px] cursor-pointer text-[14px] font-normal text-[#121212] font-poppins">
                <input 
                  type="radio" 
                  name="unreadMessages" 
                  value="No"
                  checked={unreadMessages === "No"}
                  onChange={() => setUnreadMessages("No")}
                  className="w-[16px] h-[16px] border border-[#CFD8DE] text-[#0D3B59] focus:ring-[#0D3B59] accent-[#0D3B59]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

        </div>

      
        <div
          className="flex justify-between items-center w-full max-w-[510px] border-t border-[#E5E9EC] shrink-0 bg-white"
          style={{ padding: "12px 32px 12px 15px", marginBottom: "0px" }}
        >
          {/* Clear All button */}
          <button 
            onClick={handleClearAll}
            className="flex items-center gap-[8px] border border-[#CFD8DE] rounded-[8px] px-[16px] py-[12px] text-[#0D3B59] hover:bg-slate-50 transition-colors font-normal text-[14px] font-poppins cursor-pointer"
          >
            {TRASH_ICON}
            <span>Clear All</span>
          </button>

          {/* Apply filters button */}
          <button 
            onClick={handleApply}
            className="flex items-center gap-[8px] bg-[#0D3B59] text-white rounded-[8px] px-[20px] py-[12px] hover:bg-[#092c42] transition-colors font-normal text-[14px] font-poppins cursor-pointer"
          >
            <span>Apply filters</span>
            {CHEVRON_RIGHT_ICON}
          </button>
        </div>

      </div>
    </>
  );
}
