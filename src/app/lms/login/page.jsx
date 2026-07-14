"use client";

import { useState } from "react";
import Image from "next/image";

const ROLES = ["Counselor", "Supervisor", "Analyzer"];

export default function LmsLoginPage() {
  const [role, setRole] = useState("Counselor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to auth API — POST { role, email, password }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col items-center">
      {/* top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#0D3B59]" />

      {/* decorative swirl — top right */}
      <svg
     className="absolute top-[70px] right-[60px] opacity-80 pointer-events-none select-none scale-x-[-1]"
     width="132"
     height="105"
     viewBox="0 0 135 108"
     fill="none"
   >
  <path
    d="M133.5 39.8363C129.574 14.6471 117.353 -4.91572 88.3457 3.46816C66.0005 9.92656 51.707 39.9727 67.5679 59.7103C71.3681 64.4394 79.8389 63.7125 84.679 61.0623C92.3358 56.8699 94.1599 49.4967 91.9445 41.3235C87.92 26.476 71.4017 11.6393 55.142 16.3119C29.6969 23.6242 17.0505 49.3027 14.4691 73.9737C13.9549 78.8879 16.3281 115.819 21.6666 95.7404C22.6355 92.0965 25.1045 81.0782 23.9074 84.6543C21.9225 90.5835 21.0555 93.9973 21.0555 100.405C21.0555 101.677 21.9896 108.325 19.1543 106.015C13.3491 101.287 7.20522 97.0262 1.5 92.1577"
    stroke="#E7EBEE"
    strokeWidth="3"
    strokeLinecap="round"
      />
     </svg>

      {/* decorative swirl — bottom left */}
      <svg
        className="absolute bottom-[90px] left-[60px] w-[110px] h-[88px] opacity-80 pointer-events-none select-none"
        viewBox="0 0 135 108"
        fill="none"
      >
        <path
          d="M133.5 39.8363C129.574 14.6471 117.353 -4.91572 88.3457 3.46816C66.0005 9.92656 51.707 39.9727 67.5679 59.7103C71.3681 64.4394 79.8389 63.7125 84.679 61.0623C92.3358 56.8699 94.1599 49.4967 91.9445 41.3235C87.92 26.476 71.4017 11.6393 55.142 16.3119C29.6969 23.6242 17.0505 49.3027 14.4691 73.9737C13.9549 78.8879 16.3281 115.819 21.6666 95.7404C22.6355 92.0965 25.1045 81.0782 23.9074 84.6543C21.9225 90.5835 21.0555 93.9973 21.0555 100.405C21.0555 101.677 21.9896 108.325 19.1543 106.015C13.3491 101.287 7.20522 97.0262 1.5 92.1577"
          stroke="#E7EBEE"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* logo + heading */}
      <div className="flex flex-col items-center mt-[80px] mb-[48px]">
        <Image
          src="/logo.png"
          alt="DegreeFYD Logo"
          width={140}
          height={40}
          priority
          style={{ objectFit: "contain" }}
        />
        <h1 className="mt-3 text-[16px] text-[#1A1A1A]">
          Log in to your LMS Account
        </h1>
      </div>

      {/* card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[464px] rounded-[12px] border border-[#E5E9EC] bg-white p-[24px] shadow-[0_4px_20px_rgba(13,59,89,0.06)]"
      >
        {/* role tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F4F6] rounded-[8px] mb-[24px]">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 h-[36px] rounded-[6px] text-[14px] font-medium transition-colors ${
                role === r
                  ? "bg-white text-[#0D3B59] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#717171] hover:text-[#0D3B59]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* email */}
        <label className="block text-[13px] font-medium text-[#1A1A1A] mb-[8px]">
          Email address
        </label>
        <div className="flex items-center gap-[8px] h-[44px] px-[12px] w-full border border-[#CFD8DE] rounded-[8px] bg-white focus-within:border-[#0D3B59] transition-colors mb-[16px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 8.0001L12.824 12.5601C12.577 12.7148 12.2915 12.7969 12 12.7969C11.7085 12.7969 11.423 12.7148 11.176 12.5601L4 8.0001M5.6 5.6001H18.4C19.2837 5.6001 20 6.31644 20 7.2001V16.8001C20 17.6838 19.2837 18.4001 18.4 18.4001H5.6C4.71634 18.4001 4 17.6838 4 16.8001V7.2001C4 6.31644 4.71634 5.6001 5.6 5.6001Z"
              stroke="#717171"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-[14px] outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
        </div>

        {/* password */}
        <label className="block text-[13px] font-medium text-[#1A1A1A] mb-[8px]">
          Password
        </label>
        <div className="flex items-center gap-[8px] h-[44px] px-[12px] w-full border border-[#CFD8DE] rounded-[8px] bg-white focus-within:border-[#0D3B59] transition-colors mb-[16px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.9998 11.2V8C7.9998 6.93913 8.42123 5.92172 9.17138 5.17157C9.92152 4.42143 10.9389 4 11.9998 4C13.0607 4 14.0781 4.42143 14.8282 5.17157C15.5784 5.92172 15.9998 6.93913 15.9998 8V11.2M6.3998 11.2H17.5998C18.4835 11.2 19.1998 11.9163 19.1998 12.8V18.4C19.1998 19.2837 18.4835 20 17.5998 20H6.3998C5.51615 20 4.7998 19.2837 4.7998 18.4V12.8C4.7998 11.9163 5.51615 11.2 6.3998 11.2Z"
              stroke="#717171"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 text-[14px] outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-[#717171] hover:text-[#0D3B59] transition-colors"
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M6.6 6.6C4.4 8 2.9 10 2 12c0 0 3.5 7 10 7 1.9 0 3.5-.45 4.9-1.1M9.9 4.24A10.8 10.8 0 0112 4c6.5 0 10 7 10 7-.4.8-1.1 1.9-2.1 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* remember me */}
        <label className="flex items-center gap-2 mb-[24px] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-[#CFD8DE] text-[#0D3B59] focus:ring-[#0D3B59]"
          />
          <span className="text-[13px] text-[#4B5563]">Remember me</span>
        </label>

        {/* submit */}
        <button
          type="submit"
          className="w-full h-[44px] bg-[#0D3B59] hover:bg-[#092c42] text-white rounded-[8px] font-semibold text-[15px] transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  );
}