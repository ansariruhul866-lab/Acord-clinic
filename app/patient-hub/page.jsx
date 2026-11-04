"use client";
import React from "react";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { BookOpen, ArrowRight, HelpCircle } from "lucide-react";

export default function PatientHubPage() {
  const { t, isHindi } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Patient Education Hub", "रोगी शिक्षा केंद्र")}</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Doctor-Authored Medical Articles", "विशेषज्ञ डॉक्टरों द्वारा लिखित लेख")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Patient Hub & Clinical Insights", "रोगी शिक्षा, ब्लॉग एवं स्वास्थ्य मार्गदर्शिका")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t(
              "Evidence-based medical articles, disease management guides, and FAQs written by Dr. Aakash Singh and Dr. Ankita Pundir.",
              "गठिया, ल्यूपस, सोरायसिस, विटिलिगो और हेयर ट्रांसप्लांट पर वैज्ञानिक चिकित्सकीय लेख और जानकारियां।"
            )}
          </p>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_ARTICLES.map((art) => (
            <Link
              key={art.id}
              href={`/patient-hub/blog/${art.slug}`}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-[#1CA7EC] transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-[11px] font-bold uppercase tracking-wider border border-[#1CA7EC]/20">
                      {art.specialty}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{isHindi ? t(art.readTime, "५ मिनट पठन") : art.readTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#1F2F98] transition-colors line-clamp-2">
                    {isHindi ? art.titleHi : art.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {isHindi ? art.excerptHi : art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1CA7EC]">
                  <span>{t(`By ${art.author}`, `द्वारा: ${art.author.includes("Aakash") ? "डॉ. आकाश सिंह" : "डॉ. अंकिता पुंडीर"}`)}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{t("Read Guide", "पूरा पढ़ें")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#1CA7EC]" />
              <span>{t("Have Questions About Your Visit?", "अपॉइंटमेंट या इलाज से जुड़े सवाल?")}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              {t(
                "Find detailed answers about consulting fees, teleconsultations, laboratory tests, and appointment booking.",
                "परामर्श, ऑनलाइन वीडियो कंसल्टेशन, लैब टेस्ट और क्लिनिक आने से जुड़े सामान्य सवाल।"
              )}
            </p>
          </div>
          <Link
            href="/patient-hub/faq"
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shrink-0 shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
          >
            {t("View All Patient FAQs →", "सभी सवाल-जवाब देखें →")}
          </Link>
        </div>
      </div>
    </div>
  );
}
