"use client";

import React, { useState, useEffect } from "react";

// Meeting Break icon: Calendar with contact/person bust inside
const MEETING_ICON_FIGMA = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D3B59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="12" cy="14" r="2" />
    <path d="M17 20c0-1.5-2-2.5-5-2.5s-5 1-5 2.5" />
  </svg>
);

// Meal Break icon: Slanted fork and knife crossed
const MEAL_ICON_FIGMA = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E28743" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Fork slanted from top-left to bottom-right */}
    <path d="M5.5 5.5l7 7" />
    <path d="M3.5 5.5l2.5-2.5" />
    <path d="M4.5 6.5l2.5-2.5" />
    <path d="M5.5 7.5l2.5-2.5" />
    {/* Knife slanted from top-right to bottom-left */}
    <path d="M18.5 5.5l-7 7" />
    <path d="M14.5 4.5l4.5 4.5c.5.5 1 .5 1.5 0s.5-1 0-1.5l-4.5-4.5" />
    {/* Handles */}
    <path d="M12.5 12.5l5 5" />
    <path d="M11.5 12.5l-5 5" />
  </svg>
);

// Close (X) icon SVG
const CLOSE_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Exact user-specified coffee cup SVG for Break Timer
const COFFEE_ICON_TIMER = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.1581 7.54378H13.8598C14.6043 7.54378 15.3183 7.83952 15.8447 8.36593C16.3711 8.89235 16.6668 9.60633 16.6668 10.3508C16.6668 11.0953 16.3711 11.8092 15.8447 12.3357C15.3183 12.8621 14.6043 13.1578 13.8598 13.1578H13.1581M13.1581 7.54378H3.3335V13.8596C3.3335 14.604 3.62923 15.318 4.15565 15.8444C4.68207 16.3708 5.39605 16.6666 6.14051 16.6666H10.351C11.0955 16.6666 11.8095 16.3708 12.3359 15.8444C12.8623 15.318 13.1581 14.604 13.1581 13.8596V7.54378ZM5.43876 3.33325V4.73676M8.24578 3.33325V4.73676M11.0528 3.33325V4.73676" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// End Break checkmark icon
const CHECKMARK_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17L4 12" />
  </svg>
);

export default function BreakModal({ show, onClose }) {
  const [selectedType, setSelectedType] = useState("meal"); // default to Meal Break to show 45:15
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(765); // 12 minutes 45 seconds (12 * 60 + 45 = 765)
  const [totalDurationStr, setTotalDurationStr] = useState("45:15");

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    if (type === "meal") {
      setSecondsLeft(765); // 12:45
      setTotalDurationStr("45:15");
    } else {
      setSecondsLeft(900); // 15:00
      setTotalDurationStr("15:00");
    }
  };


  // Countdown timer interval
  useEffect(() => {
    if (!isTimerActive) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive]);

  if (!show) return null;

  // Format countdown string
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  const handleStartBreak = () => {
    setIsTimerActive(true);
  };

  const handleEndBreak = () => {
    setIsTimerActive(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay (dimming background with 25% opacity) */}
      <div 
        className="fixed inset-0 bg-black/25 z-40 cursor-default" 
        onClick={onClose}
      />

      {/* Modal dialog box container: Width 596px, Height fits layout (approx 410px), Padding 24px */}
      <div className="fixed inset-0 m-auto w-[596px] h-[410px] bg-white border border-[#E5E9EC] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-50 flex flex-col p-[24px] font-poppins select-none text-left">
        
        {!isTimerActive ? (
          // STATE 1: Choose Break Type
          <>
            {/* Header: Choose Break Type & Close button */}
            <div className="flex items-center justify-between w-full pb-[16px] border-b border-[#E5E9EC] shrink-0">
              <span className="text-[18px] font-medium text-[#121212] leading-none">
                Choose Break Type
              </span>
              <button 
                onClick={onClose}
                className="w-[32px] h-[32px] border border-[#E5E9EC] rounded-[6px] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {CLOSE_ICON}
              </button>
            </div>

            {/* Break Options Container */}
            <div className="flex flex-col gap-[20px] w-full mt-[20px] shrink-0">
              {/* Meeting Break option */}
              <div 
                onClick={() => handleTypeSelect("meeting")}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-[16px]">
                  <div className="w-[48px] h-[48px] bg-[#E8EFF3] rounded-full flex items-center justify-center shrink-0">
                    {MEETING_ICON_FIGMA}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[#121212] text-[15px] leading-tight">
                      Meeting Break
                    </span>
                    <span className="text-[13px] text-[#667085] font-popins leading-normal mt-[3px]">
                      15-90 Min
                    </span>
                  </div>
                </div>
                {/* Custom Radio check */}
                <div className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center shrink-0 bg-white transition-all duration-200 ${
                  selectedType === "meeting" ? "border-[#0d3b59]" : "border-[#CFD8DE] group-hover:border-slate-400"
                }`}>
                  {selectedType === "meeting" && (
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0d3b59]" />
                  )}
                </div>
              </div>

              {/* Meal Break option */}
              <div 
                onClick={() => handleTypeSelect("meal")}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-[16px]">
                  <div className="w-[48px] h-[48px] bg-[#FDF2E9] rounded-full flex items-center justify-center shrink-0">
                    {MEAL_ICON_FIGMA}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[#121212] text-[15px] leading-tight">
                      Meal Break
                    </span>
                    <span className="text-[13px] text-[#667085] font-normal leading-normal mt-[3px]">
                      30-60 Min
                    </span>
                  </div>
                </div>
                {/* Custom Radio check */}
                <div className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center shrink-0 bg-white transition-all duration-200 ${
                  selectedType === "meal" ? "border-[#0d3b59]" : "border-[#CFD8DE] group-hover:border-slate-400"
                }`}>
                  {selectedType === "meal" && (
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0d3b59]" />
                  )}
                </div>
              </div>
            </div>

            {/* Preview timer box */}
            <div className="flex flex-col items-center mt-[24px] mb-[24px] shrink-0">
              <div className="border border-[#F38C3E] text-[#F38C3E] font-medium text-[20px] px-[16px] py-[6px] rounded-[6px] tracking-wide leading-none">
                59 : 15
              </div>
              <span className="text-[13px] text-[#667085] font-normal leading-normal mt-[8px]">
                Overall Break Time remaining
              </span>
            </div>

            {/* Start Break Button */}
            <div className="w-full mt-auto shrink-0">
              <button 
                onClick={handleStartBreak}
                className="flex h-[44px] min-h-[44px] justify-center items-center gap-[4px] shrink-0 self-stretch w-full bg-[#0D3B59] hover:bg-[#092c42] text-white rounded-[8px] transition-colors cursor-pointer text-[14px] font-medium"
                style={{ padding: "12px 16px 12px 12px" }}
              >
                <span className="text-white">
                  {COFFEE_ICON_TIMER}
                </span>
                <span>Start Break</span>
              </button>
            </div>
          </>
        ) : (
          // STATE 2: Break Timerpopup
          <>
            {/* Header Badge: circular coffee cup and Break Duration label */}
            <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-[#F2F4F7] border border-[#E5E9EC] rounded-full self-center shrink-0">
              <span className="text-[#0D3B59]">
                {COFFEE_ICON_TIMER}
              </span>
              <span className="text-[13px] font-medium text-[#0D3B59] leading-none">
                Break Duration
              </span>
            </div>

            {/* Giant countdown timer */}
            <div className="text-[56px] font-bold text-[#EA580C] leading-none tracking-wide select-all self-center mt-[12px] mb-[12px]">
              {formatTime(secondsLeft)}
            </div>

            {/* Statistics row */}
            <div className="w-full flex items-center justify-around border-t border-b border-[#E5E9EC] py-[16px] shrink-0 my-[12px]">
              {/* Total Break Duration */}
              <div className="flex flex-col items-center gap-[4px]">
                <span className="text-[12px] text-[#808080] font-normal leading-normal">
                  Total Break Duration
                </span>
                <span className="text-[16px] font-bold text-[#121212] leading-none">
                  {totalDurationStr}
                </span>
              </div>

              {/* Vertical divider */}
              <div className="w-[1px] h-[36px] bg-[#E5E9EC]" />

              {/* Activity label */}
              <div className="flex flex-col items-center gap-[4px]">
                <span className="text-[12px] text-[#808080] font-normal leading-normal">
                  Activity
                </span>
                <span className="font-poppins text-[18px] font-medium text-[#121212] leading-none text-center">
                  {selectedType === "meal" ? "Meal Break" : "Meeting Break"}
                </span>
              </div>
            </div>

            {/* End Break Button */}
            <div className="w-full mt-auto shrink-0">
              <button 
                onClick={handleEndBreak}
                className="w-full h-[44px] bg-[#15803D] hover:bg-[#166534] text-white rounded-[8px] flex items-center justify-center gap-[8px] font-semibold transition-colors cursor-pointer text-[14px]"
              >
                {CHECKMARK_ICON}
                <span>End Break</span>
              </button>
            </div>
          </>
        )}

      </div>
    </>
  );
}
