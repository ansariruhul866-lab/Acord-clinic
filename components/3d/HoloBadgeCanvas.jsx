"use client";
import React, { useState } from "react";
import { AcordHoloCard } from "@/components/effects/acord-holo-card/AcordHoloCard";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";

export const HoloBadgeCanvas = () => {
  const { isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedVariant, setSelectedVariant] = useState("clinic");

  const variants = [
    {
      id: "clinic",
      name: "ACORD",
      nameHi: "एकॉर्ड",
      sub: "Centre",
      subHi: "सेंटर",
    },
    {
      id: "dr-aakash",
      name: "Dr. Aakash",
      nameHi: "डॉ. आकाश",
      sub: "Rheumatology",
      subHi: "गठिया विभाग",
    },
    {
      id: "dr-ankita",
      name: "Dr. Ankita",
      nameHi: "डॉ. अंकिता",
      sub: "Dermatology",
      subHi: "त्वचा विभाग",
    },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
      {/* 3D Holographic Card Viewport with ThreeUI Engine */}
      <div className="w-full relative">
        <AcordHoloCard
          variant={selectedVariant}
          onBook={(v) => {
            openBooking({
              specialty: v.includes("ankita") ? "dermatology" : "rheumatology",
            });
          }}
        />
      </div>

      {/* Symmetrical 3-Column Segmented Tab Bar */}
      <div className="w-full max-w-[315px] sm:max-w-[365px] mt-3 z-20">
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {variants.map((v) => {
            const isSelected = selectedVariant === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v.id)}
                className={`py-2 px-1 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center active:scale-95 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white shadow-sm ring-1 ring-[#1CA7EC]/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                aria-pressed={isSelected}
              >
                <span className="text-[11px] sm:text-xs font-black truncate w-full">
                  {isHindi ? v.nameHi : v.name}
                </span>
                <span
                  className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold ${
                    isSelected ? "text-cyan-100" : "text-slate-400"
                  }`}
                >
                  {isHindi ? v.subHi : v.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HoloBadgeCanvas;
