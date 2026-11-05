"use client";
import React from "react";
import Link from "next/link";
import { TREATMENTS, DOCTORS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Sparkles, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function DermatologyPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const drAnkita = DOCTORS.find((d) => d.id === "dr-ankita" || d.slug === "dr-ankita-pundir") || DOCTORS[1];
  const dermTreatments = TREATMENTS.filter((t) => t.category === "dermatology" || t.category === "aesthetics" || t.category === "trichology");

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1CA7EC] font-semibold">Dermatology & Aesthetics</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Medical Dermatology & Laser Science", "त्वचा रोग एवं लेज़र विज्ञान")}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t("Dermatology, Hair Restoration & Aesthetic Science", "त्वचा रोग, हेयर ट्रांसप्लांट एवं लेज़र एस्थेटिक्स")}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {t(
                "Super-specialised clinical dermatology led by Dr. Ankita Pundir (Faculty at BRD Medical College Gorakhpur, AIIMS AIR 456). Combining US FDA-cleared lasers, clinical trichology, and advanced aesthetic dermatosurgery.",
                "बीआरडी मेडिकल कॉलेज गोरखपुर में फैकल्टी डॉ. अंकिता पुंडीर (AIIMS AIR 456) के नेतृत्व में यूएस-एफडीए स्वीकृत लेज़र, हेयर रिस्टोरेशन एवं त्वचा रोगों का संपूर्ण प्रमाण-आधारित इलाज।"
              )}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openBooking({ specialty: "dermatology", doctor: "dr-ankita" })}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md shadow-[#1CA7EC]/20"
              >
                {t("Book Dermatology Consultation", "त्वचा रोग परामर्श बुक करें")}
              </button>
              <Link
                href="/doctors/dr-ankita-pundir"
                className="px-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>{t("Dr. Ankita's Profile", "डॉ. अंकिता का प्रोफाइल")}</span>
                <ArrowRight className="w-4 h-4 text-[#1CA7EC]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            {drAnkita && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={drAnkita.image} alt={drAnkita.name} className="w-full h-full object-cover object-[center_30%]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{isHindi ? drAnkita.nameHi : drAnkita.name}</h3>
                  <p className="text-xs text-[#1CA7EC] font-semibold">{isHindi ? drAnkita.roleHi : drAnkita.role}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{drAnkita.degrees}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Procedures Grid */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t("Specialist Dermatology Treatments", "प्रमुख त्वचा एवं हेयर प्रोसीजर्स")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t("US FDA-approved medical technology with strict clinical safety standards.", "यूएस-एफडीए प्रमाणित टेक्नोलॉजी एवं पूर्ण चिकित्सकीय सुरक्षा।")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dermTreatments.map((tr) => (
              <div key={tr.id} className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
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
                    onClick={() => openBooking({ specialty: "dermatology", procedure: tr.name })}
                    className="flex-1 py-2 rounded-xl bg-[#F0F9FF] text-[#1F2F98] hover:bg-[#1CA7EC] hover:text-white font-bold text-xs transition-all border border-[#1CA7EC]/30"
                  >
                    {t("Book Treatment", "बुक करें")}
                  </button>
                  <Link
                    href={`/dermatology/treatments/${tr.slug}`}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-[#1CA7EC]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before After Showcase */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t("Clinical Case Results", "वास्तविक चिकित्सकीय परिणाम")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t("Real patient outcomes treated at ACORD Clinics. Individual results may vary.", "ACORD क्लिनिक में उपचारित मरीजों के परिणाम।")}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <BeforeAfterSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
