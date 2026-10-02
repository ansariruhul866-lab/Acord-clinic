"use client";
import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RHEUMATOLOGY_CONDITIONS, CONDITIONS, DOCTORS, CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  Activity,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Microscope,
  Sparkles,
} from "lucide-react";

export default function ConditionDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const conditionsList = RHEUMATOLOGY_CONDITIONS || CONDITIONS;
  const condition = conditionsList.find((c) => c.slug === slug);
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  if (!condition) {
    notFound();
  }

  const doctor = DOCTORS.find((d) => d.id === "dr-aakash") || DOCTORS[0];
  const defaultBranch = CLINIC_INFO.branches[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <Link href="/rheumatology" className="hover:text-[#1CA7EC]">Rheumatology</Link>
          <span>/</span>
          <Link href="/rheumatology/conditions" className="hover:text-[#1CA7EC]">Conditions</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{condition.title.split("(")[0]}</span>
        </div>

        {/* Hero Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
            <Activity className="w-4 h-4 text-[#1CA7EC]" />
            <span>{condition.category || "Rheumatology"} · Expert Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isHindi ? condition.titleHi : condition.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {isHindi ? condition.shortDescHi : condition.shortDesc}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openBooking({ specialty: "rheumatology", doctor: "dr-aakash-singh", condition: condition.title })}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t("Book Specialist Consultation", "डॉक्टर से परामर्श बुक करें")}</span>
            </button>
            <a
              href={`https://wa.me/${defaultBranch.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello, I would like to book an appointment for ${condition.title}.`
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

        {/* Symptoms & Clinical Features */}
        {condition.symptoms && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F2F98]" />
              <span>{t("Symptoms & Clinical Signs", "प्रमुख लक्षण एवं संकेत")}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isHindi && condition.symptomsHi ? condition.symptomsHi : condition.symptoms).map((symp, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#1CA7EC] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">{symp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Causes & Biological Trigger Mechanism */}
        {condition.causes && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1CA7EC]" />
              <span>{t("Causes & Immunology", "कारण एवं जैविक क्रियाविधि")}</span>
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              {condition.causes.map((cause, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold flex items-center justify-center shrink-0 border border-[#1CA7EC]/30">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-slate-700">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diagnosis & Advanced Testing */}
        {condition.diagnosis && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#1CA7EC]" />
              <span>{t("Diagnosis & In-House Testing at ACORD", "एकॉर्ड में सटीक जांच व निदान")}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {condition.diagnosis.map((diag, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-start gap-2 shadow-sm">
                  <span className="text-[#1CA7EC] font-bold">•</span>
                  <span>{diag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Options & Biological DMARDs */}
        {condition.treatmentOptions && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
                Evidence-Based Protocols
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t("Treatment Options & Biological Therapies", "उपचार विकल्प एवं बायोलॉजिकल थेरेपी")}
              </h2>
            </div>
            <div className="space-y-3">
              {condition.treatmentOptions.map((opt, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#1CA7EC] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">{opt}</span>
                </div>
              ))}
            </div>

            {condition.whatToExpect && (
              <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#1CA7EC]/20 text-xs text-slate-700 leading-relaxed shadow-sm">
                <p className="font-bold text-[#1F2F98] mb-1">{t("What to Expect:", "उपचार से क्या उम्मीद रखें:")}</p>
                <p>{condition.whatToExpect}</p>
              </div>
            )}
          </div>
        )}

        {/* Consulting Doctor Banner */}
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
              <div className="text-[11px] text-slate-500">Gorakhpur & Bhagalpur Branches</div>
            </div>
          </div>

          <button
            onClick={() => openBooking({ specialty: "rheumatology", doctor: "dr-aakash-singh", condition: condition.title })}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
          >
            {t("Book with Dr. Aakash Singh", "डॉ. आकाश सिंह से परामर्श लें")}
          </button>
        </div>
      </div>
    </div>
  );
}
