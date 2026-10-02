"use client";
import React from "react";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { MapPin, Phone, MessageCircle, Clock, Calendar } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  const branches = Array.isArray(CLINIC_INFO.branches)
    ? CLINIC_INFO.branches
    : Object.values(CLINIC_INFO.branches);

  const gkp = branches.find((b) => b.id === "gorakhpur") || branches[0];
  const bgp = branches.find((b) => b.id === "bhagalpur") || branches[1] || branches[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Contact & Clinic Locations</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Direct Contact", "सीधा संपर्क")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Get in Touch with ACORD Clinics", "ACORD क्लिनिक से संपर्क करें")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t(
              "Speak directly with our clinic desk coordinators for appointment booking, report queries, or patient navigation.",
              "अपॉइंटमेंट, जांच रिपोर्ट या क्लिनिक के पते के लिए हमारे हेल्पडेस्क से तुरंत संपर्क करें।"
            )}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gorakhpur */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase border border-[#1CA7EC]/20">
                  Flagship Super-Speciality Centre
                </span>
                <span className="text-xs text-slate-500 font-medium">Uttar Pradesh</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Gorakhpur Clinic</h2>
                <p className="text-xs text-[#1CA7EC] font-semibold mt-0.5">Purvanchal Regional Hub</p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1CA7EC] shrink-0 mt-1" />
                  <span>{gkp.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#1CA7EC] shrink-0" />
                  <a href={`tel:${gkp.phone}`} className="hover:text-[#1F2F98] font-mono font-bold">
                    {gkp.phoneDisplay || gkp.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1CA7EC] shrink-0" />
                  <span>{gkp.hours || gkp.timings}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                onClick={() => openBooking({ branch: "gorakhpur" })}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Gorakhpur</span>
              </button>
              <a
                href={`https://wa.me/${gkp.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs hover:bg-[#25D366]/20 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Bhagalpur */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase border border-[#1CA7EC]/20">
                  Super-Speciality Centre
                </span>
                <span className="text-xs text-slate-500 font-medium">Bihar</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Bhagalpur Clinic</h2>
                <p className="text-xs text-[#1CA7EC] font-semibold mt-0.5">Bihar & Jharkhand Hub</p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1CA7EC] shrink-0 mt-1" />
                  <span>{bgp.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#1CA7EC] shrink-0" />
                  <a href={`tel:${bgp.phone}`} className="hover:text-[#1F2F98] font-mono font-bold">
                    {bgp.phoneDisplay || bgp.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1CA7EC] shrink-0" />
                  <span>{bgp.hours || bgp.timings}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                onClick={() => openBooking({ branch: "bhagalpur" })}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Bhagalpur</span>
              </button>
              <a
                href={`https://wa.me/${bgp.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs hover:bg-[#25D366]/20 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Global Support Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900">Central Patient Email & Inquiries</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              For academic partnerships, clinical trial inquiries, or second opinions: <span className="text-[#1F2F98] font-mono font-bold">{CLINIC_INFO.email}</span>
            </p>
          </div>
          <a
            href={`mailto:${CLINIC_INFO.email}`}
            className="px-6 py-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
