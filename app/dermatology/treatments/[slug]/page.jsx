"use client";
import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DERMATOLOGY_TREATMENTS, DOCTORS, CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Clock,
  Zap,
} from "lucide-react";

export default function DermatologyTreatmentDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const treatment = DERMATOLOGY_TREATMENTS.find((t) => t.slug === slug);
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  if (!treatment) {
    notFound();
  }

  const doctor = DOCTORS.find((d) => d.id === "dr-ankita") || DOCTORS[1];
  const defaultBranch = CLINIC_INFO.branches[0];

  const procedureJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.title,
    description: treatment.shortDesc,
    procedureType: "NonSurgicalProcedure",
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Dermatology",
    },
    howPerformed: treatment.technologyUsed?.join(", "),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureJsonLd) }}
      />
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <Link href="/dermatology" className="hover:text-[#1CA7EC]">Dermatology</Link>
          <span>/</span>
          <span className="text-[#1CA7EC] font-semibold">{treatment.title.split("(")[0]}</span>
        </div>

        {/* Hero Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
            <Sparkles className="w-4 h-4 text-[#1CA7EC]" />
            <span>Clinical Dermatology · Gold Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isHindi ? treatment.titleHi : treatment.title}
          </h1>

          <p className="text-base sm:text-lg text-[#1CA7EC] font-semibold">
            {isHindi ? treatment.taglineHi : treatment.tagline}
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {isHindi ? treatment.shortDescHi : treatment.shortDesc}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-[#1CA7EC]" />
              <span><b>Downtime:</b> {treatment.downtime}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700">
              <Zap className="w-4 h-4 text-[#1F2F98]" />
              <span><b>Sessions:</b> {treatment.sessionsNeeded}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => openBooking({ specialty: "dermatology", doctor: "dr-ankita-pundir", treatment: treatment.title })}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t("Book Procedure Consultation", "प्रक्रिया परामर्श बुक करें")}</span>
            </button>
            <a
              href={`https://wa.me/${defaultBranch.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello, I would like to book a consultation for ${treatment.title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Technology & Devices Used */}
        {treatment.technologyUsed && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1CA7EC]" />
              <span>{t("Technology & Medical Devices Used", "प्रयुक्त अत्याधुनिक तकनीक व उपकरण")}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {treatment.technologyUsed.map((tech, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#1CA7EC] shrink-0 mt-0.5" />
                  <span className="text-slate-700">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {treatment.benefits && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1CA7EC]" />
              <span>{t("Clinical Benefits & Outcomes", "मुख्य लाभ एवं परिणाम")}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isHindi && treatment.benefitsHi ? treatment.benefitsHi : treatment.benefits).map((b, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-[#F0F9FF] text-[#1F2F98] font-bold text-xs flex items-center justify-center shrink-0 border border-[#1CA7EC]/30">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Procedure Workflow */}
        {treatment.procedureSteps && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
                Patient Journey
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t("Step-by-Step Clinical Procedure", "प्रक्रिया के चरण")}
              </h2>
            </div>
            <div className="space-y-3">
              {treatment.procedureSteps.map((step, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-sm">
                  <span className="w-6 h-6 rounded-xl bg-[#1F2F98] text-white font-black text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ideal Candidates */}
        {treatment.idealFor && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t("Who is this treatment ideal for?", "यह उपचार किसके लिए उपयुक्त है?")}
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {treatment.idealFor.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#1CA7EC] font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Doctor Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1CA7EC]"
            />
            <div>
              <div className="font-bold text-base sm:text-lg text-slate-900">{doctor.name}</div>
              <div className="text-xs text-[#1CA7EC] font-semibold">{doctor.role}</div>
              <div className="text-[11px] text-slate-500">NEET PG AIR 1488, AIIMS AIR 456</div>
            </div>
          </div>

          <button
            onClick={() => openBooking({ specialty: "dermatology", doctor: "dr-ankita-pundir", treatment: treatment.title })}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
          >
            {t("Book with Dr. Ankita Pundir", "डॉ. अंकिता पुंडीर से परामर्श लें")}
          </button>
        </div>
      </div>
    </div>
  );
}
