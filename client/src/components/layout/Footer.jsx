import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 border-t border-slate-200 bg-white text-center text-[12px] text-slate-400 font-poppins shrink-0">
      &copy; {new Date().getFullYear()} DegreeFYD. All rights reserved.
    </footer>
  );
}
