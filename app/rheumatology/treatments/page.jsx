"use client";
import React from "react";
import Link from "next/link";
import { TREATMENTS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Activity } from "lucide-react";

export default function RheumatologyTreatmentsPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  const rheumTreatments = TREATMENTS.filter(
    (t) => t.category === "rheumatology" || t.category === "immunology" || t.category === "infusion"
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <Link href="/rheumatology" className="hover:text-[#1CA7EC]">Rheumatology</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Treatments & Therapies</span>
        </div>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Targeted Biologics & DMARDs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Modern Rheumatology Therapies", "आधुनिक गठिया उपचार विधियां")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t(
              "Evidence-based disease-modifying anti-rheumatic drugs (DMARDs), targeted monoclonal antibodies, and ultrasound-guided interventions.",
              "बायोलॉजिकल थेरेपी, जेएके इन्हिबिटर्स और सटीक जोड़ों के इंजेक्शन द्वारा सुरक्षित रोग निवारण।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rheumTreatments.map((tr) => (
            <div
              key={tr.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-[11px] font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                  {tr.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{isHindi ? tr.nameHi : tr.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{isHindi ? tr.descriptionHi : tr.description}</p>
                <div className="space-y-1 text-xs text-slate-500">
                  <p><span className="text-slate-700 font-semibold">Sessions:</span> {tr.sessions}</p>
                  <p><span className="text-slate-700 font-semibold">Downtime:</span> {tr.downtime}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => openBooking({ specialty: "rheumatology", treatment: tr.name })}
                  className="flex-1 py-2 rounded-xl bg-[#F0F9FF] text-[#1F2F98] hover:bg-[#1CA7EC] hover:text-white font-bold text-xs transition-all border border-[#1CA7EC]/30"
                >
                  {t("Book Consultation", "परामर्श लें")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
