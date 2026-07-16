"use client";

import React, { useState } from "react";

// Exact user-specified avatar SVG (for Student ID)
const STUDENT_ID_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.6668 16V14.6667C12.6668 13.9594 12.3859 13.2811 11.8858 12.781C11.3857 12.281 10.7074 12 10.0002 12H6.00016C5.29292 12 4.61464 12.281 4.11454 12.781C3.61445 13.2811 3.3335 13.9594 3.3335 14.6667V16M12.6668 9.33333L14.0002 10.6667L16.6668 8M10.6668 6.66667C10.6668 8.13943 9.47292 9.33333 8.00016 9.33333C6.5274 9.33333 5.3335 8.13943 5.3335 6.66667C5.3335 5.19391 6.5274 4 8.00016 4C9.47292 4 10.6668 5.19391 10.6668 6.66667Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Exact user-specified Full Name input placeholder SVG
const FULL_NAME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15.1853 16.6666V15.1851C15.1853 14.3993 14.8731 13.6456 14.3175 13.09C13.7618 12.5343 13.0082 12.2221 12.2223 12.2221H7.7779C6.99208 12.2221 6.23844 12.5343 5.68277 13.09C5.12711 13.6456 4.81494 14.3993 4.81494 15.1851V16.6666M12.9631 6.29621C12.9631 7.93261 11.6365 9.25918 10.0001 9.25918C8.36373 9.25918 7.03716 7.93261 7.03716 6.29621C7.03716 4.65982 8.36373 3.33325 10.0001 3.33325C11.6365 3.33325 12.9631 4.65982 12.9631 6.29621Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Exact user-specified phone.no SVG
const PHONE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M8.60844 0.625C9.9715 0.768624 11.2447 1.37318 12.2175 2.33869C13.1903 3.3042 13.8045 4.57282 13.9583 5.93476M8.60844 3.29994C9.26615 3.42964 9.86969 3.75403 10.3407 4.23103C10.8118 4.70803 11.1285 5.3156 11.25 5.97489M13.9249 10.6026V12.6088C13.9257 12.7951 13.8875 12.9794 13.8129 13.1501C13.7383 13.3207 13.6289 13.4739 13.4916 13.5998C13.3544 13.7257 13.1923 13.8216 13.0159 13.8812C12.8395 13.9409 12.6525 13.9631 12.4671 13.9463C10.4092 13.7227 8.43257 13.0195 6.69586 11.8933C5.08008 10.8665 3.71018 9.49663 2.68345 7.88085C1.55327 6.13626 0.849936 4.14997 0.630428 2.08291C0.613717 1.89798 0.635694 1.7116 0.694961 1.53563C0.754228 1.35966 0.849486 1.19796 0.974671 1.06083C1.09985 0.923691 1.25222 0.814123 1.42207 0.739099C1.59192 0.664075 1.77553 0.62524 1.96121 0.625065H3.96742C4.29196 0.621871 4.60659 0.736796 4.85267 0.948421C5.09874 1.16004 5.25947 1.45393 5.30489 1.77529C5.38957 2.41732 5.54661 3.04771 5.77301 3.65444C5.86298 3.8938 5.88246 4.15393 5.82912 4.40401C5.77578 4.6541 5.65188 4.88365 5.47208 5.06547L4.62278 5.91477C5.57477 7.58898 6.96099 8.9752 8.6352 9.92718L9.48449 9.07789C9.66632 8.89809 9.89587 8.77418 10.146 8.72085C10.396 8.66751 10.6562 8.68698 10.8955 8.77696C11.5023 9.00336 12.1326 9.1604 12.7747 9.24507C13.0995 9.2909 13.3962 9.45452 13.6083 9.70483C13.8204 9.95513 13.933 10.2746 13.9249 10.6026Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Exact user-specified email placeholder SVG
const MAIL_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.6668 6.66675L10.6868 10.4667C10.481 10.5957 10.243 10.6641 10.0002 10.6641C9.75728 10.6641 9.51931 10.5957 9.3135 10.4667L3.3335 6.66675M4.66683 4.66675H15.3335C16.0699 4.66675 16.6668 5.2637 16.6668 6.00008V14.0001C16.6668 14.7365 16.0699 15.3334 15.3335 15.3334H4.66683C3.93045 15.3334 3.3335 14.7365 3.3335 14.0001V6.00008C3.3335 5.2637 3.93045 4.66675 4.66683 4.66675Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Close (X) icon SVG
const CLOSE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#121212" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function NewLeadModal({ show, onClose, onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [source, setSource] = useState("");
  const [studentId, setStudentId] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ fullName, phone, email, degree, source: source || "Student Ref", studentId });
    }
    // Clear form and close
    setFullName("");
    setPhone("");
    setEmail("");
    setDegree("");
    setSource("");
    setStudentId("");
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/25 z-40 cursor-default" 
        onClick={onClose}
      />

      {/* Modal Dialog Box: Width 753px, Padding 16px, gap 16px */}
      <div className="fixed inset-0 m-auto w-[753px] h-auto max-h-[90vh] bg-white border border-[#CFD8DE] rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 flex flex-col items-center gap-[16px] p-[16px] font-poppins select-none text-left overflow-y-auto no-scrollbar">
        
        {/* Header row */}
        <div className="flex items-center justify-between w-full pb-[12px] border-b border-[#E5E9EC] shrink-0">
          <span className="font-poppins text-[18px] font-medium text-[#121212] leading-none">
            Add New Lead
          </span>
          <button 
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {CLOSE_ICON}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[16px]">
          
          {/* Row 1: Full Name and Phone no. */}
          <div className="flex gap-[16px] w-full">
            {/* Full Name */}
            <div className="flex-1 flex flex-col gap-[6px]">
              <span className="text-[13px] font-semibold text-[#121212]">
                Full Name
              </span>
              <div className="relative flex items-center w-full h-[40px] border border-[#CFD8DE] rounded-[8px] px-3 bg-white focus-within:border-[#0D3B59] transition-colors">
                <span className="mr-2 shrink-0">{FULL_NAME_ICON}</span>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="example@gmail.com" 
                  className="w-full text-[14px] text-[#121212] font-normal outline-none bg-transparent placeholder-slate-400"
                />
              </div>
            </div>

            {/* Phone no. */}
            <div className="flex-1 flex flex-col gap-[6px]">
              <span className="text-[13px] font-semibold text-[#121212]">
                Phone no.
              </span>
              <div className="relative flex items-center w-full h-[40px] border border-[#CFD8DE] rounded-[8px] px-3 bg-white focus-within:border-[#0D3B59] transition-colors">
                <span className="mr-2 shrink-0">{PHONE_ICON}</span>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="1234567890" 
                  className="w-full text-[14px] text-[#121212] font-normal outline-none bg-transparent placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Email Address */}
          <div className="flex flex-col gap-[6px] w-full">
            <span className="text-[13px] font-semibold text-[#121212]">
              Email Address
            </span>
            <div className="relative flex items-center w-full h-[40px] border border-[#CFD8DE] rounded-[8px] px-3 bg-white focus-within:border-[#0D3B59] transition-colors">
              <span className="mr-2 shrink-0">{MAIL_ICON}</span>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com" 
                className="w-full text-[14px] text-[#121212] font-normal outline-none bg-transparent placeholder-slate-400"
              />
            </div>
          </div>

          {/* Row 3: Preferred Degrees */}
          <div className="flex flex-col gap-[6px] w-full">
            <span className="text-[13px] font-semibold text-[#121212]">
              Preferred Degrees <span className="text-red-500">*</span>
            </span>
            <select 
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="w-full border border-[#CFD8DE] rounded-[8px] px-3 py-[9px] bg-white text-[14px] text-[#121212] font-normal outline-none appearance-none cursor-pointer h-[40px]"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
            >
              <option value="">Select Degrees</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="MBA Marketing">MBA Marketing</option>
              <option value="BBA Finance">BBA Finance</option>
              <option value="B.CA Data Science">B.CA Data Science</option>
            </select>
          </div>

          {/* Row 4: Source (grey background, student ref text) */}
          <div className="flex flex-col gap-[6px] w-full">
            <span className="text-[13px] font-semibold text-[#121212]">
              Source
            </span>
            <input 
              type="text" 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Student Ref" 
              className="w-full h-[40px] border border-[#CFD8DE] rounded-[8px] px-3 bg-[#F2F4F7] text-[14px] text-[#121212] font-poppins font-normal leading-normal outline-none placeholder-[#121212]"
            />
          </div>

          {/* Row 5: Student ID */}
          <div className="flex flex-col gap-[6px] w-full">
            <span className="text-[13px] font-semibold text-[#121212]">
              Student ID
            </span>
            <div className="relative flex items-center w-full h-[40px] border border-[#CFD8DE] rounded-[8px] px-3 bg-white focus-within:border-[#0D3B59] transition-colors">
              <span className="mr-2 shrink-0">{STUDENT_ID_ICON}</span>
              <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="STD-89EABBCF" 
                className="w-full text-[14px] text-[#121212] font-normal outline-none bg-transparent placeholder-slate-400"
              />
            </div>
          </div>

          {/* Centered Submit button */}
          <button 
            type="submit"
            className="mt-2 h-[40px] px-[24px] bg-[#0D3B59] hover:bg-[#092c42] text-white rounded-[8px] text-[14px] font-medium transition-colors cursor-pointer self-center"
          >
            Submit
          </button>

        </form>

      </div>
    </>
  );
}
