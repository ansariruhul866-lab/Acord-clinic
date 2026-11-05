"use client";
import React from "react";
import Link from "next/link";
import { CLINIC_INFO, DOCTORS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import AcordLogo from "@/components/AcordLogo";
import { Award, ShieldCheck, Sparkles, Building, ArrowRight, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("About ACORD", "एकॉर्ड के बारे में")}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Origin & Philosophy", "हमारी उत्पत्ति एवं सिद्धांत")}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t("Autoimmunity Centre Of excellence in Rheumatology & Dermatology", "ऑटोइम्यूनिटी सेंटर ऑफ एक्सीलेंस इन रुमेटोलॉजी एंड डर्मेटोलॉजी")}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {t(
                "ACORD Clinics was founded by AIIMS and PGIMER trained specialists to bridge the acute super-speciality deficit in Eastern Uttar Pradesh, Bihar, and Jharkhand. We unite advanced immunological science with medical aesthetics under one patient-first sanctuary.",
                "ACORD क्लिनिक्स की स्थापना एम्स एवं पीजीआईएमईआर प्रशिक्षित विशेषज्ञों द्वारा पूर्वांचल, बिहार और झारखंड में विश्वस्तरीय रुमेटोलॉजी और त्वचा रोग चिकित्सा उपलब्ध कराने हेतु की गई।"
              )}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openBooking()}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md shadow-[#1CA7EC]/20"
              >
                {t("Book Consultation", "परामर्श बुक करें")}
              </button>
              <Link
                href="/doctors"
                className="px-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>{t("Meet the Directors", "विशेषज्ञों से मिलें")}</span>
                <ArrowRight className="w-4 h-4 text-[#1CA7EC]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 flex flex-col items-center text-center space-y-4 shadow-sm">
              <AcordLogo size={140} showText={false} />
              <div className="space-y-1">
                <span className="font-display text-2xl tracking-wider text-[#1F2F98]">A • C • O • R • D</span>
                <p className="text-xs text-[#1CA7EC] font-semibold">
                  {t(
                    "Autoimmunity Centre Of excellence in Rheumatology and Dermatology",
                    "ऑटोइम्यूनिटी सेंटर ऑफ एक्सीलेंस इन रूमेटोलॉजी एंड डर्मेटोलॉजी"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t("Our Guiding Clinical Values", "हमारे मार्गदर्शक सिद्धांत")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t("Uncompromising scientific standards with compassionate patient communication.", "सच्चा वैज्ञानिक दृष्टिकोण एवं पूर्ण नैतिक चिकित्सा।")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#1CA7EC]/60 transition-all space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1CA7EC] shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t("Tier-1 Academic Pedigree", "सर्वोच्च शैक्षणिक योग्यता")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("Trained directly at PGIMER Chandigarh (AIR 1 DM) and AIIMS, bringing international protocols to Gorakhpur and Bhagalpur.", "पीजीआईएमईआर चंडीगढ़ (AIR 1 DM) एवं एम्स से प्रशिक्षित डॉक्टरों द्वारा प्रामाणिक इलाज।")}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#1CA7EC]/60 transition-all space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1CA7EC] shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t("Zero-Prescription Kickbacks", "पूर्ण नैतिक एवं पारदर्शी चिकित्सा")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("We strictly practice rational drug prescriptions with no unnecessary investigations or duplicate testing.", "बिना किसी अनावश्यक जांच या फालतू दवाओं के केवल प्रमाण-आधारित वैज्ञानिक उपचार।")}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#1CA7EC]/60 transition-all space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1CA7EC] shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t("Integrated Dual-Specialty Care", "रुमेटोलॉजी व त्वचा का समन्वय")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("Many autoimmune diseases simultaneously attack skin and joints (Psoriasis, Lupus, Scleroderma). Here, both specialists consult synchronously.", "सोरायसिस, ल्यूपस जैसी बीमारियों में त्वचा एवं जोड़ों दोनों का एक ही छत के नीचे समन्वित इलाज।")}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Founders Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t("Founding Specialists", "संस्थापक विशेषज्ञ")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t("Recognised clinical leaders serving Purvanchal, Bihar, and Jharkhand.", "पूर्वांचल एवं बिहार में विश्वसनीय सुपर-स्पेशलिस्ट डॉक्टर।")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
            {DOCTORS.map((doc) => {
              const isRheum = doc.specialty === "rheumatology";

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

                    <div className="relative z-10 p-5 sm:p-6 space-y-2.5 text-white">
                      <div className="space-y-0.5">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                          {isHindi ? doc.nameHi : doc.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                          {isHindi ? doc.roleHi : doc.role}
                        </p>
                        <p className="text-[11px] text-slate-300 font-mono opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-8 transition-all duration-300 overflow-hidden">
                          {doc.degrees}
                        </p>
                      </div>

                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-500 overflow-hidden">
                        {isHindi ? doc.bioHi : doc.bio}
                      </p>

                      <div className="pt-1 flex items-center gap-2.5">
                        <Link
                          href={`/doctors/${doc.slug}`}
                          className="py-2.5 px-5 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5 shrink-0"
                        >
                          <span>{t("View profile", "प्रोफाइल देखें")}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
                        </Link>

                        <div className="flex-1 opacity-0 max-w-0 pointer-events-none group-hover:opacity-100 group-hover:max-w-full group-hover:pointer-events-auto transition-all duration-300 overflow-hidden flex">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openBooking({ specialty: doc.specialty, doctor: doc.id });
                            }}
                            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#1CA7EC] to-[#1F2F98] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md whitespace-nowrap"
                          >
                            {t("Book Appointment", "परामर्श बुक करें")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>

        {/* Clinic Branches */}
        <div className="p-8 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 space-y-6">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-[#1CA7EC]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t("Clinic Super-Speciality Centres", "हमारे प्रमुख केंद्र")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CLINIC_INFO.branches.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <span className="text-xs font-bold text-[#1F2F98] uppercase tracking-wider">
                  {isHindi && b.cityHi ? b.cityHi : b.city} {t("Flagship", "फ्लैगशिप केंद्र")}
                </span>
                <h4 className="text-base font-bold text-slate-900">{isHindi && b.cityHi ? b.cityHi : b.city}, {b.state}</h4>
                <p className="text-xs text-slate-600">{isHindi && b.addressHi ? b.addressHi : b.address}</p>
                <p className="text-xs text-[#1CA7EC] font-mono font-bold pt-1">{t("Ph:", "फ़ोन:")} {b.phoneDisplay || b.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
