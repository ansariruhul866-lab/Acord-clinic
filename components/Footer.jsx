"use client";
import React from "react";
import Link from "next/link";
import { AcordLogo } from "@/components/AcordLogo";
import { useLanguage } from "@/lib/language-context";
import { useReducedEffects } from "@/lib/reduced-effects-context";
import { CLINIC_INFO, RHEUMATOLOGY_CONDITIONS, DERMATOLOGY_TREATMENTS } from "@/lib/data";
import { Phone, ShieldCheck, Globe, Sliders, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const { lang, setLang, t, isHindi } = useLanguage();
  const { reducedEffects, toggleReducedEffects } = useReducedEffects();

  return (
    <footer className="bg-[#F8FAFC] text-slate-600 border-t border-slate-200 pt-14 pb-24 lg:pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <Link href="/">
            <AcordLogo size={52} />
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={toggleReducedEffects}
              className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                reducedEffects
                  ? "bg-[#1CA7EC]/10 border-[#1CA7EC] text-[#1F2F98]"
                  : "bg-white border-slate-300 text-slate-600 hover:text-slate-900 shadow-sm"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{reducedEffects ? "Reduced Effects: ON" : "Reduce Effects"}</span>
            </button>

            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-[#1F2F98] font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{lang === "en" ? "हिन्दी संस्करण" : "English Version"}</span>
            </button>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
              {t("Rheumatology & Autoimmune", "रूमेटोलॉजी विभाग")}
            </h3>
            <ul className="space-y-2 text-xs">
              {RHEUMATOLOGY_CONDITIONS.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href={`/rheumatology/conditions/${c.slug}`} className="hover:text-[#1CA7EC] transition-colors">
                    {isHindi ? c.titleHi.split("(")[0] : c.title.split("(")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rheumatology/treatments" className="text-[#1CA7EC] font-bold hover:underline flex items-center gap-1">
                  <span>{t("Biologics Infusions", "बायोलॉजिकल दवाएं")}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1CA7EC]">
              {t("Dermatology & Aesthetics", "डर्मेटोलॉजी विभाग")}
            </h3>
            <ul className="space-y-2 text-xs">
              {DERMATOLOGY_TREATMENTS.slice(0, 5).map((tr) => (
                <li key={tr.id}>
                  <Link href={`/dermatology/treatments/${tr.slug}`} className="hover:text-[#1F2F98] transition-colors">
                    {isHindi ? tr.titleHi.split("(")[0] : tr.title.split("(")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dermatology/treatments/vitiligo-surgeries" className="text-[#1CA7EC] font-bold hover:underline flex items-center gap-1">
                  <span>{t("Vitiligo Surgeries", "विटिलिगो सर्जरी")}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1AA7EC]">
              {t("Clinic Resources", "क्लिनिक रिसोर्सेज")}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/doctors" className="hover:text-[#1CA7EC] transition-colors">{t("Specialist Doctors", "विशेषज्ञ चिकित्सक")}</Link></li>
              <li><Link href="/technology" className="hover:text-[#1CA7EC] transition-colors">{t("Medical Technology", "चिकित्सा उपकरण एवं तकनीक")}</Link></li>
              <li><Link href="/results" className="hover:text-[#1CA7EC] transition-colors">{t("Before & After Results", "उपचार परिणाम")}</Link></li>
              <li><Link href="/patient-hub" className="hover:text-[#1CA7EC] transition-colors">{t("Patient Hub & FAQs", "रोगी मार्गदर्शिका एवं प्रश्न")}</Link></li>
              <li><Link href="/about" className="hover:text-[#1CA7EC] transition-colors">{t("About ACORD Concept", "एकॉर्ड के बारे में")}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
              {t("Clinic Branches", "क्लिनिक शाखाएं")}
            </h3>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 text-xs">
              <div className="font-bold text-slate-900">{t("Gorakhpur Branch (UP)", "गोरखपुर शाखा (उत्तर प्रदेश)")}</div>
              <p className="text-slate-500 text-[11px]">
                {t(
                  "2nd Floor, Lotus Tower, Thana Chowk, Opp. V Bazar, near Medical College Road, Basharatpur 273003",
                  "द्वितीय तल, लोटस टॉवर, थाना चौक, वी-बाजार के सामने, मेडिकल कॉलेज रोड के पास, बशारतपुर, शाहपुर 273003"
                )}
              </p>
              <div className="pt-1 font-mono text-[#1F2F98] font-bold flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#1CA7EC]" />
                <span>+91 77029 41735 / +91 91980 43636</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 text-xs">
              <div className="font-bold text-slate-900">{t("Bhagalpur Branch (Bihar)", "भागलपुर शाखा (बिहार)")}</div>
              <p className="text-slate-500 text-[11px]">
                {t(
                  "Jai Mata Di Sweets Building, Tulsinagar Colony, Bank Colony, Bhagalpur 812001",
                  "जय माता दी स्वीट्स बिल्डिंग, तुलसीनगर कॉलोनी, बैंक कॉलोनी, भागलपुर, बिहार 812001"
                )}
              </p>
              <div className="pt-1 font-mono text-[#1F2F98] font-bold flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#1CA7EC]" />
                <span>+91 79034 68113</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Compliance */}
        <div className="p-4 rounded-2xl bg-white border border-[#1CA7EC]/30 shadow-sm text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-2 font-bold text-[#1F2F98]">
            <ShieldCheck className="w-4 h-4 text-[#1CA7EC]" />
            <span>{t("Medical Compliance Notice", "विधिक एवं नैतिक सूचना")}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {t(
              "ACORD Clinics complies with NMC medical ethics guidelines. We do not make 100% cure claims for chronic autoimmune diseases. Most patients achieve deep disease control and joint preservation with timely biological therapy. Photographic documentation is published with voluntary patient consent.",
              "राष्ट्रीय चिकित्सा आयोग (NMC) के नियमों के अनुसार एकॉर्ड क्लिनिक्स जटिल ऑटोइम्यून बीमारियों में 100% गारंटी का दावा नहीं करता है। समय पर सही इलाज द्वारा अधिकांश मरीज दर्दमुक्त व सामान्य जीवन व्यतीत करते हैं।"
            )}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t("ACORD Clinics. All Rights Reserved.", "एकॉर्ड क्लिनिक्स। सर्वाधिकार सुरक्षित।")}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-slate-800">{t("Privacy Policy", "गोपनीयता नीति")}</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-800">{t("Terms", "नियम एवं शर्तें")}</Link>
            <span>·</span>
            <Link href="/medical-disclaimer" className="hover:text-slate-800">{t("Medical Disclaimer", "चिकित्सा अस्वीकरण")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
