"use client";

import React, { useState, useEffect } from "react";

// Coffee cup icon for Choose Break Type
const COFFEE_ICON_CHOOSE = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

// Checklist calendar SVG icon for Meeting Break
const MEETING_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

// Fork/knife SVG icon for Meal Break
const MEAL_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v8c0 1.1.9 2 2 2h3Z" />
    <path d="M19 15v7" />
  </svg>
);

// Close (X) icon SVG
const CLOSE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#121212" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Exact user-specified coffee cup SVG for Break Timer
const COFFEE_ICON_TIMER = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.1581 7.54378H13.8598C14.6043 7.54378 15.3183 7.83952 15.8447 8.36593C16.3711 8.89235 16.6668 9.60633 16.6668 10.3508C16.6668 11.0953 16.3711 11.8092 15.8447 12.3357C15.3183 12.8621 14.6043 13.1578 13.8598 13.1578H13.1581M13.1581 7.54378H3.3335V13.8596C3.3335 14.604 3.62923 15.318 4.15565 15.8444C4.68207 16.3708 5.39605 16.6666 6.14051 16.6666H10.351C11.0955 16.6666 11.8095 16.3708 12.3359 15.8444C12.8623 15.318 13.1581 14.604 13.1581 13.8596V7.54378ZM5.43876 3.33325V4.73676M8.24578 3.33325V4.73676M11.0528 3.33325V4.73676" stroke="#0D3B59" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
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

  // Reset states when modal is opened or closed
  useEffect(() => {
    if (!show) {
      setIsTimerActive(false);
    } else {
      // Default initial states based on selectedType
      if (selectedType === "meal") {
        setSecondsLeft(765); // 12:45
        setTotalDurationStr("45:15");
      } else {
        setSecondsLeft(900); // 15:00
        setTotalDurationStr("15:00");
      }
    }
  }, [show, selectedType]);

  // Countdown timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, secondsLeft]);

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

      {/* Modal dialog box container: Width 596px, Height 438px, Padding 16px */}
      <div className="fixed inset-0 m-auto w-[596px] h-[438px] bg-white border border-[#CFD8DE] rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 flex flex-col items-center justify-center gap-[24px] p-[16px] font-poppins select-none text-left">
        
        {!isTimerActive ? (
          // STATE 1: Choose Break Type
          <>
            {/* Header: Choose Break Type & Close button */}
            <div className="flex items-center justify-between w-full pb-[12px] border-b border-[#E5E9EC] shrink-0">
              <span className="text-[18px] font-bold text-[#121212] leading-none">
                Choose Break Type
              </span>
              <button 
                onClick={onClose}
                className="w-[32px] h-[32px] border border-[#E5E9EC] rounded-[4px] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {CLOSE_ICON}
              </button>
            </div>

            {/* Break Options Container */}
            <div className="flex flex-col gap-[12px] w-full shrink-0">
              {/* Meeting Break option */}
              <div 
                onClick={() => setSelectedType("meeting")}
                className={`flex items-center justify-between p-[12px] border rounded-[8px] cursor-pointer transition-all duration-200 ${
                  selectedType === "meeting" 
                    ? "border-[#0d3b59] bg-[#f0f9ff]" 
                    : "border-[#E5E9EC] bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-[12px]">
                  <div className="w-[36px] h-[36px] bg-[#E2E8F0] text-[#475569] rounded-full flex items-center justify-center shrink-0">
                    {MEETING_ICON}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#121212] text-[14px] leading-tight">
                      Meeting Break
                    </span>
                    <span className="text-[12px] text-[#808080] font-normal leading-normal mt-[1px]">
                      15-90 Min
                    </span>
                  </div>
                </div>
                {/* Custom Radio check */}
                <div className="w-[18px] h-[18px] rounded-full border border-[#0d3b59] flex items-center justify-center shrink-0 bg-white">
                  {selectedType === "meeting" && (
                    <div className="w-[10px] h-[10px] rounded-full bg-[#0d3b59]" />
                  )}
                </div>
              </div>

              {/* Meal Break option */}
              <div 
                onClick={() => setSelectedType("meal")}
                className={`flex items-center justify-between p-[12px] border rounded-[8px] cursor-pointer transition-all duration-200 ${
                  selectedType === "meal" 
                    ? "border-[#0d3b59] bg-[#f0f9ff]" 
                    : "border-[#E5E9EC] bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-[12px]">
                  <div className="w-[36px] h-[36px] bg-[#FFF3E0] text-[#EA580C] rounded-full flex items-center justify-center shrink-0">
                    {MEAL_ICON}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#121212] text-[14px] leading-tight">
                      Meal Break
                    </span>
                    <span className="text-[12px] text-[#808080] font-normal leading-normal mt-[1px]">
                      30-60 Min
                    </span>
                  </div>
                </div>
                {/* Custom Radio check */}
                <div className="w-[18px] h-[18px] rounded-full border border-[#0d3b59] flex items-center justify-center shrink-0 bg-white">
                  {selectedType === "meal" && (
                    <div className="w-[10px] h-[10px] rounded-full bg-[#0d3b59]" />
                  )}
                </div>
              </div>
            </div>

            {/* Preview timer box */}
            <div className="flex flex-col items-center gap-[6px] shrink-0">
              <div className="border border-[#EA580C] bg-[#FFF9E6] text-[#EA580C] font-semibold text-[20px] px-[16px] py-[6px] rounded-[6px] tracking-wide leading-none">
                59 : 15
              </div>
              <span className="text-[12px] text-[#808080] font-normal leading-normal">
                Overall Break Time remaining
              </span>
            </div>

            {/* Start Break Button */}
            <div className="w-full mt-auto shrink-0">
              <button 
                onClick={handleStartBreak}
                className="w-full h-[44px] bg-[#0D3B59] hover:bg-[#092c42] text-white rounded-[8px] flex items-center justify-center gap-[8px] font-semibold transition-colors cursor-pointer text-[14px]"
              >
                {COFFEE_ICON_CHOOSE}
                <span>Start Break</span>
              </button>
            </div>
          </>
        ) : (
          // STATE 2: Break Timerpopup
          <>
            {/* Header Badge: circular coffee cup and Break Duration label */}
            <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-[#F2F4F7] border border-[#E5E9EC] rounded-full shrink-0">
              {COFFEE_ICON_TIMER}
              <span className="text-[13px] font-medium text-[#0D3B59] leading-none">
                Break Duration
              </span>
            </div>

            {/* Giant countdown timer */}
            <div className="text-[56px] font-bold text-[#EA580C] leading-none tracking-wide select-all">
              {formatTime(secondsLeft)}
            </div>

            {/* Statistics row */}
            <div className="w-full flex items-center justify-around border-t border-b border-[#E5E9EC] py-[16px] shrink-0">
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
