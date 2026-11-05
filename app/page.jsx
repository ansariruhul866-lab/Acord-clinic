"use client";
import React, { useState } from "react";
import Link from "next/link";
import AcordDoctorStage from "@/components/AcordDoctorStage";
import { SymptomFinder } from "@/components/SymptomFinder";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  CLINIC_INFO,
  DOCTORS,
  TECHNOLOGIES,
  FAQ_DATABASE,
} from "@/lib/data";
import {
  Calendar,
  MessageCircle,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronDown,
  Award,
  ShieldCheck,
  Stethoscope,
  Activity,
  HeartHandshake,
} from "lucide-react";

export default function HomePage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickBranch, setQuickBranch] = useState("gorakhpur");
  const [quickSpecialty, setQuickSpecialty] = useState("rheumatology");
  const [openFaq, setOpenFaq] = useState(0);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    openBooking({
      branch: quickBranch,
      specialty: quickSpecialty,
    });
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* SECTION 1: MINIMALIST & PREMIUM LIGHT HERO */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16 bg-gradient-to-b from-[#F0F9FF]/80 via-white to-[#F8FAFC] isolate z-0">
        {/* Subtle luminous ambient glows with brand colors */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#1CA7EC]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#4ADEDE]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1CA7EC]/30 shadow-sm text-[#1F2F98] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#1CA7EC] animate-pulse" />
              <span>
                {t(
                  "India's 1st Hybrid Rheumatology & Dermatology Super-Speciality",
                  "भारत का प्रथम हाइब्रिड रूमेटोलॉजी एवं डर्मेटोलॉजी सेंटर"
                )}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              <span className="font-display tracking-wider block text-[#1F2F98] mb-1 text-2xl sm:text-3xl">
                <span className="text-[#1CA7EC]">A</span>UTOIMMUNITY ·{" "}
                <span className="text-[#1F2F98]">C</span>ARE ·{" "}
                <span className="text-[#4ADEDE]">O</span>UTCOMES ·{" "}
                <span className="text-[#1AA7EC]">R</span>ESULTS
              </span>
              <span>{t("Choose Your Path to", "स्वास्थ्य और आत्मविश्वास की")}</span>{" "}
              <span className="bg-gradient-to-r from-[#1F2F98] via-[#1CA7EC] to-[#1AA7EC] bg-clip-text text-transparent underline decoration-[#1CA7EC]/40">
                {t("Health & Confidence", "ओर सही मार्ग")}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {t(
                "Advanced arthritis, lupus, cold-chain biologics, vitiligo micro-grafting, FUE hair restoration and global medical lasers. Serving Gorakhpur, Bhagalpur, Purvanchal, Bihar & Jharkhand.",
                "जटिल गठिया, ल्यूपस, इन-हाउस बायोलॉजिकल दवाएं, विटिलिगो सर्जरी, FUE हेयर ट्रांसप्लांट और लेजर तकनीक — गोरखपुर एवं भागलपुर में।"
              )}
            </p>

            {/* Hindi Highlight Pill */}
            <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#1CA7EC]/20 text-xs sm:text-sm text-slate-700 space-y-1 text-left max-w-xl mx-auto lg:mx-0 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-[#1F2F98]">
                <Sparkles className="w-4 h-4 text-[#1CA7EC] shrink-0" />
                <span>जटिल गठिया का सटीक इलाज Biological मेडिसिन के साथ</span>
              </div>
              <p className="text-xs text-slate-600">
                गठिया संबंधित जोड़ एवं नस के ऑपरेशन/सर्जरी से बचा सकता है आधुनिक Biological मेडिसिन।
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => openBooking()}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm sm:text-base shadow-md shadow-[#1CA7EC]/25 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>{t("Book Appointment", "अपॉइंटमेंट बुक करें")}</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.branches[0].whatsapp}?text=${encodeURIComponent(
                  "Hello ACORD Clinics, I would like to book a specialist consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-bold text-sm sm:text-base hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.branches[0].phone}`}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#1CA7EC]" />
                <span>{t("Call Clinic", "कॉल करें")}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1CA7EC]" />
                <span><b className="text-slate-700">Gorakhpur:</b> +91 77029 41735 / +91 91980 43636</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1CA7EC]" />
                <span><b className="text-slate-700">Bhagalpur:</b> +91 79034 68113</span>
              </span>
            </div>
          </div>

          {/* Right Column: Doctor Arches Stage */}
          <div className="lg:col-span-5 flex justify-center z-10 w-full">
            <AcordDoctorStage />
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST STRIP */}
      <section className="border-y border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-xl">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>4.9 / 5.0</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {t("1,000+ Verified Google Reviews", "1,000+ प्रमाणित गूगल समीक्षाएं")}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-[#1F2F98] font-black text-xl">AIR-1 PGIMER</div>
            <p className="text-xs text-slate-600 font-medium">
              {t("Dr. Aakash Singh (Rheumatology)", "डॉ. आकाश सिंह (रूमेटोलॉजी)")}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-[#1CA7EC] font-black text-xl">NEET AIR 1488</div>
            <p className="text-xs text-slate-600 font-medium">
              {t("Dr. Ankita Pundir (MD Dermatology)", "डॉ. अंकिता पुंडीर (डर्मेटोलॉजी)")}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-[#1AA7EC] font-black text-xl">
              {t("In-House Cold-Chain", "इन-हाउस कोल्ड-चेन")}
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {t("Biologics & Laser Suites", "बायोलॉजिक्स एवं लेजर सुइट्स")}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUR DOORS (THE LOGO MADE REAL) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Four-Quadrant Super Specialities", "चार प्रमुख विशेषता द्वार")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {t("Choose Your Care", "अपनी आवश्यकता अनुसार विभाग चुनें")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quadrant 1 */}
            <Link
              href="/dermatology"
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1CA7EC]">
                  {t("01 · Top-Left", "01 · प्रथम द्वार (त्वचा)")}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-[#1F2F98] transition-colors">
                  {t("Skin & Aesthetics", "त्वचा एवं सौंदर्य")}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t(
                    "Medifacials, BOTOX®, Fillers, Thread Lifts, and Pigmentation Clearing.",
                    "मेडीफेशियल्स, बोटॉक्स, फिलर्स, थ्रेड लिफ्ट और झाइयां व दाग-धब्बे मिटाने की लेजर तकनीक।"
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#1CA7EC] flex items-center justify-between">
                <span>{t("Explore Dermatology", "त्वचा रोग विभाग")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Quadrant 2 */}
            <Link
              href="/rheumatology"
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1F2F98] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F2F98]">
                  {t("02 · Top-Right", "02 · द्वितीय द्वार (गठिया)")}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-[#1F2F98] transition-colors">
                  {t("Joints & Arthritis", "जोड़ एवं गठिया")}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t(
                    "Targeted biologicals, MSK ultrasound guided joint injections, and Rheumatoid arthritis.",
                    "टारगेटेड बायोलॉजिकल दवाएं, अल्ट्रासाउंड गाइडेड इंजेक्शन एवं आर्थराइटिस केयर।"
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#1F2F98] flex items-center justify-between">
                <span>{t("Explore Rheumatology", "रूमेटोलॉजी विभाग")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Quadrant 3 */}
            <Link
              href="/dermatology/treatments/hair-restoration-transplant"
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#4ADEDE] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1AA7EC]">
                  {t("03 · Bottom-Left", "03 · तृतीय द्वार (बाल/लेजर)")}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-[#1F2F98] transition-colors">
                  {t("Hair & Lasers", "बाल एवं लेजर")}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t(
                    "Micro FUE Hair Transplants, QR678® bio-peptides, and Diode Laser Hair Reduction.",
                    "माइक्रो FUE हेयर ट्रांसप्लांट, QR678® बायो-पेप्टाइड्स एवं डायोड लेजर।"
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#1AA7EC] flex items-center justify-between">
                <span>{t("Explore Hair & Lasers", "हेयर एवं लेजर विभाग")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Quadrant 4 */}
            <Link
              href="/rheumatology/conditions/connective-tissue-lupus-sle"
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1CA7EC]">
                  {t("04 · Bottom-Right", "04 · चतुर्थ द्वार (इम्यूनोलॉजी)")}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-[#1F2F98] transition-colors">
                  {t("Lupus & Autoimmunity", "ल्यूपस एवं ऑटोइम्यून")}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t(
                    "SLE, Vasculitis, Scleroderma, and in-house diagnostic tissue biopsy.",
                    "SLE, वैस्कुलाइटिस, स्क्लेरोडर्मा एवं इन-हाउस बायोप्सी व सटीक जांच।"
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#1CA7EC] flex items-center justify-between">
                <span>{t("Explore Autoimmunity", "ऑटोइम्यूनिटी विभाग")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: SYMPTOM FINDER */}
      <SymptomFinder />

      {/* SECTION 5: MEET THE FOUNDERS & DIRECTORS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F0F9FF]/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-bold uppercase tracking-wide">
              <Award className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Global-Trained Specialists", "विख्यात विशेषज्ञ चिकित्सक")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {t("Meet the Founders & Directors", "हमारे संस्थापक एवं निदेशक")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC]/60 transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
              >
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <img
                      src={doc.posterImage}
                      alt={doc.name}
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#1CA7EC] shadow-md shrink-0 ${
                        doc.id === "dr-ankita-pundir" ? "object-[center_30%]" : "object-[center_top]"
                      }`}
                    />
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-[10px] font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                        {doc.specialty === "rheumatology"
                          ? t("Rheumatology & Immunology", "रूमेटोलॉजी एवं इम्यूनोलॉजी")
                          : t("Dermatology & Dermatosurgery", "डर्मेटोलॉजी एवं डर्मेटोसर्जरी")}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {isHindi ? doc.nameHi : doc.name}
                      </h3>
                      <p className="text-xs text-[#1CA7EC] font-semibold">
                        {isHindi ? doc.roleHi : doc.role}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">{doc.degrees}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi ? doc.bioHi : doc.bio}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F2F98]">
                      {t("Credentials & Experience:", "डिग्री एवं विशिष्ट अनुभव:")}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {(isHindi ? doc.fellowshipsHi : doc.fellowships).slice(0, 3).map((fel, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1CA7EC] shrink-0 mt-0.5" />
                          <span>{fel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <button
                    onClick={() => openBooking({ specialty: doc.specialty, doctor: doc.id })}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#1F2F98] text-white font-bold text-xs hover:bg-[#1CA7EC] transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t("Book Consultation", "परामर्श बुक करें")}</span>
                  </button>
                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1"
                  >
                    <span>{t("Profile", "प्रोफाइल")}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: TECHNOLOGY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {t("World-Class Technology, Right Here", "विश्वस्तरीय तकनीक अब आपके शहर में")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t("Gold-standard international lasers (Spain, South Korea) and cold-chain biologics.", "स्पेन और दक्षिण कोरिया के लेजर और इन-हाउस बायोलॉजिकल सुइट।")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECHNOLOGIES.map((tech) => (
              <div
                key={tech.id}
                className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#1CA7EC]/60 transition-all space-y-3 shadow-sm hover:shadow-md"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1CA7EC]">
                  {isHindi && tech.categoryHi ? tech.categoryHi : tech.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {isHindi ? tech.titleHi : tech.title}
                </h3>
                <div className="p-2 rounded-xl bg-white border border-slate-200 font-mono text-[11px] text-slate-700">
                  {isHindi && tech.specHi ? tech.specHi : tech.spec}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHindi ? tech.descHi : tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: BEFORE & AFTER SLIDER */}
      <BeforeAfterSlider />

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_DATABASE.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:text-[#1CA7EC] transition-colors"
                  >
                    <span className="font-bold text-sm text-slate-900">
                      {isHindi ? faq.qHi : faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#1CA7EC] transition-transform shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {isHindi ? faq.aHi : faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL BOOKING CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F0F9FF] to-white relative">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#1CA7EC]/30 p-8 sm:p-12 shadow-xl space-y-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {t(
              "Let's Bring Back Your Glow and Your Movement",
              "आइए लौटाएं आपकी त्वचा का निखार और जोड़ों की सहजता"
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            {t(
              "Book your consultation now with Dr. Aakash Singh or Dr. Ankita Pundir. Coordinator will confirm within 15 minutes.",
              "अभी अपना परामर्श बुक करें। हमारे क्लिनिक समन्वयक 15 मिनट में संपर्क करेंगे।"
            )}
          </p>

          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 max-w-3xl mx-auto pt-2">
            <input
              type="text"
              required
              placeholder={t("Your Name", "आपका नाम")}
              value={quickName}
              onChange={(e) => setQuickName(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#1CA7EC]"
            />
            <input
              type="tel"
              required
              placeholder={t("Mobile Phone", "मोबाइल नंबर")}
              value={quickPhone}
              onChange={(e) => setQuickPhone(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#1CA7EC]"
            />
            <select
              value={quickBranch}
              onChange={(e) => setQuickBranch(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#1CA7EC]"
            >
              <option value="gorakhpur">{t("Gorakhpur Branch", "गोरखपुर शाखा")}</option>
              <option value="bhagalpur">{t("Bhagalpur Branch", "भागलपुर शाखा")}</option>
            </select>
            <select
              value={quickSpecialty}
              onChange={(e) => setQuickSpecialty(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#1CA7EC]"
            >
              <option value="rheumatology">{t("Rheumatology & Joints", "रूमेटोलॉजी (गठिया)")}</option>
              <option value="dermatology">{t("Dermatology & Skin", "डर्मेटोलॉजी (त्वचा/बाल)")}</option>
            </select>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-[#1F2F98] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:bg-[#1CA7EC] transition-colors"
            >
              {t("Book Now", "बुक करें")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
