"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import SymptomFinder from "@/components/SymptomFinder";
import { Activity } from "lucide-react";

export default function RheumatologySymptomFinderPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <Link href="/rheumatology" className="hover:text-[#1CA7EC]">Rheumatology</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Symptom Checker</span>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Interactive Clinical Triage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Joint & Autoimmune Symptom Checker", "जोड़ों एवं ऑटोइम्यून लक्षण जांच")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(
              "Select your active signs below to identify whether you should consult a Rheumatologist immediately.",
              "अपने लक्षणों को चुनें और तुरंत विशेषज्ञ परामर्श की आवश्यकता का आकलन करें।"
            )}
          </p>
        </div>

        <SymptomFinder />
      </div>
    </div>
  );
}
