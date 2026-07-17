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


const SECONDARY_CONTACT_CALL_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M11.3174 3.33667C12.6805 3.48029 13.9537 4.08485 14.9265 5.05036C15.8993 6.01587 16.5134 7.28449 16.6673 8.64643M11.3174 6.01161C11.9751 6.14131 12.5787 6.4657 13.0497 6.9427C13.5207 7.4197 13.8375 8.02727 13.9589 8.68656M16.6339 13.3143V15.3205C16.6346 15.5067 16.5965 15.6911 16.5219 15.8617C16.4473 16.0324 16.3378 16.1856 16.2006 16.3115C16.0634 16.4374 15.9013 16.5332 15.7249 16.5929C15.5485 16.6526 15.3615 16.6747 15.176 16.658C13.1182 16.4344 11.1416 15.7312 9.40485 14.6049C7.78907 13.5782 6.41917 12.2083 5.39243 10.5925C4.26225 8.84793 3.55892 6.86164 3.33941 4.79458C3.3227 4.60965 3.34468 4.42327 3.40395 4.2473C3.46321 4.07133 3.55847 3.90963 3.68365 3.7725C3.80884 3.63536 3.96121 3.52579 4.13106 3.45077C4.30091 3.37575 4.48452 3.33691 4.6702 3.33673H6.67641C7.00095 3.33354 7.31558 3.44847 7.56165 3.66009C7.80773 3.87171 7.96845 4.1656 8.01388 4.48696C8.09855 5.12899 8.25559 5.75938 8.48199 6.36611C8.57197 6.60547 8.59144 6.8656 8.5381 7.11568C8.48477 7.36577 8.36086 7.59532 8.18106 7.77714L7.33177 8.62644C8.28375 10.3006 9.66997 11.6869 11.3442 12.6389L12.1935 11.7896C12.3753 11.6098 12.6049 11.4859 12.8549 11.4325C13.105 11.3792 13.3652 11.3987 13.6045 11.4886C14.2112 11.715 14.8416 11.8721 15.4837 11.9567C15.8085 12.0026 16.1052 12.1662 16.3173 12.4165C16.5293 12.6668 16.642 12.9863 16.6339 13.3143Z" stroke="#0D3B59" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PLUS_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M10.0007 3.33325V16.6666M3.33398 9.99992H16.6673" stroke="#0D3B59" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MAP_PIN_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none" className="shrink-0">
    <path d="M11.2917 5.95833C11.2917 9.95833 5.95833 13.9583 5.95833 13.9583C5.95833 13.9583 0.625 9.95833 0.625 5.95833C0.625 4.54385 1.1869 3.18729 2.1871 2.1871C3.18729 1.1869 4.54385 0.625 5.95833 0.625C7.37282 0.625 8.72938 1.1869 9.72957 2.1871C10.7298 3.18729 11.2917 4.54385 11.2917 5.95833Z" stroke="#717171" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.95833 7.95833C7.0629 7.95833 7.95833 7.0629 7.95833 5.95833C7.95833 4.85376 7.0629 3.95833 5.95833 3.95833C4.85376 3.95833 3.95833 4.85376 3.95833 5.95833C3.95833 7.0629 4.85376 7.95833 5.95833 7.95833Z" stroke="#717171" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GRADUATION_CAP_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M16.6673 8.58333V12.5833M16.6673 8.58333L10.0007 5.25L3.33398 8.58333L10.0007 11.9167L16.6673 8.58333ZM6.00065 9.91667V13.25C8.00065 15.25 12.0007 15.25 14.0007 13.25V9.91667" stroke="#717171" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SAVE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <path d="M13.7044 16.6666V10.7407H6.29695V16.6666M6.29695 3.33325V7.03696H12.2229M15.1858 16.6666H4.81547C4.42255 16.6666 4.04573 16.5105 3.7679 16.2327C3.49007 15.9548 3.33398 15.578 3.33398 15.1851V4.81473C3.33398 4.42182 3.49007 4.045 3.7679 3.76717C4.04573 3.48934 4.42255 3.33325 4.81547 3.33325H12.9636L16.6673 7.03696V15.1851C16.6673 15.578 16.5112 15.9548 16.2334 16.2327C15.9556 16.5105 15.5787 16.6666 15.1858 16.6666Z" stroke="#0D3B59" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CHEVRON_DOWN_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M2.66699 5.33325L8.00033 10.6666L13.3337 5.33325" stroke="#808080" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SUGGESTED_COLLEGES = [
  {
    name: "Shoolini University online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses",
    logoType: "shoolini"
  },
  {
    name: "Jaypee Institute of Information Technology, Noida",
    location: "Noida, Uttar Pradesh",
    courses: "8 Courses",
    logoType: "jiit"
  },
  {
    name: "Dr. D.Y Patil Vidhyapeeth Online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses",
    logoType: "dypatil"
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    courses: "12 Courses",
    logoType: "dtu"
  },
  {
    name: "Dr. D.Y Patil Vidhyapeeth Online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses",
    logoType: "dypatil"
  },
  {
    name: "Shoolini University online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses",
    logoType: "shoolini"
  },
  {
    name: "Shoolini University online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses",
    logoType: "shoolini"
  },
  {
    name: "Dr. D.Y Patil Vidhyapeeth Online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses",
    logoType: "dypatil"
  }
];

const renderCollegeLogo = (type) => {
  switch (type) {
    case "shoolini":
      return (
        <svg width="66" height="40" viewBox="0 0 66 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="66" height="40" rx="4" fill="white"/>
          <text x="33" y="18" fill="#DC2626" fontSize="10" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">Shoolini</text>
          <text x="33" y="28" fill="#DC2626" fontSize="6" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">UNIVERSITY</text>
        </svg>
      );
    case "jiit":
      return (
        <svg width="66" height="40" viewBox="0 0 66 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="33" cy="20" r="15" fill="#A5D8EB" stroke="#1D4ED8" strokeWidth="1"/>
          <path d="M33 9 L36 14 L30 14 Z" fill="#EA580C"/>
          <rect x="32" y="14" width="2" height="9" fill="#EAB308"/>
          <text x="33" y="32" fill="#1E3A8A" fontSize="7" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">JIIT</text>
        </svg>
      );
    case "dypatil":
      return (
        <svg width="66" height="40" viewBox="0 0 66 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="66" height="40" rx="4" fill="white"/>
          <g transform="translate(4, 5)">
            <path d="M12 2 C18 0, 22 2, 22 4 C22 16, 12 28, 12 30 C12 28, 2 16, 2 4 C2 2, 6 0, 12 2 Z" fill="#8C1A2B" stroke="#121212" strokeWidth="0.5"/>
            <path d="M12 3.5 C17 1.8, 20.5 3.5, 20.5 5 C20.5 15, 12 26.5, 12 28 C12 26.5, 3.5 15, 3.5 5 C3.5 3.5, 7 1.8, 12 3.5 Z" fill="#8C1A2B" stroke="white" strokeWidth="0.5"/>
            <path d="M12 16 L12 8 M12 16 L8 12 M12 16 L16 12 M12 16 L6 16 M12 16 L18 16 M12 16 L9 20 M12 16 L15 20" stroke="white" strokeWidth="0.5"/>
            <path d="M12 18 C11 16, 8 16, 6 18 L6 21 C8 19, 11 19, 12 21 C13 19, 16 19, 18 21 L18 18 C16 16, 13 16, 12 18 Z" fill="white"/>
            <line x1="12" y1="18" x2="12" y2="28" stroke="white" strokeWidth="0.5"/>
          </g>
          <g transform="translate(29, 0)">
            <text x="0" y="14" fill="#121212" fontSize="5" fontWeight="800" fontFamily="sans-serif">D Y PATIL</text>
            <text x="0" y="20" fill="#717171" fontSize="3" fontWeight="600" fontFamily="sans-serif">UNIVERSITY</text>
            <text x="0" y="27" fill="#8C1A2B" fontSize="5" fontWeight="800" fontFamily="sans-serif">ONLINE</text>
            <text x="0" y="33" fill="#717171" fontSize="3" fontWeight="500" fontFamily="sans-serif">NAVI MUMBAI</text>
          </g>
        </svg>
      );
    case "dtu":
      return (
        <svg width="66" height="40" viewBox="0 0 66 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="33" cy="20" r="14" fill="white" stroke="#78350F" strokeWidth="1.5"/>
          <circle cx="33" cy="20" r="10" fill="none" stroke="#78350F" strokeWidth="1" strokeDasharray="2 2"/>
          <text x="33" y="23" fill="#78350F" fontSize="8" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">DTU</text>
        </svg>
      );
    default:
      return null;
  }
};

const MOCK_COURSES = [
  { course: "Online MBA in Human Reso...", spec: "Human Resources", level: "Certificate", duration: "5 Years", semFee: "₹ 1,25,000", annualFee: "₹ 25,00,000", totalFee: "₹ 25,00,000" },
  { course: "Online MBA in Human Reso...", spec: "Information Technology", level: "UG", duration: "5 Years", semFee: "₹ 1,25,000", annualFee: "₹ 25,00,000", totalFee: "₹ 25,00,000" },
  { course: "Online BBA in Human Resou...", spec: "Finance", level: "PG", duration: "2 Years", semFee: "₹ 1,25,000", annualFee: "₹ 25,00,000", totalFee: "₹ 25,00,000" },
  { course: "Online MBA in Human Reso...", spec: "Human Resources", level: "Diploma", duration: "1 Years", semFee: "₹ 1,25,000", annualFee: "₹ 25,00,000", totalFee: "₹ 25,00,000" }
];

function RecommendationsTab({ dbStudent }) {
  const [expandedCollegeIdx, setExpandedCollegeIdx] = useState(null);
  const [shortlistedCourses, setShortlistedCourses] = useState({});

  const toggleShortlist = (collegeIdx, courseIdx) => {
    const key = `${collegeIdx}-${courseIdx}`;
    setShortlistedCourses(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Profile Info Header for Recommendations */}
      <div className="flex w-full p-[12px] items-center justify-between bg-white border border-[#ECECEC] rounded-[8px] shadow-sm shrink-0">
        <div className="flex items-center gap-[16px]">
          {/* Orange silhouette avatar */}
          <span className="w-[48px] h-[48px] rounded-full bg-[#FDEFE3] flex items-center justify-center text-[#ED923D] font-bold text-[18px] shrink-0">
            {dbStudent.name.charAt(0)}
          </span>
          <div className="flex flex-col text-left">
            <h2 className="text-[20px] font-bold text-[#121212] leading-tight font-poppins">
              {dbStudent.name}
            </h2>
            <span className="text-[13px] text-[#808080] font-normal mt-0.5">
              {dbStudent.id}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="px-[12px] py-[6px] bg-[#F2F4F7] text-[#5B6B79] rounded-[6px] text-[13px] font-medium font-poppins">
            Source - WhatsApp
          </span>
          <span className="px-[12px] py-[6px] bg-[#F2F4F7] text-[#5B6B79] rounded-[6px] text-[13px] font-medium font-poppins">
            Campaign - No UTM
          </span>
        </div>
      </div>

      {/* Student Preferences Card */}
      <div className="flex w-full h-[158px] p-[12px] flex-col items-start gap-[16px] bg-white border border-[#ECECEC] rounded-[8px] shadow-sm shrink-0">
        <h3 className="text-[18px] font-medium text-[#121212] font-poppins leading-normal self-stretch mb-0">
          Student Preferences
        </h3>

        {/* 4 Column Grid layout */}
        <div className="grid grid-cols-4 gap-[12px] w-full items-center">
          
          {/* Stream field (Mock select with tags) */}
          <div className="relative flex items-center justify-between h-[38px] border border-[#CFD8DE] rounded-[8px] px-[8px] bg-white text-[13px] text-[#121212] font-poppins w-full select-none cursor-pointer">
            <div className="flex items-center gap-[6px] overflow-hidden whitespace-nowrap">
              <span className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#F2F4F7] rounded-[4px] text-[11px] font-medium text-[#5B6B79]">
                Agricul...
                <span className="text-[10px] text-[#8A96A0] hover:text-red-500">×</span>
              </span>
              <span className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#F2F4F7] rounded-[4px] text-[11px] font-medium text-[#5B6B79]">
                Inform...
                <span className="text-[10px] text-[#8A96A0] hover:text-red-500">×</span>
              </span>
              <span className="text-[#0D3B59] font-bold text-[12px] ml-[2px]">
                +2
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0">
              <path d="M2.66699 5.33325L8.00033 10.6666L13.3337 5.33325" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Select Degree */}
          <div className="relative w-full">
            <select className="w-full h-[38px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer">
              <option>Select Degree</option>
              <option>Online B.com</option>
              <option>Online BCA</option>
              <option>Online MBA</option>
            </select>
            <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
              {CHEVRON_DOWN_SVG}
            </span>
          </div>

          {/* Select Specialization */}
          <div className="relative w-full">
            <select className="w-full h-[38px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer">
              <option>Select Specialization</option>
              <option>ACCA</option>
              <option>Cloud Computing</option>
              <option>Data Science</option>
            </select>
            <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
              {CHEVRON_DOWN_SVG}
            </span>
          </div>

          {/* Preferred State */}
          <div className="relative w-full">
            <select className="w-full h-[38px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer">
              <option>Preferred State</option>
              <option>Punjab</option>
              <option>Uttar Pradesh</option>
              <option>Himachal Pradesh</option>
            </select>
            <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
              {CHEVRON_DOWN_SVG}
            </span>
          </div>

          {/* Preferred City */}
          <div className="relative w-full">
            <select className="w-full h-[38px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer">
              <option>Preferred City</option>
              <option>Ludhiana</option>
              <option>Noida</option>
              <option>Solan</option>
            </select>
            <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
              {CHEVRON_DOWN_SVG}
            </span>
          </div>

          {/* Select Mode */}
          <div className="relative w-full">
            <select className="w-full h-[38px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer">
              <option>Select Mode</option>
              <option>Online</option>
              <option>Distance</option>
            </select>
            <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
              {CHEVRON_DOWN_SVG}
            </span>
          </div>

          {/* Select Level */}
          <div className="relative w-full">
            <select className="w-full h-[38px] border border-[#CFD8DE] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#121212] font-poppins font-normal outline-none appearance-none cursor-pointer">
              <option>Select Level</option>
              <option>Diploma</option>
              <option>UG</option>
              <option>PG</option>
            </select>
            <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
              {CHEVRON_DOWN_SVG}
            </span>
          </div>

          {/* Save & Apply Button */}
          <button className="flex min-h-[32px] py-[6px] pl-[8px] pr-[12px] justify-center items-center gap-[4px] self-stretch rounded-[8px] border border-[#0D3B59] bg-white hover:bg-slate-50 text-[#0D3B59] text-[13px] font-semibold font-poppins cursor-pointer transition-colors w-full">
            {SAVE_ICON}
            <span>Save & Apply</span>
          </button>

        </div>
      </div>

      {/* Suggested Colleges Section */}
      <div className="flex flex-col gap-[12px] w-full shrink-0">
        
        {/* Section Title with count */}
        <div className="flex items-center gap-[8px] mb-[4px] mt-[8px]">
          <span className="text-[18px] font-medium text-[#121212] font-poppins leading-normal self-stretch">
            Suggested Colleges
          </span>
          <span className="text-[14px] text-[#808080] font-normal font-poppins">
            (120 Courses)
          </span>
        </div>

        {/* Colleges List */}
        <div className="flex flex-col gap-[12px] w-full">
          {SUGGESTED_COLLEGES.map((college, idx) => {
            const isExpanded = expandedCollegeIdx === idx;
            return (
              <div 
                key={`${college.name}-${idx}`}
                className="flex p-[16px] flex-col items-start gap-[16px] self-stretch rounded-[8px] border border-[#ECECEC] bg-white shadow-sm hover:shadow transition-all shrink-0"
              >
                {/* Header Row */}
                <div 
                  className="flex justify-between items-center w-full cursor-pointer select-none"
                  onClick={() => setExpandedCollegeIdx(isExpanded ? null : idx)}
                >
                  {/* Left Side: Logo & Info */}
                  <div className="flex items-center gap-[16px]">
                    {/* Logo Container */}
                    <div className="flex w-[82px] h-[56px] p-[8px] justify-center items-center gap-[10px] aspect-[41/28] rounded-[8px] border border-[#ECECEC] bg-white shrink-0">
                      {renderCollegeLogo(college.logoType)}
                    </div>
                    {/* College Info text */}
                    <div className="flex flex-col gap-[4px] text-left">
                      <span className="text-[15px] font-bold text-[#121212] font-poppins leading-tight">
                        {college.name}
                      </span>
                      {/* Location & Courses */}
                      <div className="flex items-center gap-[16px] text-[12px] text-[#717171] font-normal font-poppins">
                        <span className="flex items-center gap-[4px]">
                          {MAP_PIN_ICON}
                          {college.location}
                        </span>
                        <span className="flex items-center gap-[4px]">
                          {GRADUATION_CAP_ICON}
                          {college.courses}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Chevron */}
                  <div className="flex items-center shrink-0">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#717171" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`transition-transform duration-200 cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="flex flex-col gap-[16px] w-full self-stretch mt-[4px]">
                    
                    {/* Side-by-side containers for USPs and Eligibility */}
                    <div className="flex gap-[16px] w-full self-stretch items-stretch">
                      
                      {/* Universities USPs */}
                      <div className="flex p-[8px] px-[16px] flex-col items-start gap-[8px] flex-1 bg-[#F6F7F8] rounded-[8px]">
                        <span className="text-[14px] font-bold text-[#0D3B59] font-poppins leading-normal mb-[4px] block select-none">
                          Universities USPs
                        </span>
                        <ul className="flex flex-col gap-[6px] text-left list-none pl-0 m-0 w-full">
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Industry-Aligned Curriculum
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Industry-Aligned Curriculum
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Hands-On Project Experience
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Hands-On Project Experience
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Hands-On Project Experience
                          </li>
                        </ul>
                      </div>

                      {/* Eligibility Criteria */}
                      <div className="flex p-[8px] px-[16px] flex-col items-start gap-[8px] flex-1 bg-[#F6F7F8] rounded-[8px]">
                        <span className="text-[14px] font-semibold text-[#007B2D] font-poppins leading-normal mb-[4px] block select-none">
                          Eligibility Criteria
                        </span>
                        <ul className="flex flex-col gap-[6px] text-left list-none pl-0 m-0 w-full">
                          <li className="flex items-center gap-[8px] text-[14px] font-medium text-[#007B2D] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#007B2D] shrink-0"></span>
                            Minimum 50% Graduation Marks
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-medium text-[#007B2D] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#007B2D] shrink-0"></span>
                            Work Experience (If Applicable)
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-medium text-[#007B2D] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#007B2D] shrink-0"></span>
                            English Proficiency Requirement
                          </li>
                        </ul>
                      </div>

                    </div>

                    {/* Table showing the courses list */}
                    <div className="flex flex-col w-full rounded-[8px] overflow-hidden border border-[#ECECEC] bg-white">
                      
                      {/* Table Header Row */}
                      <div className="flex h-[50px] py-[12px] px-[16px] items-center gap-[16px] self-stretch bg-[#F6F7F8] border-b border-[#ECECEC] text-[13px] font-semibold text-[#121212] font-poppins text-left">
                        <span className="flex-[2] shrink-0">Course</span>
                        <span className="flex-[1.5] shrink-0">Specialization</span>
                        <span className="w-[90px] shrink-0">Level</span>
                        <span className="w-[70px] shrink-0">Duration</span>
                        <span className="w-[110px] shrink-0">Semester Fees</span>
                        <span className="w-[110px] shrink-0">Annual Fees</span>
                        <span className="w-[110px] shrink-0">Total Fees</span>
                        <span className="w-[100px] shrink-0 text-right pr-2">Shortlist</span>
                      </div>

                      {/* Table Body Rows */}
                      {MOCK_COURSES.map((courseItem, cIdx) => (
                        <div 
                          key={`${courseItem.course}-${cIdx}`}
                          className="flex h-[50px] py-[12px] px-[16px] items-center gap-[16px] self-stretch bg-white border-b border-[#ECECEC] last:border-b-0 text-[13px] font-normal text-[#121212] font-poppins text-left"
                        >
                          <span className="flex-[2] shrink-0 font-medium text-[#121212] overflow-hidden text-ellipsis whitespace-nowrap" title={courseItem.course}>
                            {courseItem.course}
                          </span>
                          <span className="flex-[1.5] shrink-0 text-[#121212]">
                            {courseItem.spec}
                          </span>
                          <span className="w-[90px] shrink-0 text-[#121212]">
                            {courseItem.level}
                          </span>
                          <span className="w-[70px] shrink-0 text-[#717171]">
                            {courseItem.duration}
                          </span>
                          <span className="w-[110px] shrink-0 text-[#717171]">
                            {courseItem.semFee}
                          </span>
                          <span className="w-[110px] shrink-0 text-[#717171]">
                            {courseItem.annualFee}
                          </span>
                          <span className="w-[110px] shrink-0 text-[#717171]">
                            {courseItem.totalFee}
                          </span>
                          <span className="w-[100px] shrink-0 flex justify-end">
                            <button 
                              onClick={() => toggleShortlist(idx, cIdx)}
                              className={`flex items-center gap-[8px] h-[30px] px-[12px] py-[6px] border rounded-[6px] text-[12px] font-medium transition-colors cursor-pointer select-none ${
                                shortlistedCourses[`${idx}-${cIdx}`]
                                  ? "border-[#007B2D] bg-[#E7F7EE] text-[#007B2D]"
                                  : "border-[#CFD8DE] bg-white text-[#5B6B79]"
                              }`}
                            >
                              <span className={`w-[14px] h-[14px] rounded-[3px] border flex items-center justify-center bg-white shrink-0 ${
                                shortlistedCourses[`${idx}-${cIdx}`] ? "border-[#007B2D]" : "border-[#CFD8DE]"
                              }`}>
                                {shortlistedCourses[`${idx}-${cIdx}`] && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#007B2D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                              </span>
                              <span>Shortlist</span>
                            </button>
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

const SHORTLISTED_COLLEGES = [
  {
    name: "Shoolini University online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses Shortlisted",
    logoType: "shoolini",
    buttonType: "technical"
  },
  {
    name: "Jaypee Institute of Information Technology, Noida",
    location: "Noida, Uttar Pradesh",
    courses: "8 Courses Shortlisted",
    logoType: "jiit",
    buttonType: "send"
  },
  {
    name: "Dr. D.Y Patil Vidhyapeeth Online",
    location: "Himachal Pradesh, Solan",
    courses: "10 Courses Shortlisted",
    logoType: "dypatil",
    buttonType: "donot"
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    courses: "12 Courses Shortlisted",
    logoType: "dtu",
    buttonType: "proceed"
  }
];

const renderShortlistButton = (type) => {
  switch (type) {
    case "technical":
      return (
        <span className="flex w-[130px] py-[4px] px-[12px] justify-center items-center gap-[8px] rounded-[4px] border border-[#ED923D] bg-[#FDF4EC] text-[#ED923D] text-[12px] font-normal leading-normal font-poppins mr-[16px] select-none shrink-0">
          Technical Issues
        </span>
      );
    case "send":
      return (
        <button className="flex py-[8px] px-[12px] items-center gap-[8px] rounded-[4px] bg-[#0D3B59] hover:bg-[#092c42] text-white text-[12px] font-normal leading-normal font-poppins mr-[16px] transition-colors cursor-pointer shrink-0">
          <span>Send Primary</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
            <path d="M15 3L8.4 9.6M8.4 9.6L3 7.2L15 3L10.8 15L8.4 9.6Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      );
    case "donot":
      return (
        <span className="flex w-[130px] py-[4px] px-[12px] justify-center items-center gap-[8px] rounded-[4px] border border-[#C2413A] bg-[#FFF5F5] text-[#C2413A] text-[12px] font-normal leading-normal font-poppins mr-[16px] select-none shrink-0">
          Do not Proceed
        </span>
      );
    case "proceed":
      return (
        <span className="flex w-[130px] py-[4px] px-[12px] justify-center items-center gap-[8px] rounded-[4px] border border-[#007B2D] bg-[rgba(0,123,45,0.1)] text-[#007B2D] text-[12px] font-normal leading-normal font-poppins mr-[16px] select-none shrink-0">
          Primary Proceed
        </span>
      );
    default:
      return null;
  }
};

function ShortlistedTab({ dbStudent }) {
  const [expandedCollegeIdx, setExpandedCollegeIdx] = useState(null);
  const [shortlistedCourses, setShortlistedCourses] = useState({});

  const toggleShortlist = (collegeIdx, courseIdx) => {
    const key = `${collegeIdx}-${courseIdx}`;
    setShortlistedCourses(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Shortlisted Colleges Section */}
      <div className="flex flex-col gap-[12px] w-full shrink-0">
        
        {/* Section Title with count */}
        <div className="flex items-center gap-[8px] mb-[4px] mt-[8px]">
          <span className="text-[18px] font-medium text-[#121212] font-poppins leading-normal self-stretch">
            Shortlisted Colleges & Courses
          </span>
          <span className="text-[14px] text-[#808080] font-normal font-poppins">
            (2 Courses)
          </span>
        </div>

        {/* Colleges List */}
        <div className="flex flex-col gap-[12px] w-full">
          {SHORTLISTED_COLLEGES.map((college, idx) => {
            const isExpanded = expandedCollegeIdx === idx;
            return (
              <div 
                key={`${college.name}-${idx}`}
                className="flex p-[16px] flex-col items-start gap-[16px] self-stretch rounded-[8px] border border-[#ECECEC] bg-white shadow-sm hover:shadow transition-all shrink-0"
              >
                {/* Header Row */}
                <div 
                  className="flex justify-between items-center w-full cursor-pointer select-none"
                  onClick={() => setExpandedCollegeIdx(isExpanded ? null : idx)}
                >
                  {/* Left Side: Logo & Info */}
                  <div className="flex items-center gap-[16px]">
                    {/* Logo Container */}
                    <div className="flex w-[82px] h-[56px] p-[8px] justify-center items-center gap-[10px] aspect-[41/28] rounded-[8px] border border-[#ECECEC] bg-white shrink-0">
                      {renderCollegeLogo(college.logoType)}
                    </div>
                    {/* College Info text */}
                    <div className="flex flex-col gap-[4px] text-left">
                      <span className="text-[15px] font-bold text-[#121212] font-poppins leading-tight">
                        {college.name}
                      </span>
                      {/* Location & Courses */}
                      <div className="flex items-center gap-[16px] text-[12px] text-[#717171] font-normal font-poppins">
                        <span className="flex items-center gap-[4px]">
                          {MAP_PIN_ICON}
                          {college.location}
                        </span>
                        <span className="flex items-center gap-[4px]">
                          {GRADUATION_CAP_ICON}
                          {college.courses}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Status Button & Chevron */}
                  <div className="flex items-center shrink-0">
                    {renderShortlistButton(college.buttonType)}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#717171" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`transition-transform duration-200 cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="flex flex-col gap-[16px] w-full self-stretch mt-[4px]">
                    
                    {/* Add Secondary Contact Section */}
                    <div className="flex flex-col items-start gap-[8px] w-full self-stretch">
                      <h4 className="text-[14px] font-semibold text-[#121212] font-poppins">
                        Add Secondary Contact <span className="text-[#DC2626]">*</span>
                      </h4>
                      <div className="flex w-full py-[24px] px-[16px] flex-col justify-center items-center gap-[12px] self-stretch rounded-[8px] border border-[#ECECEC] bg-white text-center">
                        <div className="w-[36px] h-[36px] bg-[#E7EEF2] rounded-full flex items-center justify-center text-[#0D3B59] shrink-0">
                          {SECONDARY_CONTACT_CALL_ICON}
                        </div>
                        <div className="flex flex-col gap-[4px] items-center">
                          <span className="text-[14px] font-medium text-[#121212] font-poppins leading-normal">
                            No Secondary Contact Added Yet
                          </span>
                          <span className="text-[12px] text-[#808080] font-poppins font-normal max-w-[400px]">
                            Primary contact failed. Add and send secondary contacts to proceed.
                          </span>
                        </div>
                        <button className="flex items-center justify-center gap-[8px] h-[36px] px-[16px] py-[8px] rounded-[8px] border border-[#0D3B59] bg-white hover:bg-slate-50 text-[#0D3B59] text-[14px] font-normal leading-normal font-poppins cursor-pointer transition-colors mt-[4px]">
                          {PLUS_ICON}
                          <span>Add Contact</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Side-by-side containers for USPs and Eligibility */}
                    <div className="flex gap-[16px] w-full self-stretch items-stretch">
                      
                      {/* Universities USPs */}
                      <div className="flex p-[8px] px-[16px] flex-col items-start gap-[8px] flex-1 bg-[#F6F7F8] rounded-[8px]">
                        <span className="text-[14px] font-bold text-[#0D3B59] font-poppins leading-normal mb-[4px] block select-none">
                          Universities USPs
                        </span>
                        <ul className="flex flex-col gap-[6px] text-left list-none pl-0 m-0 w-full">
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Industry-Aligned Curriculum
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Industry-Aligned Curriculum
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Hands-On Project Experience
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Hands-On Project Experience
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-normal text-[#0D3B59] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#0D3B59] shrink-0"></span>
                            Hands-On Project Experience
                          </li>
                        </ul>
                      </div>

                      {/* Eligibility Criteria */}
                      <div className="flex p-[8px] px-[16px] flex-col items-start gap-[8px] flex-1 bg-[#F6F7F8] rounded-[8px]">
                        <span className="text-[14px] font-semibold text-[#007B2D] font-poppins leading-normal mb-[4px] block select-none">
                          Eligibility Criteria
                        </span>
                        <ul className="flex flex-col gap-[6px] text-left list-none pl-0 m-0 w-full">
                          <li className="flex items-center gap-[8px] text-[14px] font-medium text-[#007B2D] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#007B2D] shrink-0"></span>
                            Minimum 50% Graduation Marks
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-medium text-[#007B2D] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#007B2D] shrink-0"></span>
                            Work Experience (If Applicable)
                          </li>
                          <li className="flex items-center gap-[8px] text-[14px] font-medium text-[#007B2D] font-poppins leading-normal">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#007B2D] shrink-0"></span>
                            English Proficiency Requirement
                          </li>
                        </ul>
                      </div>

                    </div>

                    {/* Table showing the courses list */}
                    <div className="flex flex-col w-full rounded-[8px] overflow-hidden border border-[#ECECEC] bg-white">
                      
                      {/* Table Header Row */}
                      <div className="flex h-[50px] py-[12px] px-[16px] items-center gap-[16px] self-stretch bg-[#F6F7F8] border-b border-[#ECECEC] text-[13px] font-semibold text-[#121212] font-poppins text-left">
                        <span className="flex-[2] shrink-0">Course</span>
                        <span className="flex-[1.5] shrink-0">Specialization</span>
                        <span className="w-[90px] shrink-0">Level</span>
                        <span className="w-[70px] shrink-0">Duration</span>
                        <span className="w-[110px] shrink-0">Semester Fees</span>
                        <span className="w-[110px] shrink-0">Annual Fees</span>
                        <span className="w-[110px] shrink-0">Total Fees</span>
                        <span className="w-[100px] shrink-0 text-left">Shortlist</span>
                      </div>

                      {/* Table Body Rows */}
                      {MOCK_COURSES.map((courseItem, cIdx) => (
                        <div 
                          key={`${courseItem.course}-${cIdx}`}
                          className="flex h-[50px] py-[12px] px-[16px] items-center gap-[16px] self-stretch bg-white border-b border-[#ECECEC] last:border-b-0 text-[13px] font-normal text-[#121212] font-poppins text-left"
                        >
                          <span className="flex-[2] shrink-0 font-medium text-[#121212] overflow-hidden text-ellipsis whitespace-nowrap" title={courseItem.course}>
                            {courseItem.course}
                          </span>
                          <span className="flex-[1.5] shrink-0 text-[#121212]">
                            {courseItem.spec}
                          </span>
                          <span className="w-[90px] shrink-0 text-[#121212]">
                            {courseItem.level}
                          </span>
                          <span className="w-[70px] shrink-0 text-[#717171]">
                            {courseItem.duration}
                          </span>
                          <span className="w-[110px] shrink-0 text-[#717171]">
                            {courseItem.semFee}
                          </span>
                          <span className="w-[110px] shrink-0 text-[#717171]">
                            {courseItem.annualFee}
                          </span>
                          <span className="w-[110px] shrink-0 text-[#717171]">
                            {courseItem.totalFee}
                          </span>
                          <span className="w-[100px] shrink-0 flex items-center justify-start">
                            {cIdx === 0 ? (
                              <span className="flex items-center gap-[8px] text-[#121212] font-poppins text-[14px] font-medium select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
                                  <circle cx="4" cy="4" r="4" fill="#0D3B59"/>
                                </svg>
                                <span>Shortlist</span>
                              </span>
                            ) : cIdx === 1 ? (
                              <span className="flex items-center gap-[8px] text-[#121212] font-poppins text-[14px] font-normal select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
                                  <circle cx="4" cy="4" r="4" fill="#007B2D"/>
                                </svg>
                                <span>Enrolled</span>
                              </span>
                            ) : cIdx === 2 ? (
                              <span className="flex items-center gap-[8px] text-[#121212] font-poppins text-[14px] font-normal select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
                                  <circle cx="4" cy="4" r="4" fill="#ED923D"/>
                                </svg>
                                <span>Application</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-[8px] text-[#121212] font-poppins text-[14px] font-normal select-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
                                  <circle cx="4" cy="4" r="4" fill="#3B82B1"/>
                                </svg>
                                <span>Admission</span>
                              </span>
                            )}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

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
      <div className="flex-1 h-full overflow-y-auto pt-[16px] pb-[40px] pl-[16px] pr-[16px] bg-[#F7F8FA] flex flex-col gap-[16px] relative no-scrollbar">
        
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
        ) : activeProfileTab === "Recommendations" ? (
          <RecommendationsTab dbStudent={dbStudent} />
        ) : activeProfileTab === "Shortlisted" ? (
          <ShortlistedTab dbStudent={dbStudent} />
        ) : (
          <div className="bg-white border border-[#E5E9EC] rounded-[12px] p-[24px] text-slate-500 font-medium w-[772px]">
            Tabs details will render here.
          </div>
        )}

      </div>

      {/* Right Column (Student Activity Sidebar) - docked, matches Figma full height specs */}
      {activeProfileTab === "Students Details" && (
        <div className="flex w-[372px] h-full flex-col items-start gap-[8px] p-[12px] bg-white border-l border-[#ECECEC] shrink-0 overflow-y-auto no-scrollbar">
        
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
    )}

    </div>
  );
}
