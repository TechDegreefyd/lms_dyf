"use client";

import React, { useState } from "react";
import Link from "next/link";

// Icons SVGs
const HEART_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-red-500 transition-colors">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const EDIT_PENCIL_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-[#0D3B59] transition-colors">
    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const FLOATING_EDIT_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const PHONE_CALL_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PHONE_MISSED_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="23" y1="1" x2="1" y2="23" />
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
  </svg>
);

const SYSTEM_LOG_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const PIPELINE_CHECK_ICON = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CHEVRON_DOWN_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Mock Database of Students details mapped by leadId
const MOCK_STUDENTS_DB = {
  "STD-90EABBCE": {
    name: "RAJENDRA SHARMA",
    id: "STD-90EABBCE",
    phone: "9310000000",
    email: "kin***@xxxxxx.com",
    stream: "Management, Agriculture, +2",
    level: "Diploma",
    degree: "Online B.com",
    specialization: "ACCA",
    studyMode: "Online",
    budget: "1,50,000",
    state: "Punjab",
    city: "Ludhiana",
    statusStep: "Fresh"
  },
  "STD-91EABBCE": {
    name: "Anjali Sharma",
    id: "STD-91EABBCE",
    phone: "9320000000",
    email: "Mun***@xxxxxx.com",
    stream: "Management, Agriculture, +2",
    level: "Diploma",
    degree: "Online B.com",
    specialization: "ACCA",
    studyMode: "Online",
    budget: "1,50,000",
    state: "Punjab",
    city: "Ludhiana",
    statusStep: "Fresh"
  },
  "STD-92EABBCE": {
    name: "Ankit Sharma",
    id: "STD-92EABBCE",
    phone: "9306508269",
    email: "anirudh.sharma.ux@gmail.com",
    stream: "Management, Agriculture, +2",
    level: "Diploma",
    degree: "Online B.com",
    specialization: "ACCA",
    studyMode: "Online",
    budget: "1,50,000",
    state: "Punjab",
    city: "Ludhiana",
    statusStep: "Pre Application"
  },
  "STD-93EABBCE": {
    name: "Jaxon Lee",
    id: "STD-93EABBCE",
    phone: "7300000000",
    email: "Fun***@xxxxxx.com",
    stream: "Management, Agriculture, +2",
    level: "Diploma",
    degree: "Online B.com",
    specialization: "ACCA",
    studyMode: "Online",
    budget: "1,50,000",
    state: "Punjab",
    city: "Ludhiana",
    statusStep: "Fresh"
  },
  "STD-94EABBCE": {
    name: "Sofia Kim",
    id: "STD-94EABBCE",
    phone: "9300000000",
    email: "ani***@xxxxxx.com",
    stream: "Management, Agriculture, +2",
    level: "Diploma",
    degree: "Online B.com",
    specialization: "ACCA",
    studyMode: "Online",
    budget: "1,50,000",
    state: "Punjab",
    city: "Ludhiana",
    statusStep: "Fresh"
  }
};

const DEFAULT_STUDENT = {
  name: "Ankit Sharma",
  id: "STD-92EABBCE",
  phone: "9306508269",
  email: "anirudh.sharma.ux@gmail.com",
  stream: "Management, Agriculture, +2",
  level: "Diploma",
  degree: "Online B.com",
  specialization: "ACCA",
  studyMode: "Online",
  budget: "1,50,000",
  state: "Punjab",
  city: "Ludhiana",
  statusStep: "Pre Application"
};

export default function StudentDetailsClient({ leadId }) {
  const student = MOCK_STUDENTS_DB[leadId] || { ...DEFAULT_STUDENT, id: leadId };
  
  const [activeTab, setActiveTab] = useState("details"); // details, recommendations, shortlisted
  const [activeSubtab, setActiveSubtab] = useState("preferences"); // preferences, basic, additional

  const handleEditClick = () => {
    alert(`Editing details for student ${student.name}`);
  };

  const handleWishlistClick = () => {
    alert(`Added ${student.name} to wishlist`);
  };

  // Status pipeline layout
  const PIPELINE_STEPS = ["Fresh", "Pre Application", "ICC", "Application", "Admission", "Enrolled"];
  const currentStepIndex = PIPELINE_STEPS.indexOf(student.statusStep);

  return (
    <div className="w-full flex flex-col font-poppins text-left">
      
      {/* Back button or top bar */}
      <div className="mb-4">
        <Link href="/dashboard" className="text-[13px] font-bold text-slate-400 hover:text-[#0D3B59] transition-colors">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Main Two-Column Content Layout (left details, right student activity sidebar) */}
      <div className="w-full flex gap-[24px] items-start">
        
        {/* Left Column (Student Details & Lead Status) */}
        <div className="flex-1 flex flex-col gap-[20px] relative">
          
          {/* Top Switcher Tabs (Students Details, Recommendations, Shortlisted) */}
          <div className="flex items-center gap-[12px] border-b border-[#E5E9EC] pb-[12px]">
            <button 
              onClick={() => setActiveTab("details")}
              className={`px-[16px] py-[8px] rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === "details" ? "bg-[#0D3B59] text-white" : "border border-[#CFD8DE] text-[#667085] hover:bg-slate-50"
              }`}
            >
              Students Details
            </button>
            <button 
              onClick={() => setActiveTab("recommendations")}
              className={`px-[16px] py-[8px] rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === "recommendations" ? "bg-[#0D3B59] text-white" : "border border-[#CFD8DE] text-[#667085] hover:bg-slate-50"
              }`}
            >
              Recommendations
            </button>
            <button 
              onClick={() => setActiveTab("shortlisted")}
              className={`px-[16px] py-[8px] rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === "shortlisted" ? "bg-[#0D3B59] text-white" : "border border-[#CFD8DE] text-[#667085] hover:bg-slate-50"
              }`}
            >
              Shortlisted
            </button>
          </div>

          {activeTab === "details" ? (
            <>
              {/* Profile Card Container (White layout panel) */}
              <div className="w-full bg-white border border-[#E5E9EC] rounded-[12px] p-[24px] flex flex-col shadow-sm">
                
                {/* Header row: Avatar, name, ID, and action buttons */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-[16px]">
                    {/* Orange silhouette avatar */}
                    <div className="w-[48px] h-[48px] rounded-full bg-[#FDF2E9] border border-[#FADBD8] flex items-center justify-center text-[#EA580C] text-[18px] font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-[20px] font-bold text-[#121212] leading-tight font-poppins">
                        {student.name}
                      </h2>
                      <span className="text-[13px] text-[#808080] font-normal mt-0.5">
                        {student.id}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-[12px]">
                    <button 
                      onClick={handleWishlistClick}
                      className="w-[36px] h-[36px] border border-[#E5E9EC] rounded-[8px] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {HEART_ICON}
                    </button>
                    <button 
                      onClick={handleEditClick}
                      className="w-[36px] h-[36px] border border-[#E5E9EC] rounded-[8px] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {EDIT_PENCIL_ICON}
                    </button>
                  </div>
                </div>

                {/* Badge Row (Phone and Email info) */}
                <div className="flex items-center gap-[12px] mt-[16px] pb-[16px]">
                  <div className="px-[12px] py-[6px] bg-[#F2F4F7] border border-[#E5E9EC] rounded-full text-[13px] font-medium text-[#0D3B59]">
                    {student.phone}
                  </div>
                  <div className="px-[12px] py-[6px] bg-[#F2F4F7] border border-[#E5E9EC] rounded-full text-[13px] font-medium text-[#0D3B59]">
                    {student.email}
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-[#E5E9EC]" />

                {/* Subtabs row: Student Preferences, Basic Details, Additional Details */}
                <div className="flex items-center gap-[24px] mt-[16px] pb-[4px]">
                  <button 
                    onClick={() => setActiveSubtab("preferences")}
                    className={`text-[14px] font-semibold pb-[12px] relative transition-colors cursor-pointer ${
                      activeSubtab === "preferences" ? "text-[#0D3B59]" : "text-[#667085] hover:text-[#0D3B59]"
                    }`}
                  >
                    Student Preferences
                    {activeSubtab === "preferences" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0D3B59] rounded-full" />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveSubtab("basic")}
                    className={`text-[14px] font-semibold pb-[12px] relative transition-colors cursor-pointer ${
                      activeSubtab === "basic" ? "text-[#0D3B59]" : "text-[#667085] hover:text-[#0D3B59]"
                    }`}
                  >
                    Basic Details
                    {activeSubtab === "basic" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0D3B59] rounded-full" />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveSubtab("additional")}
                    className={`text-[14px] font-semibold pb-[12px] relative transition-colors cursor-pointer ${
                      activeSubtab === "additional" ? "text-[#0D3B59]" : "text-[#667085] hover:text-[#0D3B59]"
                    }`}
                  >
                    Additional Details
                    {activeSubtab === "additional" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0D3B59] rounded-full" />
                    )}
                  </button>
                </div>

                {/* Content grid depending on subtab */}
                {activeSubtab === "preferences" && (
                  <div className="grid grid-cols-3 gap-y-[20px] gap-x-[16px] mt-[20px]">
                    {/* Row 1 */}
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Stream</span>
                      <span className="text-[14px] font-semibold text-[#121212]">
                        {student.stream.split(",").slice(0, 2).join(",")}, <span className="text-[#3b82f6] cursor-pointer hover:underline">+2</span>
                      </span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Level</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.level}</span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Degree</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.degree}</span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Specialization</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.specialization}</span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Study Mode</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.studyMode}</span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Preferred Budget</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.budget}</span>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Preferred State</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.state}</span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[12px] text-[#808080] font-normal">Preferred City</span>
                      <span className="text-[14px] font-semibold text-[#121212]">{student.city}</span>
                    </div>
                    <div className="flex flex-col gap-[4px]" />
                  </div>
                )}

                {activeSubtab === "basic" && (
                  <div className="mt-[20px] text-[14px] text-slate-500 font-medium">
                    Basic information about the student is loaded here.
                  </div>
                )}

                {activeSubtab === "additional" && (
                  <div className="mt-[20px] text-[14px] text-slate-500 font-medium">
                    Additional institutional or referral data is shown here.
                  </div>
                )}

              </div>

              {/* Lead Status Timeline Box */}
              <div className="w-full bg-white border border-[#E5E9EC] rounded-[12px] p-[24px] flex flex-col shadow-sm">
                <h3 className="text-[15px] font-bold text-[#121212] mb-[20px] font-poppins">
                  Lead Status
                </h3>

                {/* Pipeline Flow (6 horizontal steps) */}
                <div className="flex items-center justify-between w-full relative pt-2">
                  
                  {PIPELINE_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    return (
                      <div key={step} className="flex-1 flex items-center relative">
                        
                        {/* Connecting Line (drawn from previous step to this step) */}
                        {idx > 0 && (
                          <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] z-0 -translate-x-1/2 ${
                            idx <= currentStepIndex ? "bg-[#0D3B59]" : "bg-[#E5E9EC]"
                          }`} style={{ width: "100%" }} />
                        )}

                        {/* Step block wrapper */}
                        <div className="flex flex-col items-center mx-auto z-10 relative">
                          <div className={`relative px-[16px] py-[8px] rounded-[6px] border text-[13px] font-medium transition-colors ${
                            isCompleted 
                              ? "bg-white border-[#0D3B59] text-[#0D3B59]" 
                              : "bg-white border-[#E5E9EC] text-[#808080]"
                          }`}>
                            {step}

                            {/* Green checkmark badge at top-right of active/completed boxes */}
                            {isCompleted && (
                              <div className="absolute -top-1.5 -right-1.5 w-[14px] h-[14px] bg-[#16A34A] rounded-full flex items-center justify-center shadow-sm">
                                {PIPELINE_CHECK_ICON}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Floating edit action button */}
              <button 
                onClick={handleEditClick}
                className="absolute right-[16px] bottom-[-22px] w-[44px] h-[44px] rounded-full bg-[#0D3B59] hover:bg-[#092c42] shadow-[0_4px_12px_rgba(13,59,89,0.3)] flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
              >
                {FLOATING_EDIT_ICON}
              </button>
            </>
          ) : (
            <div className="bg-white border border-[#E5E9EC] rounded-[12px] p-[24px] text-slate-500 font-medium">
              Tabs details will render here.
            </div>
          )}

        </div>

        {/* Right Column (Student Activity Sidebar) - exact height/layout matching specs */}
        <div className="w-[364px] bg-white border border-[#E5E9EC] rounded-[12px] p-[20px] flex flex-col shadow-sm shrink-0">
          
          {/* Header title and filter dropdown */}
          <div className="flex items-center justify-between w-full pb-[16px] border-b border-[#E5E9EC] mb-[16px]">
            <span className="text-[16px] font-bold text-[#121212] font-poppins">
              Student Activity
            </span>
            <div className="flex items-center gap-[4px] px-[12px] py-[6px] border border-[#E5E9EC] rounded-[6px] text-[13px] font-medium text-[#121212] cursor-pointer hover:bg-slate-50 transition-colors">
              <span>All</span>
              {CHEVRON_DOWN_ICON}
            </div>
          </div>

          {/* Scrollable Timeline activities wrapper with specific annotated specs */}
          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar flex flex-col h-[656px] min-h-[656px]">
            
            {/* Today label */}
            <span className="text-[12px] text-[#808080] font-normal mb-[16px] block">
              Today
            </span>

            {/* Activities list */}
            <div className="flex flex-col gap-[20px] relative pl-[20px] border-l-2 border-[#E5E9EC] ml-[10px]">
              
              {/* Activity item 1 */}
              <div className="flex flex-col relative">
                {/* Timeline dot circle indicator */}
                <div className="absolute left-[-29px] top-0 w-[18px] h-[18px] rounded-full bg-[#DCFCE7] flex items-center justify-center border border-white">
                  {PHONE_CALL_ICON}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="text-[13px] font-semibold text-[#121212]">Vikash (You)</span>
                    <span className="text-[11px] font-medium text-[#EA580C]">16 Apr 2026, 15:30</span>
                  </div>
                  <span className="text-[12px] text-[#808080] mt-0.5">09:48:53</span>
                </div>
              </div>

              {/* Activity item 2 */}
              <div className="flex flex-col relative">
                {/* Timeline dot circle indicator */}
                <div className="absolute left-[-29px] top-0 w-[18px] h-[18px] rounded-full bg-[#FEE2E2] flex items-center justify-center border border-white">
                  {PHONE_MISSED_ICON}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="text-[13px] font-semibold text-[#121212]">Elena</span>
                    <span className="text-[11px] font-medium text-[#EA580C]">17 Apr 2026, 09:00</span>
                  </div>
                  <span className="text-[12px] text-[#808080] mt-0.5">10:15:40</span>
                </div>
              </div>

              {/* Activity item 3 */}
              <div className="flex flex-col relative">
                {/* Timeline dot circle indicator */}
                <div className="absolute left-[-29px] top-0 w-[18px] h-[18px] rounded-full bg-[#DCFCE7] flex items-center justify-center border border-white">
                  {PHONE_CALL_ICON}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="text-[13px] font-semibold text-[#121212]">Marcus</span>
                    <span className="text-[11px] font-medium text-[#EA580C]">18 Apr 2026, 11:45</span>
                  </div>
                  <span className="text-[12px] text-[#808080] mt-0.5">12:30:22</span>
                </div>
              </div>

              {/* Activity item 4 */}
              <div className="flex flex-col relative">
                {/* Timeline dot circle indicator */}
                <div className="absolute left-[-29px] top-0 w-[18px] h-[18px] rounded-full bg-[#DCFCE7] flex items-center justify-center border border-white">
                  {PHONE_CALL_ICON}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="text-[13px] font-semibold text-[#121212]">Vikash (You)</span>
                    <span className="text-[11px] font-medium text-[#EA580C]">19 Apr 2026, 14:20</span>
                  </div>
                  <span className="text-[12px] text-[#808080] mt-0.5">13:05:17</span>
                </div>
              </div>

              {/* Activity item 5 (System log) */}
              <div className="flex flex-col relative">
                {/* Timeline dot circle indicator */}
                <div className="absolute left-[-29px] top-0 w-[18px] h-[18px] rounded-full bg-[#F1F5F9] flex items-center justify-center border border-white">
                  {SYSTEM_LOG_ICON}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="text-[13px] font-semibold text-[#121212]">System</span>
                  </div>
                  <span className="text-[12px] text-[#808080] mt-0.5">13:05:17</span>
                </div>
              </div>

            </div>

            {/* Custom metadata items */}
            <div className="flex flex-col gap-[8px] mt-[24px] border-t border-[#E5E9EC] pt-[16px]">
              <div className="text-[13px] text-[#121212] font-normal leading-normal">
                <span className="text-[#808080] inline-block w-[90px]">Source -</span> FaceBook_University_Admit
              </div>
              <div className="text-[13px] text-[#121212] font-normal leading-normal">
                <span className="text-[#808080] inline-block w-[90px]">Campaign -</span> teotla_university_2026_Online_Ad...
              </div>
              <div className="text-[13px] text-[#121212] font-normal leading-normal">
                <span className="text-[#808080] inline-block w-[90px]">Source URL -</span> <a href="https://degreefyd.com/colleges/ign" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:underline">https://degreefyd.com/colleges/ign...</a>
              </div>
            </div>

            {/* Custom Questions with input/text layout */}
            <div className="flex flex-col gap-[12px] mt-[16px]">
              
              <div className="w-full border border-[#E5E9EC] rounded-[8px] p-[12px] flex flex-col bg-white">
                <span className="text-[11px] text-[#808080] font-normal">which_course_are_you_most_interested_in?</span>
                <span className="text-[13px] font-semibold text-[#121212] mt-[4px]">online_bca</span>
              </div>

              <div className="w-full border border-[#E5E9EC] rounded-[8px] p-[12px] flex flex-col bg-white">
                <span className="text-[11px] text-[#808080] font-normal">when_do_you_plan_to_enroll_in_your_online_program?</span>
                <span className="text-[13px] font-semibold text-[#121212] mt-[4px]">within_the_next_month</span>
              </div>

              <div className="w-full border border-[#E5E9EC] rounded-[8px] p-[12px] flex flex-col bg-white">
                <span className="text-[11px] text-[#808080] font-normal">phone</span>
                <span className="text-[13px] font-semibold text-[#121212] mt-[4px]">+917838481891</span>
              </div>

            </div>

            {/* Additional timeline log entry at bottom */}
            <div className="flex flex-col relative pl-[20px] border-l-2 border-[#E5E9EC] ml-[10px] mt-[24px]">
              <div className="flex flex-col relative">
                {/* Timeline dot circle indicator */}
                <div className="absolute left-[-29px] top-0 w-[18px] h-[18px] rounded-full bg-[#FEE2E2] flex items-center justify-center border border-white">
                  {PHONE_MISSED_ICON}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="text-[13px] font-semibold text-[#121212]">Elena</span>
                    <span className="text-[11px] font-medium text-[#EA580C]">17 Apr 2026, 09:00</span>
                  </div>
                  <span className="text-[12px] text-[#808080] mt-0.5">10:15:40</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
