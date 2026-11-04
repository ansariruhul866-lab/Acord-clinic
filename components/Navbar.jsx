"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AcordLogo from "@/components/AcordLogo";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { CLINIC_INFO, DOCTORS } from "@/lib/data";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Calendar,
  Sparkles,
  Activity,
  Globe,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rheumMegaOpen, setRheumMegaOpen] = useState(false);
  const [dermMegaOpen, setDermMegaOpen] = useState(false);

  const pathname = usePathname();
  const { lang, setLang, t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  const drAakash = DOCTORS.find((d) => d.id === "dr-aakash" || d.slug === "dr-aakash-singh") || DOCTORS[0];
  const drAnkita = DOCTORS.find((d) => d.id === "dr-ankita" || d.slug === "dr-ankita-pundir") || DOCTORS[1];

  const primaryBranch = Array.isArray(CLINIC_INFO.branches) ? CLINIC_INFO.branches[0] : CLINIC_INFO.branches.gorakhpur;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setRheumMegaOpen(false);
    setDermMegaOpen(false);
  }, [pathname]);

  const rheumLinks = [
    { title: "Inflammatory Arthritis", titleHi: "इन्फ्लेमेटरी गठिया", href: "/rheumatology/conditions/inflammatory-arthritis" },
    { title: "Ankylosing Spondylitis", titleHi: "एंकाइलोजिंग स्पॉन्डिलाइटिस", href: "/rheumatology/conditions/ankylosing-spondylitis" },
    { title: "Lupus (SLE) Center", titleHi: "ल्यूपस (SLE) केयर", href: "/rheumatology/conditions/lupus-sle-autoimmune" },
    { title: "Gout & Uric Acid", titleHi: "गाउट एवं यूरिक एसिड", href: "/rheumatology/conditions/gout-crystal-arthritis" },
    { title: "Systemic Vasculitis", titleHi: "सिस्टमिक वैस्कुलाइटिस", href: "/rheumatology/conditions/vasculitis-rare-autoimmune" },
    { title: "Scleroderma Care", titleHi: "स्क्लेरोडर्मा एवं मायोसाइटिस", href: "/rheumatology/conditions/connective-tissue-disease-lupus" },
  ];

  const dermLinks = [
    { title: "Vitiligo & Leukoderma", titleHi: "विटिलिगो (सफेद दाग) ग्राफ्टिंग", href: "/dermatology/treatments/vitiligo-surgeries" },
    { title: "FUE Hair Transplant", titleHi: "FUE हेयर ट्रांसप्लांट", href: "/dermatology/treatments/hair-restoration-transplant" },
    { title: "Diode Laser Hair Removal", titleHi: "डायोड लेजर हेयर रिडक्शन", href: "/dermatology/treatments/laser-energy-devices" },
    { title: "Nd:YAG Laser Melasma", titleHi: "Nd:YAG लेजर एवं झाइयां", href: "/dermatology/treatments/laser-energy-devices" },
    { title: "Acne Scar Revision", titleHi: "मुंहासे के गड्ढे व स्कार्स", href: "/dermatology/treatments/acne-scar-revision" },
    { title: "Botox & Thread Lifts", titleHi: "बोटॉक्स एवं थ्रेड लिफ्ट", href: "/dermatology/treatments/injectables-thread-lift" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-2 sm:py-2.5 shadow-sm"
          : "bg-white/95 backdrop-blur-md border-b border-slate-100 py-2.5 sm:py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group py-1">
          <AcordLogo size={scrolled ? 48 : 54} />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 text-xs font-semibold text-slate-700">
          {/* Rheumatology Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setRheumMegaOpen(true)}
            onMouseLeave={() => setRheumMegaOpen(false)}
          >
            <Link
              href="/rheumatology"
              onClick={() => setRheumMegaOpen(false)}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                pathname.startsWith("/rheumatology") || rheumMegaOpen
                  ? "text-[#1CA7EC] bg-[#1CA7EC]/10 font-bold"
                  : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
              }`}
            >
              <span>{t("Rheumatology", "रूमेटोलॉजी")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${rheumMegaOpen ? "rotate-180 text-[#1F2F98]" : ""}`} />
            </Link>

            {rheumMegaOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-[680px] rounded-3xl bg-white border border-slate-200 shadow-[0_30px_70px_-10px_rgba(15,23,42,0.22),0_0_1px_rgba(0,0,0,0.1)] p-6 grid grid-cols-12 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="col-span-7 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F2F98] flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        {t("Key Conditions", "प्रमुख बीमारियां")}
                      </span>
                      <Link href="/rheumatology/conditions" className="text-[11px] text-[#1CA7EC] hover:underline font-bold">
                        {t("All 10 Conditions →", "सभी 10 रोग →")}
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                      {rheumLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="px-2.5 py-2 rounded-xl bg-slate-50 hover:bg-[#1CA7EC]/10 hover:text-[#1F2F98] text-slate-700 transition-colors border border-slate-200/80 hover:border-[#1CA7EC]/40 flex items-center gap-1.5 font-medium shadow-none"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1F2F98] shrink-0" />
                          <span className="truncate">{isHindi ? item.titleHi : item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href="/rheumatology/treatments"
                      className="px-3 py-1.5 rounded-lg bg-[#1F2F98]/10 text-[#1F2F98] hover:bg-[#1F2F98]/20 text-xs font-bold transition-colors"
                    >
                      {t("Biologics Infusion", "बायोलॉजिकल दवाएं")}
                    </Link>
                    <Link
                      href="/rheumatology/procedures"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      {t("MSK Ultrasound", "अल्ट्रासाउंड")}
                    </Link>
                  </div>
                </div>

                <div className="col-span-5 rounded-2xl bg-gradient-to-br from-[#F0F9FF] via-slate-50 to-white p-5 border border-[#1F2F98]/20 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={drAakash.image}
                        alt={drAakash.name}
                        className="w-12 h-12 rounded-xl object-cover object-top border-2 border-[#1F2F98]/30 shadow-sm"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#1F2F98] uppercase tracking-wider block">
                          {t("Department Lead", "विभागाध्यक्ष")}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{isHindi ? drAakash.nameHi : drAakash.name}</h4>
                        <span className="text-[10px] text-[#1CA7EC] font-mono font-semibold block">AIR 1, PGIMER Chandigarh</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {t(
                        "AIIMS & JIPMER trained; Specialises in targeted biologics & severe autoimmunity.",
                        "एम्स एवं जिपमर प्रशिक्षित; बायोलॉजिकल दवाएं व गंभीर ऑटोइम्यूनिटी विशेषज्ञ।"
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => openBooking({ specialty: "rheumatology", doctor: drAakash.id })}
                    className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#1F2F98] text-white text-xs font-bold hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t("Book Rheumatology", "परामर्श बुक करें")}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dermatology Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setDermMegaOpen(true)}
            onMouseLeave={() => setDermMegaOpen(false)}
          >
            <Link
              href="/dermatology"
              onClick={() => setDermMegaOpen(false)}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                pathname.startsWith("/dermatology") || dermMegaOpen
                  ? "text-[#1CA7EC] bg-[#1CA7EC]/10 font-bold"
                  : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
              }`}
            >
              <span>{t("Dermatology & Hair", "त्वचा एवं बाल")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dermMegaOpen ? "rotate-180 text-[#1CA7EC]" : ""}`} />
            </Link>

            {dermMegaOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-[680px] rounded-3xl bg-white border border-slate-200 shadow-[0_30px_70px_-10px_rgba(15,23,42,0.22),0_0_1px_rgba(0,0,0,0.1)] p-6 grid grid-cols-12 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="col-span-7 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1CA7EC] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t("Key Procedures", "प्रमुख उपचार")}
                      </span>
                      <Link href="/dermatology" className="text-[11px] text-[#1CA7EC] hover:underline font-bold">
                        {t("All 11 Procedures →", "सभी 11 उपचार →")}
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                      {dermLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="px-2.5 py-2 rounded-xl bg-slate-50 hover:bg-[#1CA7EC]/10 hover:text-[#1F2F98] text-slate-700 transition-colors border border-slate-200/80 hover:border-[#1CA7EC]/40 flex items-center gap-1.5 font-medium shadow-none"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1CA7EC] shrink-0" />
                          <span className="truncate">{isHindi ? item.titleHi : item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href="/dermatology/treatments/vitiligo-surgeries"
                      className="px-3 py-1.5 rounded-lg bg-[#1CA7EC]/10 text-[#1CA7EC] hover:bg-[#1CA7EC]/20 text-xs font-bold transition-colors"
                    >
                      {t("Vitiligo Surgery", "विटिलिगो सर्जरी")}
                    </Link>
                    <Link
                      href="/dermatology/treatments/hair-restoration-transplant"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      {t("FUE Transplant", "हेयर ट्रांसप्लांट")}
                    </Link>
                  </div>
                </div>

                <div className="col-span-5 rounded-2xl bg-gradient-to-br from-[#F0F9FF] via-slate-50 to-white p-5 border border-[#1CA7EC]/20 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={drAnkita.image}
                        alt={drAnkita.name}
                        className="w-12 h-12 rounded-xl object-cover object-top border-2 border-[#1CA7EC]/30 shadow-sm"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#1CA7EC] uppercase tracking-wider block">
                          {t("Department Lead", "विभागाध्यक्ष")}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{isHindi ? drAnkita.nameHi : drAnkita.name}</h4>
                        <span className="text-[10px] text-[#1CA7EC] font-mono font-semibold block">NEET PG AIR 1488 · AIIMS 456</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {t(
                        "South Korea, Chandigarh & Mumbai Fellowships; Specialist in vitiligo grafting & lasers.",
                        "दक्षिण कोरिया, चंडीगढ़ एवं मुंबई से फेलोशिप; विटिलिगो सर्जरी व लेजर विशेषज्ञ।"
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => openBooking({ specialty: "dermatology", doctor: drAnkita.id })}
                    className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#1CA7EC] text-white text-xs font-bold hover:bg-[#1AA7EC] transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t("Book Dermatology", "परामर्श बुक करें")}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/doctors"
            className={`px-3 py-2 rounded-xl transition-colors ${
              pathname.startsWith("/doctors") ? "text-[#1CA7EC] font-bold bg-[#1CA7EC]/10" : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
            }`}
          >
            {t("Doctors", "चिकित्सक")}
          </Link>

          <Link
            href="/technology"
            className={`px-3 py-2 rounded-xl transition-colors ${
              pathname.startsWith("/technology") ? "text-[#1CA7EC] font-bold bg-[#1CA7EC]/10" : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
            }`}
          >
            {t("Technology", "उपकरण")}
          </Link>

          <Link
            href="/results"
            className={`px-3 py-2 rounded-xl transition-colors ${
              pathname.startsWith("/results") ? "text-[#1CA7EC] font-bold bg-[#1CA7EC]/10" : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
            }`}
          >
            {t("Results", "परिणाम")}
          </Link>

          <Link
            href="/locations"
            className={`px-3 py-2 rounded-xl transition-colors ${
              pathname.startsWith("/locations") ? "text-[#1CA7EC] font-bold bg-[#1CA7EC]/10" : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
            }`}
          >
            {t("Locations", "शाखाएं")}
          </Link>

          <Link
            href="/patient-hub"
            className={`px-3 py-2 rounded-xl transition-colors ${
              pathname.startsWith("/patient-hub") ? "text-[#1CA7EC] font-bold bg-[#1CA7EC]/10" : "text-slate-700 hover:text-[#1CA7EC] hover:bg-slate-100/80"
            }`}
          >
            {t("Patient Hub", "हेल्थ गाइड")}
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bilingual Language Switcher (Segmented Pill) - Always visible on navbar just left of hamburger */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs shadow-inner">
            <button
              onClick={() => setLang("en")}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                lang === "en"
                  ? "bg-[#1F2F98] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Switch to English"
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                lang === "hi"
                  ? "bg-[#1CA7EC] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="हिंदी में बदलें"
              aria-label="हिंदी में बदलें"
            >
              हिंदी
            </button>
          </div>

          {/* Quick Call Icon Button - Desktop & Tablet */}
          <a
            href={`tel:${primaryBranch.phone}`}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-[#1CA7EC]/10 hover:border-[#1CA7EC]/40 border border-slate-200 text-slate-800 transition-all shadow-sm group"
            title={`${t("Call ACORD Clinics", "कॉल करें")}: ${primaryBranch.phoneDisplay || primaryBranch.phone}`}
            aria-label="Call ACORD Clinics"
          >
            <Phone className="w-4 h-4 text-[#1CA7EC] group-hover:scale-110 transition-transform" />
          </a>

          {/* Book Button - Desktop & Tablet */}
          <button
            onClick={() => openBooking()}
            className="hidden md:flex px-4 sm:px-5 py-2 rounded-full bg-[#1CA7EC] text-white font-bold text-xs shadow-azure-glow hover:bg-[#1AA7EC] transition-all items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t("Book Appointment", "अपॉइंटमेंट")}</span>
          </button>

          {/* Dedicated Hamburger / Close Toggle Button for Mobile */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden p-2 rounded-2xl border transition-all active:scale-95 shadow-sm flex items-center justify-center ${
              mobileMenuOpen
                ? "bg-[#1CA7EC]/10 border-[#1CA7EC]/40 text-[#1F2F98]"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900"
            }`}
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#1F2F98] animate-in spin-in-90 duration-200" />
            ) : (
              <Menu className="w-5 h-5 text-[#1F2F98]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Navigation Drawer (Slider) */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 top-[56px] sm:top-[64px] bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Panel from the Right */}
          <aside
            className="fixed top-[56px] sm:top-[64px] right-0 bottom-0 w-[86%] max-w-sm bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between z-40 animate-in slide-in-from-right duration-300 overflow-y-auto"
            aria-label="Mobile Navigation"
          >
            {/* Slider Content */}
            <div className="p-4 sm:p-5 space-y-5 flex-1 overflow-y-auto">
              {/* Speciality Links */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {t("Clinical Specialities", "विभाग एवं परामर्श")}
                </span>

                <Link
                  href="/rheumatology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-800 hover:border-[#1F2F98] hover:bg-[#F0F9FF] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1F2F98]/10 text-[#1F2F98] flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-slate-900 group-hover:text-[#1F2F98]">
                        {t("Rheumatology & Autoimmunity", "रूमेटोलॉजी एवं गठिया")}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {t("Dr. Aakash Singh (AIR 1 PGIMER)", "डॉ. आकाश सिंह")}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#1F2F98] transition-all shrink-0" />
                </Link>

                <Link
                  href="/dermatology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-800 hover:border-[#1CA7EC] hover:bg-[#F0F9FF] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1CA7EC]/10 text-[#1CA7EC] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-slate-900 group-hover:text-[#1CA7EC]">
                        {t("Dermatology & Hair Science", "त्वचा, बाल एवं लेजर")}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {t("Dr. Ankita Pundir (AIIMS)", "डॉ. अंकिता पुंडीर")}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#1CA7EC] transition-all shrink-0" />
                </Link>
              </div>

              {/* General Navigation Links */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {t("Navigation", "मुख्य पृष्ठ")}
                </span>

                {[
                  { href: "/doctors", title: t("Specialist Doctors", "विशेषज्ञ चिकित्सक") },
                  { href: "/technology", title: t("Technology & Medical Lasers", "उपकरण एवं तकनीक") },
                  { href: "/results", title: t("Clinical Results & Gallery", "परिणाम एवं गैलरी") },
                  { href: "/locations", title: t("Gorakhpur & Bhagalpur Branches", "क्लिनिक शाखाएं") },
                  { href: "/patient-hub", title: t("Patient Education & FAQs", "रोगी मार्गदर्शिका एवं FAQs") },
                  { href: "/about", title: t("About ACORD Clinics", "हमारे बारे में") },
                  { href: "/contact", title: t("Contact & Support", "संपर्क एवं परामर्श") },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm shadow-md shadow-[#1CA7EC]/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>{t("Book Consultation Slot", "अपॉइंटमेंट स्लॉट बुक करें")}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${primaryBranch.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1CA7EC]" />
                  <span>{t("Call Clinic", "कॉल करें")}</span>
                </a>

                <a
                  href={`https://wa.me/${primaryBranch.whatsapp}?text=${encodeURIComponent(
                    "Hello ACORD Clinics, I would like to book a specialist appointment."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
