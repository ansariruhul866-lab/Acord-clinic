"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TESTIMONIALS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Star } from "lucide-react";

export default function TestimonialsPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Rheumatology", "Dermatology", "Hair Restoration"];

  const filtered =
    filter === "All"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((item) => item.specialty === filter);

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Patient Testimonials & Reviews", "मरीजों के अनुभव एवं समीक्षाएं")}</span>
        </div>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>{t("4.9 ★ Rated by Patients", "मरीजों द्वारा 4.9 ★ रेटिंग")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Real Stories from Real Patients", "मरीजों के वास्तविक अनुभव एवं समीक्षाएं")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(
              "Read authentic patient reviews from Gorakhpur, Bhagalpur, Deoria, and across Purvanchal & Bihar.",
              "गोरखपुर, भागलपुर और पूर्वांचल के मरीजों के प्रामाणिक अनुभव।"
            )}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "All", labelEn: "All", labelHi: "सभी" },
              { id: "Rheumatology", labelEn: "Rheumatology", labelHi: "रूमेटोलॉजी" },
              { id: "Dermatology", labelEn: "Dermatology", labelHi: "डर्मेटोलॉजी" },
              { id: "Hair Restoration", labelEn: "Hair Restoration", labelHi: "हेयर ट्रांसप्लांट" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat.id
                    ? "bg-[#1F2F98] text-white shadow-md shadow-[#1CA7EC]/20"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-5 hover:border-[#1CA7EC] transition-all shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-50 font-mono text-[10px] text-slate-500 border border-slate-200">
                    {item.source || "Google Review"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{isHindi ? item.commentHi : (item.commentEn || item.comment)}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm sm:text-base">{item.patientName || item.name}</div>
                <div className="text-xs text-[#1CA7EC] font-semibold">{item.treatmentTaken || item.treatment}</div>
                <div className="text-[11px] text-slate-400">{item.location}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            {t("Experience the ACORD Standard of Care", "विश्वस्तरीय चिकित्सा अनुभव का लाभ उठाएं")}
          </h3>
          <button
            onClick={() => openBooking()}
            className="py-3 px-8 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
          >
            {t("Book Your Specialist Slot", "अपॉइंटमेंट बुक करें")}
          </button>
        </div>
      </div>
    </div>
  );
}
