"use client";
import React from "react";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Sparkles } from "lucide-react";

export default function ResultsGalleryPage() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Clinical Results Gallery</span>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Verified Patient Outcomes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Clinical Transformations", "उपचार परिणाम एवं परिवर्तन")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(
              "Slide to inspect real before & after patient transformations treated under Dr. Ankita Pundir and Dr. Aakash Singh.",
              "डॉक्टरों द्वारा उपचारित वास्तविक मरीजों के परिणाम। व्यक्तिगत परिणाम भिन्न हो सकते हैं।"
            )}
          </p>
        </div>

        {/* Before After Interactive Section */}
        <div className="max-w-2xl mx-auto">
          <BeforeAfterSlider />
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => openBooking()}
            className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
          >
            {t("Start Your Clinical Transformation →", "अपना उपचार परामर्श बुक करें →")}
          </button>
        </div>
      </div>
    </div>
  );
}
