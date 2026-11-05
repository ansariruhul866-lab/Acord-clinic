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
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Specialist Doctors", "विशेषज्ञ चिकित्सक")}</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("AIIMS & PGIMER Directors", "एम्स एवं पीजीआईएमईआर प्रशिक्षित निदेशक")}</span>
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

        {/* Doctors Grid - Matching User Reference Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
          {DOCTORS.map((doc) => {
            const isRheum = doc.specialty === "rheumatology";
            const bullets = isRheum
              ? [
                  t(
                    "AIR 1, PGIMER Chandigarh (DM Clinical Immunology & Rheumatology)",
                    "डीएम क्लिनिकल इम्यूनोलॉजी एवं रूमेटोलॉजी (AIR 1, PGIMER चंडीगढ़)"
                  ),
                  t(
                    "Advanced Biologic Infusions, Arthritis & Lupus Remission Protocols",
                    "बायोलॉजिकल थेरेपी, गठिया एवं ल्यूपस में विशेषज्ञ उपचार"
                  ),
                  t(
                    "Musculoskeletal (MSK) Ultrasound-Guided Joint Injections",
                    "मस्कुलोस्केलेटल अल्ट्रासाउंड गाइडेड जॉइंट इंजेक्शन"
                  ),
                ]
              : [
                  t(
                    "Faculty at BRD Medical College Gorakhpur · MD (AIIMS AIR 456)",
                    "फैकल्टी, बीआरडी मेडिकल कॉलेज गोरखपुर · एमडी (AIIMS AIR 456)"
                  ),
                  t(
                    "International Fellowships in Lasers & Trichology (South Korea)",
                    "साउथ कोरिया से लेजर, एस्थेटिक्स एवं ट्राइकोलॉजी फेलोशिप"
                  ),
                  t(
                    "Advanced Vitiligo Surgery, FUE Hair Restoration & Laser Science",
                    "विटिलिगो सर्जरी, FUE हेयर ट्रांसप्लांट एवं एडवांस्ड लेजर"
                  ),
                ];

            return (
              <div
                key={doc.id}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[540px] sm:min-h-[580px] lg:min-h-[600px] flex flex-col justify-end bg-slate-900 group cursor-pointer"
              >
                {/* Doctor Image - 100% Full Opacity Always (Zero Dulling on Doctor's Face/Body) */}
                <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      doc.id === "dr-ankita-pundir"
                        ? "object-[center_28%]"
                        : "object-[center_top]"
                    }`}
                  />
                  {/* Linear Gradient reaching ONLY the height of text - text & buttons get highlighted without dulling the doctor */}
                  <div className="absolute inset-x-0 bottom-0 h-40 group-hover:h-[54%] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent transition-all duration-500 ease-out pointer-events-none" />
                </div>

                  {/* Bottom Overlay Content */}
                  <div className="relative z-10 p-5 sm:p-6 space-y-2.5 text-white">
                    <div className="space-y-0.5">
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                        {isHindi ? doc.nameHi : doc.name}
                      </h2>
                      <p className="text-[11px] sm:text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                        {isHindi ? doc.roleHi : doc.role}
                      </p>
                      {/* Degrees - expands smoothly on hover */}
                      <p className="text-[11px] text-slate-300 font-mono opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-8 transition-all duration-300 overflow-hidden">
                        {doc.degrees}
                      </p>
                    </div>

                    {/* Bullet Points with Checkmarks - hidden normally, revealed when hovered */}
                    <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-48 transition-all duration-500 ease-in-out overflow-hidden">
                      <ul className="space-y-1.5 text-xs text-slate-100 pt-1 pb-1">
                        {bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                            <span className="leading-snug text-slate-100 font-medium drop-shadow-sm">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-1 flex items-center gap-2.5">
                      {/* View Profile Button: Always visible normally */}
                      <Link
                        href={`/doctors/${doc.slug}`}
                        className="py-2.5 px-5 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5 shrink-0 group/link"
                      >
                        <span>{t("View profile", "प्रोफाइल देखें")}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-900 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>

                      {/* Book Consultation Button: Reveals smoothly on hover */}
                      <div className="flex-1 opacity-0 max-w-0 pointer-events-none group-hover:opacity-100 group-hover:max-w-full group-hover:pointer-events-auto transition-all duration-300 overflow-hidden flex">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBooking({ specialty: doc.specialty, doctor: doc.id });
                          }}
                          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#1CA7EC] to-[#1F2F98] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{t("Book Consultation", "परामर्श बुक करें")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>

        {/* Detailed Academic & Clinical Credentials Section */}
        <div className="pt-10 border-t border-slate-200 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {t("Clinical Biographies & Fellowships", "विस्तृत शैक्षणिक एवं चिकित्सीय अनुभव")}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {t(
                "Direct mentorship from India and abroad's top medical institutes, ensuring gold-standard protocols for Purvanchal and Bihar.",
                "शीर्ष संस्थानों का प्रत्यक्ष अनुभव, जिससे पूर्वांचल एवं बिहार के मरीजों को अंतरराष्ट्रीय स्तर की सेवा मिलती है।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DOCTORS.map((doc) => (
              <div
                key={`bio-${doc.id}`}
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-5"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {isHindi ? doc.nameHi : doc.name}
                  </h3>
                  <p className="text-xs text-[#1CA7EC] font-semibold">
                    {isHindi ? doc.roleHi : doc.role}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{doc.degrees}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHindi ? doc.bioHi : doc.bio}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
                    {t("Fellowships & Training:", "फेलोशिप एवं प्रशिक्षण:")}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
