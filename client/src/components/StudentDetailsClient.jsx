"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import mockLeadsResponse from "@/app/mock-data/leads-response.json";

const PREFERENCE_FIELDS = [
  { label: "Stream", value: "Management, Agriculture,", extra: "+2" },
  { label: "Level", value: "Diploma" },
  { label: "Degree", value: "Online B.com" },
  { label: "Specialization", value: "ACCA" },
  { label: "Study Mode", value: "Online" },
  { label: "Preferred Budget", value: "1,50,000" },
  { label: "Preferred State", value: "Punjab" },
  { label: "Preferred City", value: "Ludhiana" },
];

const ACTIVITY_FEED = [
  { answered: true, name: "Vikash (You)", time: "09:48:53", badgeDate: "16 Apr 2026, 15:30" },
  { answered: false, name: "Elena", time: "10:15:40", badgeDate: "17 Apr 2026, 09:00" },
  { answered: true, name: "Marcus", time: "12:30:22", badgeDate: "18 Apr 2026, 11:45" },
  { answered: true, name: "Vikash (You)", time: "13:05:17", badgeDate: "19 Apr 2026, 14:20" },
];

const SYSTEM_ACTIVITY = {
  time: "13:05:17",
  source: "FaceBook_University_Admit",
  campaign: "teotla_university_2026_Online_Ad...",
  sourceUrl: "https://degreefyd.com/colleges/ign...",
};

const QA_ANSWERS = [
  { q: "which_course_are_you_most_interested_in?", a: "online_bca" },
  { q: "when_do_you_plan_to_enroll_in_your_online_program?", a: "within_the_next_month" },
  { q: "phone", a: "+917838481891" },
];

const TRAILING_ACTIVITY = { answered: false, name: "Elena", time: "10:15:40", badgeDate: "17 Apr 2026, 09:00" };

function mapApiStudentToDetails(record) {
  if (!record) {
    return {
      name: "ANJALI",
      id: "STD-5DD4B84B",
      phone: "8221XXXXXX",
      email: "kha***@xxxxxx.com",
      statusStep: "Fresh"
    };
  }
  
  const latestRemark = record.student_remarks?.[0];
  const status = latestRemark?.lead_status || "Fresh";

  return {
    name: record.student_name === "N/A" ? "ANONYMOUS STUDENT" : record.student_name,
    id: record.student_id,
    phone: record.student_phone,
    email: record.student_email,
    statusStep: status
  };
}

async function fetchStudentRecord(leadId) {
  const json = mockLeadsResponse; // swap for a real fetch() later
  const record = json.data?.find((d) => d.student_id === leadId) ?? null;
  return mapApiStudentToDetails(record);
}

/* ----------------------------- Icon set ----------------------------- */

const BACK_ARROW_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0D3B59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HEART_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" stroke="#0D3B59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EDIT_PENCIL_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.9997 3.33325L16.6663 5.99992M6.99967 15.6666L14.6663 7.99992L11.9997 5.33325L4.33301 12.9999L3.33301 16.6666L6.99967 15.6666Z" stroke="#595959" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FLOATING_EDIT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11.1566 5.68684H5.59035C5.16856 5.68684 4.76405 5.85439 4.4658 6.15264C4.16755 6.45089 4 6.8554 4 7.27719V18.4096C4 18.8314 4.16755 19.2359 4.4658 19.5342C4.76405 19.8324 5.16856 20 5.59035 20H16.7228C17.1446 20 17.5491 19.8324 17.8474 19.5342C18.1456 19.2359 18.3132 18.8314 18.3132 18.4096V12.8434M17.1204 4.49406C17.4367 4.17772 17.8658 4 18.3132 4C18.7605 4 19.1896 4.17772 19.5059 4.49406C19.8223 4.8104 20 5.23945 20 5.68682C20 6.1342 19.8223 6.56325 19.5059 6.87959L11.9518 14.4338L8.77105 15.2289L9.56623 12.0482L17.1204 4.49406Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CHEVRON_DOWN_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2.66699 5.33325L8.00033 10.6666L13.3337 5.33325" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CHECK_ICON = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PHONE_ICON = (stroke) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MISSED_CALL_ICON = (stroke) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8l4-4M21 8l-4-4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SYSTEM_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="#0D3B59" strokeWidth="1.6"/>
    <path d="M8 20h8M12 16v4" stroke="#0D3B59" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

/* ----------------------------- Mock data ----------------------------- */

const PROFILE_TABS = ["Students Details", "Recommendations", "Shortlisted"];
const DETAIL_SUBTABS = ["Student Preferences", "Basic Details", "Additional Details"];

const LEAD_STATUS_STEPS = ["Fresh", "Pre Application", "ICC", "Application", "Admission", "Enrolled"];



/* ------------------------------ Component ------------------------------ */

export default function StudentDetailsClient({ leadId }) {
  const [dbStudent, setDbStudent] = useState(null);
  const [activeProfileTab, setActiveProfileTab] = useState(PROFILE_TABS[0]);
  const [activeSubTab, setActiveSubTab] = useState(DETAIL_SUBTABS[0]);
  const [activityFilter, setActivityFilter] = useState("All");
  const [expandedActivity, setExpandedActivity] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchStudentRecord(leadId);
      setDbStudent(data);
    }
    loadData();
  }, [leadId]);

  const handleEditClick = () => {
    if (dbStudent) {
      alert(`Editing details for student ${dbStudent.name}`);
    }
  };

  const handleWishlistClick = () => {
    if (dbStudent) {
      alert(`Added ${dbStudent.name} to wishlist`);
    }
  };

  if (!dbStudent) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-[#F7F8FA] p-[24px]">
        <div className="text-[16px] font-semibold text-[#8A96A0]">Loading student details...</div>
      </div>
    );
  }

  const currentStepIndex = LEAD_STATUS_STEPS.indexOf(dbStudent.statusStep);

  return (
    <div className="w-full h-full flex font-poppins text-left overflow-hidden">
      
      {/* Left Column (Student Details & Lead Status) - Scrollable */}
      <div className="flex-1 h-full overflow-y-auto pt-[24px] pb-[40px] pl-[24px] pr-[16px] bg-[#F7F8FA] flex flex-col gap-[20px] relative no-scrollbar">
        
        {/* Back to Dashboard */}
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-[8px] text-[14px] font-semibold text-[#0D3B59] w-fit hover:underline">
            {BACK_ARROW_ICON}
            Back to Dashboard
          </Link>
        </div>

        {/* Profile / Recommendations / Shortlisted tabs */}
        <div className="flex items-center gap-[10px] pb-[16px] border-b border-[#E5E9EC] shrink-0">
          {PROFILE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveProfileTab(tab)}
              className={`px-[20px] py-[10px] rounded-[8px] border text-[14px] font-semibold font-poppins transition-colors cursor-pointer ${
                activeProfileTab === tab
                  ? "bg-[#0D3B59] border-[#0D3B59] text-white"
                  : "bg-white border-[#CFD8DE] text-[#5B6B79] hover:text-[#121212]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeProfileTab === "Students Details" ? (
          <>
            {/* Profile Card Container (White layout panel) */}
            <div className="flex w-[772px] p-[12px] flex-col items-start gap-[16px] bg-white border border-[#ECECEC] rounded-[8px] shadow-sm shrink-0">
              
              {/* Header row: Avatar, name, ID, and action buttons */}
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-[16px]">
                  {/* Orange silhouette avatar */}
                  <span className="w-[48px] h-[48px] rounded-full bg-[#FDEFE3] flex items-center justify-center text-[#ED923D] font-bold text-[18px] shrink-0">
                    {dbStudent.name.charAt(0)}
                  </span>
                  <div className="flex flex-col">
                    <h2 className="text-[20px] font-bold text-[#121212] leading-tight font-poppins">
                      {dbStudent.name}
                    </h2>
                    <span className="text-[13px] text-[#808080] font-normal mt-0.5">
                      {dbStudent.id}
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
              <div className="flex items-center gap-[12px]">
                <div className="px-[12px] py-[6px] bg-[#F2F4F7] border border-[#E5E9EC] rounded-full text-[13px] font-medium text-[#0D3B59]">
                  {dbStudent.phone}
                </div>
                <div className="px-[12px] py-[6px] bg-[#F2F4F7] border border-[#E5E9EC] rounded-full text-[13px] font-medium text-[#0D3B59]">
                  {dbStudent.email}
                </div>
              </div>

              {/* Divider Line */}
              <div className="w-full h-[1px] bg-[#E5E9EC]" />

              {/* Subtabs row: Student Preferences, Basic Details, Additional Details */}
              <div className="flex items-center gap-[28px] border-b border-[#E5E9EC] w-full">
                {DETAIL_SUBTABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={`text-[14px] font-semibold font-poppins pb-[12px] cursor-pointer border-b-2 -mb-px transition-colors ${
                      activeSubTab === tab
                        ? "text-[#0D3B59] border-[#0D3B59]"
                        : "text-[#8A96A0] border-transparent hover:text-[#121212]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Preference fields grid */}
              {activeSubTab === "Student Preferences" && (
                <div className="grid grid-cols-3 gap-x-[32px] gap-y-[20px] w-full font-poppins">
                  {PREFERENCE_FIELDS.map((field) => (
                    <div key={field.label} className="flex flex-col gap-[6px]">
                      <span className="text-[13px] font-normal text-[#8A96A0]">{field.label}</span>
                      <span className="text-[15px] font-bold text-[#121212]">
                        {field.value}
                        {field.extra && (
                          <span className="text-[#0D3B59] ml-[4px]">{field.extra}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeSubTab === "Basic Details" && (
                <p className="text-[13px] font-normal text-[#8A96A0]">Basic details go here.</p>
              )}
              {activeSubTab === "Additional Details" && (
                <p className="text-[13px] font-normal text-[#8A96A0]">Additional details go here.</p>
              )}

            </div>

            {/* Lead Status Timeline Box */}
            <div className="flex w-[772px] p-[12px] flex-col justify-center items-start gap-[16px] bg-white border border-[#ECECEC] rounded-[8px] shadow-sm relative shrink-0">
              <h3 className="text-[15px] font-bold text-[#121212] font-poppins mb-0">
                Lead Status
              </h3>

              {/* Pipeline Flow */}
              <div className="flex items-center w-full relative pt-2">
                {LEAD_STATUS_STEPS.map((step, i) => {
                  const isPastOrCurrent = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <React.Fragment key={step}>
                      <div
                        className={`relative flex items-center justify-center px-[16px] py-[10px] rounded-[8px] border text-[14px] font-semibold shrink-0 z-10 ${
                          isCurrent
                            ? "border-[#0D3B59] text-[#0D3B59] bg-white"
                            : "border-[#E5E9EC] text-[#8A96A0] bg-white font-normal"
                        }`}
                      >
                        <span>{step}</span>
                        {isPastOrCurrent && (
                          <span className="absolute -top-[8px] -right-[8px] w-[18px] h-[18px] rounded-full bg-[#25D366] flex items-center justify-center border-2 border-white">
                            {CHECK_ICON}
                          </span>
                        )}
                      </div>
                      {i < LEAD_STATUS_STEPS.length - 1 && (
                        <span className={`flex-1 h-[3px] z-0 ${isPastOrCurrent ? "bg-[#0D3B59]" : "bg-[#E5E9EC]"}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Floating edit action button (positioned absolute in Lead Status Card) */}
              <button 
                onClick={handleEditClick}
                className="absolute right-[16px] bottom-[16px] w-[44px] h-[44px] rounded-full bg-[#0D3B59] hover:bg-[#092c42] shadow-[0_4px_12px_rgba(13,59,89,0.3)] flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
              >
                {FLOATING_EDIT_ICON}
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white border border-[#E5E9EC] rounded-[12px] p-[24px] text-slate-500 font-medium w-[772px]">
            Tabs details will render here.
          </div>
        )}

      </div>

      {/* Right Column (Student Activity Sidebar) - docked, matches Figma full height specs */}
      <div className="flex w-[372px] h-[1069px] flex-col items-start gap-[8px] p-[12px] bg-white border-l border-[#ECECEC] shrink-0 overflow-y-auto no-scrollbar">
        
        {/* Header title */}
        <span className="text-[16px] font-bold text-[#121212] font-poppins mb-[4px] block select-none">
          Student Activity
        </span>
        
        {/* Filter dropdown */}
        <div className="relative mb-[16px]">
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="w-[120px] h-[36px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Calls">Calls</option>
            <option value="System">System</option>
          </select>
          <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
            {CHEVRON_DOWN_ICON}
          </span>
        </div>

        {/* Scrollable Timeline activities content */}
        <div className="w-full flex-1 flex flex-col pt-[16px]">
          
          {/* Today label */}
          <span className="text-[12px] text-[#808080] font-normal mb-[16px] block">
            Today
          </span>

          {/* Activities list */}
          <div className="flex flex-col gap-[20px] relative pl-[28px] border-l-2 border-[#E5E9EC] ml-[16px]">
            
            {ACTIVITY_FEED.map((entry, i) => (
              <button
                key={`${entry.name}-${i}`}
                onClick={() => setExpandedActivity(expandedActivity === i ? null : i)}
                className="flex items-center justify-between w-full py-[8px] pl-[12px] pr-[32px] relative text-left cursor-pointer"
              >
                {/* Timeline dot circle indicator */}
                <div 
                  className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full flex items-center justify-center border-2 border-white z-10"
                  style={{ backgroundColor: entry.answered ? "#E7F7EE" : "#FCEAEA" }}
                >
                  {entry.answered ? PHONE_ICON("#007B2D") : MISSED_CALL_ICON("#DC2626")}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#121212] leading-tight font-poppins">{entry.name}</span>
                  <span className="text-[12px] text-[#808080] mt-0.5">{entry.time}</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <span 
                    className="text-[11px] font-semibold px-[10px] py-[4px] rounded-[28px] whitespace-nowrap font-poppins text-[#ED923D] bg-[rgba(237,146,61,0.10)]"
                  >
                    {entry.badgeDate}
                  </span>
                  <span className={`transition-transform ${expandedActivity === i ? "rotate-180" : ""}`}>
                    {CHEVRON_DOWN_ICON}
                  </span>
                </div>
              </button>
            ))}

            {/* System entry with lead source metadata */}
            <div className="flex items-center justify-between w-full py-[8px] pl-[12px] relative">
              {/* Timeline dot circle indicator */}
              <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-[#F2F4F6] flex items-center justify-center border-2 border-white z-10">
                {SYSTEM_ICON}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#121212] leading-tight font-poppins">System</span>
                <span className="text-[12px] text-[#808080] mt-0.5">{SYSTEM_ACTIVITY.time}</span>
              </div>
              <div className="w-[100px]" />
            </div>

          </div>

          {/* Custom metadata items */}
          <div className="flex flex-col gap-[8px] mt-[24px] border-t border-[#E5E9EC] pt-[16px] pl-[44px]">
            <div className="text-[13px] text-[#121212] font-normal leading-normal font-poppins">
              <span className="text-[#808080] inline-block w-[90px]">Source -</span> <span className="text-[#5B6B79]">{SYSTEM_ACTIVITY.source}</span>
            </div>
            <div className="text-[13px] text-[#121212] font-normal leading-normal font-poppins">
              <span className="text-[#808080] inline-block w-[90px]">Campaign -</span> <span className="text-[#5B6B79]">{SYSTEM_ACTIVITY.campaign}</span>
            </div>
            <div className="text-[13px] text-[#121212] font-normal leading-normal font-poppins">
              <span className="text-[#808080] inline-block w-[90px]">Source URL -</span> <a href={SYSTEM_ACTIVITY.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#0D3B59] underline">{SYSTEM_ACTIVITY.sourceUrl}</a>
            </div>
          </div>

          {/* Custom Questions with input/text layout */}
          <div className="flex flex-col gap-[12px] mt-[16px] pl-[44px] pr-[16px]">
            {QA_ANSWERS.map((qa) => (
              <div key={qa.q} className="border border-[#E5E9EC] rounded-[8px] px-[12px] py-[10px] bg-white">
                <p className="text-[12px] font-normal text-[#8A96A0] leading-snug mb-[2px] font-poppins">{qa.q}</p>
                <p className="text-[14px] font-semibold text-[#121212] font-poppins">{qa.a}</p>
              </div>
            ))}
          </div>

          {/* Trailing activity entry */}
          <div className="flex flex-col relative pl-[28px] border-l-2 border-[#E5E9EC] ml-[16px] mt-[24px] pb-6">
            <div className="flex items-center justify-between w-full py-[8px] pl-[12px] relative">
              {/* Timeline dot circle indicator */}
              <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-[#FCEAEA] flex items-center justify-center border-2 border-white z-10">
                {MISSED_CALL_ICON("#DC2626")}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#121212] leading-tight font-poppins">{TRAILING_ACTIVITY.name}</span>
                <span className="text-[12px] text-[#808080] mt-0.5">{TRAILING_ACTIVITY.time}</span>
              </div>
              <span className="text-[11px] font-semibold rounded-[28px] px-[10px] py-[4px] bg-[rgba(237,146,61,0.10)] text-[#ED923D] whitespace-nowrap font-poppins">
                {TRAILING_ACTIVITY.badgeDate}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
