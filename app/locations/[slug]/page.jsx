"use client";
import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLINIC_INFO, DOCTORS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Building2,
} from "lucide-react";

export default function BranchDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const branches = Array.isArray(CLINIC_INFO.branches)
    ? CLINIC_INFO.branches
    : Object.values(CLINIC_INFO.branches);
  const branch = branches.find((b) => b.slug === slug || b.id === slug);
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  if (!branch) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-[#1CA7EC]">{t("Locations", "शाखाएं")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{isHindi && branch.cityHi ? branch.cityHi : branch.city} {t("Branch", "शाखा")}</span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
            <Building2 className="w-4 h-4 text-[#1CA7EC]" />
            <span>{t("Super-Speciality Clinic", "सुपर-स्पेशलिटी क्लिनिक")} · {branch.state || "India"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            ACORD Clinics — {isHindi && branch.cityHi ? branch.cityHi : branch.city}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {isHindi && branch.addressHi ? branch.addressHi : branch.address}
          </p>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1CA7EC]" />
              <span><b>{t("Clinic Hours:", "क्लिनिक समय:")}</b> {isHindi && branch.hoursHi ? branch.hoursHi : (branch.hours || branch.timings)}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[#1F2F98] font-bold text-sm sm:text-base">
              <Phone className="w-4 h-4 text-[#1CA7EC]" />
              <a href={`tel:${branch.phone}`} className="hover:underline">
                {branch.phoneDisplay || branch.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => openBooking({ branch: branch.id || branch.slug })}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t(`Book Appointment at ${branch.city}`, `${isHindi && branch.cityHi ? branch.cityHi : branch.city} में अपॉइंटमेंट बुक करें`)}</span>
            </button>
            <a
              href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello, I would like to book an appointment at ACORD Clinics ${branch.city}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t("WhatsApp Branch", "व्हाट्सएप संपर्क")}</span>
            </a>
            {branch.mapDirectionsUrl && (
              <a
                href={branch.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>{t("Google Maps", "गूगल मैप")}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1CA7EC]" />
              </a>
            )}
          </div>
        </div>

        {/* Featured Specialities in Branch */}
        {branch.featuredServices && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t("Available Infrastructure & Services at this Branch", "इस शाखा पर उपलब्ध सुविधाएं")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {branch.featuredServices.map((srv, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#1CA7EC] shrink-0" />
                  <span className="text-slate-700">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctors Consulting Here */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {t("Consulting Specialists at this Branch", "परामर्शदाता विशेषज्ञ")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#1CA7EC]"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm sm:text-base">{isHindi ? doc.nameHi : doc.name}</div>
                  <div className="text-xs text-[#1CA7EC] font-semibold">{isHindi ? doc.roleHi : doc.role}</div>
                  <button
                    onClick={() => openBooking({ branch: branch.id, doctor: doc.id, specialty: doc.specialty })}
                    className="text-xs text-[#1F2F98] underline mt-1 font-semibold hover:text-[#1CA7EC]"
                  >
                    {t("Book Consultation →", "बुक करें →")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
