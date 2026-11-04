"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RHEUMATOLOGY_CONDITIONS, CONDITIONS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Activity, ArrowRight, Search, CheckCircle2 } from "lucide-react";

export default function RheumatologyConditionsDirectory() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");

  const conditionsList = RHEUMATOLOGY_CONDITIONS || CONDITIONS.filter((c) => c.category === "rheumatology");

  const filtered = conditionsList.filter((c) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = c.title.toLowerCase().includes(term);
    const titleHiMatch = c.titleHi ? c.titleHi.toLowerCase().includes(term) : false;
    const descMatch = c.shortDesc.toLowerCase().includes(term);
    return titleMatch || titleHiMatch || descMatch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <Link href="/rheumatology" className="hover:text-[#1CA7EC]">{t("Rheumatology", "रूमेटोलॉजी")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Conditions Directory", "बीमारियों की सूची")}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Evidence-Based Rheumatology", "प्रमाण-आधारित रूमेटोलॉजी")}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {t("Arthritis & Autoimmune Conditions", "गठिया एवं ऑटोइम्यून बीमारियां")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t(
                "Detailed scientific overviews, early warning signs, diagnostic criteria, and modern biological therapies for chronic rheumatological diseases.",
                "प्रमुख गठिया रोगों के लक्षण, जांच विधियां और आधुनिक बायोलॉजिकल उपचार।"
              )}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t("Search condition...", "बीमारी खोजें...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#1CA7EC]"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cond) => (
            <div
              key={cond.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-[11px] font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                  {cond.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{isHindi ? cond.titleHi : cond.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{isHindi ? cond.shortDescHi : cond.shortDesc}</p>

                {cond.symptoms && cond.symptoms.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-[#1F2F98] uppercase tracking-wider">
                      {t("Key Symptoms:", "मुख्य लक्षण:")}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {(isHindi && cond.symptomsHi ? cond.symptomsHi : cond.symptoms).slice(0, 2).map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1CA7EC] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => openBooking({ specialty: "rheumatology", condition: cond.title })}
                  className="flex-1 py-2 rounded-xl bg-[#F0F9FF] text-[#1F2F98] hover:bg-[#1CA7EC] hover:text-white font-bold text-xs transition-all border border-[#1CA7EC]/30"
                >
                  {t("Book Consultation", "परामर्श लें")}
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
    </div>
  );
}
