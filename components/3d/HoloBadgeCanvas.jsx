"use client";
import React, { useState } from "react";
import { AcordHoloCard } from "@/components/effects/acord-holo-card/AcordHoloCard";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Sparkles, ShieldCheck } from "lucide-react";

export const HoloBadgeCanvas = () => {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedVariant, setSelectedVariant] = useState("clinic");

  const variants = [
    { id: "clinic", label: "ACORD Badge", labelHi: "एकॉर्ड बैज" },
    { id: "dr-aakash", label: "Dr. Aakash (Rheum)", labelHi: "डॉ. आकाश (गठिया)" },
    { id: "dr-ankita", label: "Dr. Ankita (Derm)", labelHi: "डॉ. अंकिता (त्वचा)" },
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

      {/* Interactive Variant Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 border border-[#13BEB5]/30 shadow-md mt-4 z-20 backdrop-blur-md">
        {variants.map((v) => {
          const isSelected = selectedVariant === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-gradient-to-r from-[#1F2F98] to-[#13BEB5] text-white shadow-md shadow-[#13BEB5]/25"
                  : "text-slate-600 hover:text-[#114E3F] hover:bg-slate-100"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? "bg-[#89EAD7] animate-pulse" : "bg-slate-300"
                }`}
              />
              <span>{isHindi ? v.labelHi : v.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HoloBadgeCanvas;
