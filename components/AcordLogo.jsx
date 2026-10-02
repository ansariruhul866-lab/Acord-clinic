import React from "react";
import Image from "next/image";

export const AcordLogo = ({
  className = "",
  size = 60,
  showText = true,
  variant = "default", // 'default' | 'light' | 'dark'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Circular Four-Quadrant Logo Image without artificial outline */}
      <div
        className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105 shrink-0"
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src="/images/acord-logo.png"
          alt="ACORD Clinics Official Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-display tracking-wider text-2xl md:text-3xl font-black text-slate-900 leading-none">
              <span className="text-[#1CA7EC]">A</span>
              <span className="text-[#1F2F98]">C</span>
              <span className="text-[#4ADEDE]">O</span>
              <span className="text-[#1AA7EC]">R</span>
              <span className="text-[#1F2F98]">D</span>
            </span>
            <span className="text-[11px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-[#F0F9FF] text-[#1F2F98] border border-[#1CA7EC]/30 leading-none">
              CLINICS
            </span>
          </div>
          <span className="text-xs md:text-sm text-slate-600 font-medium tracking-tight leading-snug">
            Rheumatology · Immunology · Dermatology
          </span>
        </div>
      )}
    </div>
  );
};

export default AcordLogo;
