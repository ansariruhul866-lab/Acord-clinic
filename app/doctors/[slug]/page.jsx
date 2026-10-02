"use client";
import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCTORS, CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  Award,
  Calendar,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export default function DoctorProfilePage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const doctor = DOCTORS.find((d) => d.slug === slug);
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  if (!doctor) {
    notFound();
  }

  const defaultBranch = CLINIC_INFO.branches[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#1CA7EC]">Doctors</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{doctor.name}</span>
        </div>

        {/* Doctor Header Banner */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-44 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#1CA7EC] shadow-md shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-3 text-center md:text-left flex-1">
              <span className="px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-bold uppercase tracking-wider inline-block">
                {doctor.specialty === "rheumatology" ? "Rheumatology & Clinical Immunology" : "Dermatology & Dermatosurgery"}
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {isHindi ? doctor.nameHi : doctor.name}
              </h1>

              <p className="text-sm sm:text-base text-[#1CA7EC] font-semibold">
                {isHindi ? doctor.roleHi : doctor.role}
              </p>

              <p className="text-xs text-slate-500 font-mono">{doctor.degrees}</p>
              <p className="text-xs text-[#1F2F98] font-semibold">{doctor.experience}</p>

              {doctor.ranks && (
                <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
                  {doctor.ranks.map((rnk) => (
                    <span key={rnk} className="px-2.5 py-1 rounded-lg bg-[#F0F9FF] border border-[#1CA7EC]/30 text-[#1F2F98] font-bold text-xs">
                      ★ {rnk}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4 justify-center md:justify-start">
                <button
                  onClick={() => openBooking({ specialty: doctor.specialty, doctor: doctor.id })}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t(`Book with ${doctor.name.split(" ")[1]}`, `परामर्श बुक करें`)}</span>
                </button>
                <a
                  href={`https://wa.me/${defaultBranch.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello, I would like to book a consultation with ${doctor.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Bio & Philosophy */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {t("About the Doctor & Practice Philosophy", "डॉक्टर का परिचय एवं चिकित्सकीय दृष्टिकोण")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isHindi ? doctor.bioHi : doctor.bio}
          </p>

          <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-[#1CA7EC] text-xs sm:text-sm italic text-slate-700 mt-4 shadow-sm">
            "{isHindi ? doctor.quoteHi : doctor.quote}"
          </blockquote>
        </div>

        {/* Fellowships & Qualifications */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#1CA7EC]" />
            <span>{t("Verified Fellowships & Specializations", "फेलोशिप एवं प्रशिक्षण")}</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            {(isHindi ? doctor.fellowshipsHi : doctor.fellowships).map((fel, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1CA7EC] shrink-0 mt-0.5" />
                <span>{fel}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Procedures Performed */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1CA7EC]" />
            <span>{t("Procedures Performed", "किए जाने वाले प्रमुख प्रोसीजर्स")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {doctor.procedures.map((proc, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1CA7EC]" />
                <span>{proc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions Treated */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#1CA7EC]" />
            <span>{t("Conditions Treated", "इलाज की जाने वाली बीमारियां")}</span>
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {doctor.conditions.map((cond, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-sm">
                {cond}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
