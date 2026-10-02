"use client";
import React from "react";
import Link from "next/link";
import { DOCTORS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Award, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DoctorsDirectoryPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Specialist Doctors</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>AIIMS & PGIMER Directors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Meet Our Specialist Directors", "हमारे विशेषज्ञ चिकित्सक एवं निदेशक")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t(
              "Dr. Aakash Singh and Dr. Ankita Pundir co-founded ACORD Clinics to deliver premier-institution healthcare, transparent ethics, and evidence-based science to Eastern Uttar Pradesh, Bihar, and Jharkhand.",
              "डॉ. आकाश सिंह एवं डॉ. अंकिता पुंडीर द्वारा स्थापित—पूर्वांचल और बिहार में उच्चकोटि की सुपर-स्पेशलिटी चिकित्सा सेवा।"
            )}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-[#1F2F98] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      {doc.specialty === "rheumatology" ? "Rheumatology & Immunology" : "Dermatology & Dermatosurgery"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {isHindi ? doc.nameHi : doc.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1CA7EC] font-semibold">
                    {isHindi ? doc.roleHi : doc.role}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">{doc.degrees}</p>
                </div>

                {doc.ranks && (
                  <div className="flex flex-wrap gap-2">
                    {doc.ranks.map((rnk) => (
                      <span key={rnk} className="px-2.5 py-1 rounded-lg bg-[#F0F9FF] border border-[#1CA7EC]/30 text-[#1F2F98] font-bold text-xs">
                        ★ {rnk}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi ? doc.bioHi : doc.bio}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
                    Fellowships & Specializations:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(isHindi ? doc.fellowshipsHi : doc.fellowships).map((fel, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1CA7EC] shrink-0 mt-0.5" />
                        <span>{fel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                <button
                  onClick={() => openBooking({ specialty: doc.specialty, doctor: doc.id })}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("Book Appointment", "परामर्श बुक करें")}</span>
                </button>
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>{t("Full Profile", "प्रोफाइल विवरण")}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1CA7EC]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
