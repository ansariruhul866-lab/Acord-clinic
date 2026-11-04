"use client";
import React from "react";
import Link from "next/link";
import { TECHNOLOGIES } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Microscope, ShieldCheck, Calendar } from "lucide-react";

export default function TechnologyPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Technology & Devices", "तकनीक एवं उपकरण")}</span>
        </div>

        {/* Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Microscope className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Advanced Clinical Infrastructure", "उन्नत क्लिनिकल इंफ्रास्ट्रक्चर")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("World-Class Technology & Clinical Equipment", "विश्वस्तरीय लेजर, डायग्नोस्टिक एवं इन्फ्यूजन तकनीक")}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {t(
              "We have equipped our Gorakhpur and Bhagalpur centres with gold-standard international laser suites (Spain, South Korea), MSK ultrasound, cold-chain biologics, and on-site biopsy laboratories.",
              "स्पेन और दक्षिण कोरिया के अत्याधुनिक लेजर, मस्कुलोस्केलेटल अल्ट्रासाउंड और इन-हाउस कोल्ड-चेन बायोलॉजिकल सुइट।"
            )}
          </p>

          <button
            onClick={() => openBooking()}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{t("Book a Consultation", "परामर्श बुक करें")}</span>
          </button>
        </div>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNOLOGIES.map((tech) => (
            <div
              key={tech.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-[11px] font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                  {isHindi && tech.categoryHi ? tech.categoryHi : tech.category}
                </span>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {isHindi ? tech.titleHi : tech.title}
                </h2>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-[#1F2F98] font-bold">
                  {isHindi && tech.specHi ? tech.specHi : tech.spec}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi ? tech.descHi : tech.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1CA7EC]">
                <span>{t("Certified Clinical Device", "प्रमाणित क्लिनिकल उपकरण")}</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
