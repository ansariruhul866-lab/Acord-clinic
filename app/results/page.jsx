"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BEFORE_AFTER_CASES, DOCTORS, CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
  Activity,
  Award,
  Star,
  Layers,
  ChevronRight
} from "lucide-react";

export default function ResultsGalleryPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  const [activeCategory, setActiveCategory] = useState("All");
  const [sliderPositions, setSliderPositions] = useState({
    "case-vitiligo": 50,
    "case-hair": 50,
    "case-acne-scars": 50,
    "case-rheum-hand": 50,
    "case-melasma": 50,
    "case-beard-hair": 50,
  });

  const categories = [
    { id: "All", label: "All Results", labelHi: "सभी परिणाम" },
    { id: "Dermatology", label: "Dermatology & Skin", labelHi: "त्वचा एवं लेजर" },
    { id: "Hair Restoration", label: "Hair Transplant & FUE", labelHi: "हेयर ट्रांसप्लांट" },
    { id: "Rheumatology", label: "Rheumatology & Joints", labelHi: "गठिया एवं जोड़" },
  ];

  // Extended clinical cases for a comprehensive results page
  const ALL_CASES = [
    ...BEFORE_AFTER_CASES,
    {
      id: "case-rheum-hand",
      title: "Biologics Remission in Severe Rheumatoid Arthritis",
      titleHi: "गंभीर रूमेटाइड गठिया में बायोलॉजिकल थेरेपी से दर्द व सूजन से मुक्ति",
      category: "Rheumatology",
      procedure: "Targeted Anti-TNF Biologic Infusion",
      timeframe: "12 Weeks Follow-up",
      description: "Resolved bilateral PIP and MCP joint synovitis with complete restoration of grip strength and morning stiffness reduced from 2 hours to 0.",
      descriptionHi: "दोनों हाथों की उंगलियों की सूजन में पूर्ण सुधार। मुट्ठी बंद करने की क्षमता वापस और सुबह का अकड़न समाप्त।",
      beforeImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "case-melasma",
      title: "Q-Switched Nd:YAG Laser for Resistant Melasma",
      titleHi: "जिद्दी झाइयों एवं पिगमेंटेशन का Nd:YAG लेजर उपचार",
      category: "Dermatology",
      procedure: "Laser Toning + Tranexamic Acid Peels",
      timeframe: "6 Sessions (3 Months)",
      description: "Significant 85% clearing of dermal-epidermal cheek pigmentation without rebound hyperpigmentation or skin thinning.",
      descriptionHi: "गालों की गहरी झाइयों में 85% तक का उल्लेखनीय सुधार, बिना किसी साइड इफेक्ट के।",
      beforeImage: "https://images.unsplash.com/photo-1512290900672-1f02e71dfcf8?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "case-beard-hair",
      title: "Crown Density & Temple Hairline Restoration",
      titleHi: "क्राउन और टेम्पल हेयरलाइन का प्राकृतिक पुनर्निर्माण",
      category: "Hair Restoration",
      procedure: "Micro-FUE + Growth Factor (GFC) Concentrate",
      timeframe: "8 Months Post-Op",
      description: "Dense, natural hairline contouring with high graft survival rate and undetectable donor area scarring.",
      descriptionHi: "प्राकृतिक हेयरलाइन और घने बाल। डोनर एरिया पर कोई निशान नहीं।",
      beforeImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredCases =
    activeCategory === "All"
      ? ALL_CASES
      : ALL_CASES.filter((c) => c.category === activeCategory);

  const handleSliderChange = (id, value) => {
    setSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  const drAakash = DOCTORS.find((d) => d.id === "dr-aakash") || DOCTORS[0];
  const drAnkita = DOCTORS.find((d) => d.id === "dr-ankita") || DOCTORS[1];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900">
      {/* 1. HERO HEADER SECTION (Full Width Max 7XL) */}
      <section className="bg-gradient-to-b from-[#F0F9FF] via-white to-slate-50 border-b border-slate-200/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#1CA7EC] transition-colors">
              {t("Home", "होम")}
            </Link>
            <span>/</span>
            <span className="text-[#1F2F98] font-bold">
              {t("Clinical Results & Transformations", "उपचार परिणाम एवं सफलता")}
            </span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1CA7EC]/30 shadow-sm text-[#1F2F98] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{t("Verified Patient Case Gallery", "प्रमाणित रोगी उपचार परिणाम")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {t("Real Patient Results,", "वैज्ञानिक तकनीक से")}{" "}
              <span className="bg-gradient-to-r from-[#1F2F98] via-[#1CA7EC] to-[#13BEB5] bg-clip-text text-transparent">
                {t("Backed by Science", "वास्तविक क्लिनिकल परिणाम")}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {t(
                "Interact with verified before & after transformations treated at ACORD Clinics. Every case reflects ethical, evidence-based protocols led by Dr. Ankita Pundir (Dermatology, AIIMS & South Korea Fellow) and Dr. Aakash Singh (DM Rheumatology, AIR-1 PGIMER Chandigarh).",
                "ACORD क्लिनिक्स में उपचारित मरीजों के परिणाम देखें। स्लाइडर को आगे-पीछे खींचकर देखें उपचार से पहले और बाद का वास्तविक बदलाव।"
              )}
            </p>
          </div>

          {/* Clinical Highlights Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#1F2F98]">1,500+</div>
              <div className="text-xs font-bold text-slate-800">
                {t("Dermatosurgeries & FUE", "डर्मेटोसर्जरी एवं FUE")}
              </div>
              <div className="text-[11px] text-slate-500">
                {t("Performed with high graft survival", "उच्च सफलता दर के साथ संपन्न")}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#13BEB5]">95%+</div>
              <div className="text-xs font-bold text-slate-800">
                {t("Vitiligo Repigmentation", "विटिलिगो में रंग वापस")}
              </div>
              <div className="text-[11px] text-slate-500">
                {t("In stable surgical grafting cases", "सफल सर्जिकल ग्राफ्टिंग द्वारा")}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#1CA7EC]">85%+</div>
              <div className="text-xs font-bold text-slate-800">
                {t("Biologic Remission", "बायोलॉजिकल रेमिशन")}
              </div>
              <div className="text-[11px] text-slate-500">
                {t("In complex rheumatoid & spondylitis", "गंभीर गठिया व स्पॉन्डिलाइटिस में")}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center gap-1 text-amber-500 font-black text-2xl sm:text-3xl">
                <Star className="w-5 h-5 fill-amber-500" />
                <span>4.9 / 5</span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {t("1,000+ Reviews", "1,000+ गूगल समीक्षाएं")}
              </div>
              <div className="text-[11px] text-slate-500">
                {t("Verified patient satisfaction", "प्रमाणित रोगी संतुष्टि")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTERABLE INTERACTIVE BEFORE & AFTER GALLERY (Full 7XL Width Grid) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pb-2 border-b border-slate-200">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#1F2F98] text-white shadow-md shadow-[#1F2F98]/20 scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-[#89EAD7]" : "bg-slate-300"
                    }`}
                  />
                  <span>{isHindi ? cat.labelHi : cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Case Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((item) => {
              const pos = sliderPositions[item.id] || 50;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden p-6 flex flex-col justify-between hover:border-[#1CA7EC] hover:shadow-xl transition-all shadow-sm group"
                >
                  {/* Slider Viewport */}
                  <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden select-none mb-5 bg-slate-100">
                    <img
                      src={item.afterImage}
                      alt={`${item.title} After Treatment`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Before Image Mask */}
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden"
                      style={{ width: `${pos}%` }}
                    >
                      <img
                        src={item.beforeImage}
                        alt={`${item.title} Before Treatment`}
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: "100%", height: "100%" }}
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/20 shadow-sm">
                        {t("Before", "पहले")}
                      </div>
                    </div>

                    {/* After Tag */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#1CA7EC] backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/30 shadow-sm">
                      {t("After", "बाद में")}
                    </div>

                    {/* Slider Line Divider */}
                    <div
                      className="absolute inset-y-0 w-1 bg-[#1CA7EC] shadow-[0_0_10px_rgba(28,167,236,0.6)] cursor-ew-resize flex items-center justify-center pointer-events-none"
                      style={{ left: `calc(${pos}% - 2px)` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1F2F98] border-2 border-[#1CA7EC] text-white flex items-center justify-center text-xs font-black shadow-lg">
                        ⇄
                      </div>
                    </div>

                    {/* Interactive Range Input */}
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={pos}
                      onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                      aria-label={`Slide to compare before and after for ${item.title}`}
                    />
                  </div>

                  {/* Case Content */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="font-bold text-[#1CA7EC] truncate">{item.procedure}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] shrink-0 font-semibold">
                        {item.timeframe}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-[#1F2F98] transition-colors">
                      {isHindi ? item.titleHi : item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isHindi ? item.descriptionHi : item.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {item.category}
                      </span>
                      <button
                        onClick={() =>
                          openBooking({
                            specialty: item.category.toLowerCase().includes("rheum")
                              ? "rheumatology"
                              : "dermatology",
                          })
                        }
                        className="text-xs font-bold text-[#1F2F98] hover:text-[#1CA7EC] flex items-center gap-1 transition-colors"
                      >
                        <span>{t("Book Similar Case", "परामर्श लें")}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clinical Consent Disclaimer */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-600 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#13BEB5] shrink-0" />
            <span className="leading-relaxed">
              {t(
                "All clinical photographs and medical metrics are documented with formal patient consent under strict ethical guidelines. Results are individual and depend on biological compliance and condition severity.",
                "सभी चिकित्सकीय परिणाम मरीज की सहमति से प्रकाशित हैं। व्यक्तिगत परिणाम प्रत्येक मरीज की शारीरिक स्थिति के अनुसार भिन्न हो सकते हैं।"
              )}
            </span>
          </div>
        </div>
      </section>

      {/* 3. EXPERT DIRECTORS CONSULTATION SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t("Consult the Specialists Behind the Results", "विशेषज्ञ डॉक्टरों से परामर्श लें")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t(
                "Personalized clinical evaluations with in-house ultrasound, lasers, and cold-chain biologics.",
                "गोरखपुर एवं भागलपुर क्लिनिक में सीधा परामर्श।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dr. Aakash */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/25 space-y-5 flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F2F98]/10 text-[#1F2F98] text-[11px] font-bold uppercase">
                  <span>{t("Rheumatology & Autoimmunity", "रूमेटोलॉजी एवं इम्यूनोलॉजी")}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isHindi ? drAakash.nameHi : drAakash.name}
                </h3>
                <p className="text-xs text-[#1F2F98] font-bold">
                  MD (Medicine), DM (Clinical Immunology & Rheumatology) · AIR-1 PGIMER
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHindi ? drAakash.bioHi : drAakash.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1CA7EC]/20 flex flex-wrap gap-3">
                <button
                  onClick={() => openBooking({ specialty: "rheumatology", doctor: "dr-aakash" })}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#1F2F98] text-white font-bold text-xs hover:bg-[#1CA7EC] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("Book Arthritis Consult", "गठिया परामर्श बुक करें")}</span>
                </button>
                <Link
                  href="/doctors/dr-aakash-singh"
                  className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  {t("Profile", "प्रोफाइल")}
                </Link>
              </div>
            </div>

            {/* Dr. Ankita */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F0FDFA] border border-[#13BEB5]/30 space-y-5 flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13BEB5]/15 text-[#114E3F] text-[11px] font-bold uppercase">
                  <span>{t("Dermatology & Aesthetics", "डर्मेटोलॉजी एवं एस्थेटिक्स")}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isHindi ? drAnkita.nameHi : drAnkita.name}
                </h3>
                <p className="text-xs text-[#13BEB5] font-bold">
                  MBBS, MD (Dermatology, Venereology & Leprosy) · AIIMS & South Korea Fellow
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHindi ? drAnkita.bioHi : drAnkita.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#13BEB5]/20 flex flex-wrap gap-3">
                <button
                  onClick={() => openBooking({ specialty: "dermatology", doctor: "dr-ankita" })}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#13BEB5] to-[#21C6C2] text-white font-bold text-xs hover:opacity-95 transition-opacity shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("Book Skin/Hair Consult", "त्वचा/बाल परामर्श बुक करें")}</span>
                </button>
                <Link
                  href="/doctors/dr-ankita-pundir"
                  className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  {t("Profile", "प्रोफाइल")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1F2F98] via-[#1CA7EC] to-[#13BEB5] text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t("Ready to Begin Your Own Clinical Transformation?", "क्या आप अपने उपचार की शुरुआत करने के लिए तैयार हैं?")}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t(
              "Schedule your in-person evaluation at our Gorakhpur or Bhagalpur centres. Direct appointments and video follow-ups available.",
              "गोरखपुर या भागलपुर केंद्र पर विशेषज्ञ डॉक्टरों से परामर्श हेतु समय लें।"
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openBooking()}
              className="px-8 py-3.5 rounded-2xl bg-white text-[#1F2F98] font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#1CA7EC]" />
              <span>{t("Book Instant Consultation", "तुरंत अपॉइंटमेंट बुक करें")}</span>
            </button>

            <a
              href={`https://wa.me/${CLINIC_INFO.branches[0].whatsapp}?text=${encodeURIComponent(
                "Hello ACORD Clinics, I viewed your clinical results gallery and would like to book a consultation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
