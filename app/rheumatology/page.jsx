"use client";
import React from "react";
import Link from "next/link";
import { CONDITIONS, DOCTORS, RHEUMATOLOGY_CONDITIONS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { ArrowRight, Activity } from "lucide-react";
import SymptomFinder from "@/components/SymptomFinder";

export default function RheumatologyPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const drAakash = DOCTORS.find((d) => d.id === "dr-aakash");
  const rheumConditions = RHEUMATOLOGY_CONDITIONS || CONDITIONS.filter((c) => c.category === "rheumatology");

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Rheumatology & Immunology</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Super-Speciality Arthritis & Autoimmunity", "सुपर-स्पेशलिटी गठिया एवं ऑटोइम्यून सेंटर")}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t("Rheumatology, Arthritis & Autoimmune Disease Centre", "गठिया, ल्यूपस एवं ऑटोइम्यून रोग विशेष केंद्र")}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {t(
                "Led by Dr. Aakash Singh (DM Rheumatology & Clinical Immunology, AIR 1 PGIMER Chandigarh). Delivering targeted biological infusions, early arthritis reversal, and ultrasound-guided joint care across Purvanchal and Bihar.",
                "डॉ. आकाश सिंह (DM रूमेटोलॉजी, AIR 1 पीजीआईएमईआर चंडीगढ़) के मार्गदर्शन में बायोलॉजिकल थेरेपी एवं मस्कुलोस्केलेटल अल्ट्रासाउंड द्वारा गठिया का सटीक निवारण।"
              )}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openBooking({ specialty: "rheumatology", doctor: "dr-aakash" })}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md shadow-[#1CA7EC]/20"
              >
                {t("Book Rheumatology Consultation", "गठिया परामर्श बुक करें")}
              </button>
              <Link
                href="/doctors/dr-aakash-singh"
                className="px-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>{t("Dr. Aakash's Profile", "डॉ. आकाश का प्रोफाइल")}</span>
                <ArrowRight className="w-4 h-4 text-[#1CA7EC]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            {drAakash && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={drAakash.image} alt={drAakash.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{isHindi ? drAakash.nameHi : drAakash.name}</h3>
                  <p className="text-xs text-[#1CA7EC] font-semibold">{isHindi ? drAakash.roleHi : drAakash.role}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{drAakash.degrees}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conditions Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {t("Conditions We Diagnose & Treat", "प्रमुख गठिया एवं ऑटोइम्यून रोग")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {t("Treat-to-target protocols with >85% clinical remission rates.", "समय पर जांच और लक्षित इलाज से जोड़ों की विकृति से पूर्ण बचाव।")}
              </p>
            </div>
            <Link
              href="/rheumatology/conditions"
              className="text-xs font-semibold text-[#1CA7EC] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{t("View All Conditions", "सभी बीमारियां देखें")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rheumConditions.slice(0, 6).map((cond) => (
              <div key={cond.id} className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-[11px] font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                    {cond.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{isHindi ? cond.titleHi : cond.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{isHindi ? cond.shortDescHi : cond.shortDesc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => openBooking({ specialty: "rheumatology", condition: cond.title })}
                    className="flex-1 py-2 rounded-xl bg-[#F0F9FF] text-[#1F2F98] hover:bg-[#1CA7EC] hover:text-white font-bold text-xs transition-all border border-[#1CA7EC]/30"
                  >
                    {t("Consult Specialist", "परामर्श लें")}
                  </button>
                  <Link
                    href={`/rheumatology/conditions/${cond.slug}`}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-[#1CA7EC]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Symptom Finder */}
        <div className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t("Check Your Joint & Muscle Symptoms", "लक्षणों के आधार पर जांच करें")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t("Select your symptoms below for an instant preliminary triage and guidance.", "अपने मुख्य लक्षण चुनें और तुरंत विशेषज्ञ परामर्श की आवश्यकता जानें।")}
            </p>
          </div>
          <SymptomFinder />
        </div>
      </div>
    </div>
  );
}
