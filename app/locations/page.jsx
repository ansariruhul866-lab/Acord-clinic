"use client";
import React from "react";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { MapPin, Phone, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LocationsHubPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  const branches = Array.isArray(CLINIC_INFO.branches)
    ? CLINIC_INFO.branches
    : Object.values(CLINIC_INFO.branches);

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Clinic Locations</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Super-Speciality Centres</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("ACORD Super-Speciality Clinics", "हमारी क्लिनिक शाखाएं")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t(
              "Visit our state-of-the-art super-speciality centres in Gorakhpur (Uttar Pradesh) and Bhagalpur (Bihar).",
              "गोरखपुर और भागलपुर स्थित हमारी अत्याधुनिक क्लिनिक शाखाओं में संपर्क करें।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {branches.map((b) => (
            <div
              key={b.id || b.slug}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#1CA7EC] transition-all shadow-sm hover:shadow-md"
            >
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                    {b.state || (b.id === "gorakhpur" ? "Uttar Pradesh" : "Bihar")}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Super-Speciality</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    ACORD Clinics — {isHindi && b.cityHi ? b.cityHi : b.city}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isHindi && b.addressHi ? b.addressHi : b.address}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1CA7EC]" />
                    <span>{isHindi && b.hoursHi ? b.hoursHi : (b.hours || b.timings)}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[#1F2F98] font-bold text-sm">
                    <Phone className="w-4 h-4 text-[#1CA7EC]" />
                    <a href={`tel:${b.phone}`} className="hover:underline">
                      {b.phoneDisplay || b.phone}
                    </a>
                  </div>
                </div>

                {b.featuredServices && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-[#1F2F98]">
                      Featured Services:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      {b.featuredServices.map((srv, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1CA7EC] shrink-0" />
                          <span className="line-clamp-1">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                  <button
                    onClick={() => openBooking({ branch: b.id || b.slug })}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs hover:opacity-95 transition-all shadow-sm"
                  >
                    {t(`Book at ${b.city}`, `${b.city} में बुक करें`)}
                  </button>
                  <Link
                    href={`/locations/${b.slug || b.id}`}
                    className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>{t("Branch Details", "शाखा विवरण")}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1CA7EC]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
