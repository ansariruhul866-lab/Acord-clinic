"use client";
import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { Clock, User } from "lucide-react";

export default function BlogArticleDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <Link href="/patient-hub" className="hover:text-[#1CA7EC]">{t("Patient Hub", "रोगी शिक्षा केंद्र")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{(isHindi ? article.titleHi : article.title).slice(0, 30)}...</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#F0F9FF] text-[#1F2F98] text-xs font-bold uppercase tracking-wider inline-block border border-[#1CA7EC]/20">
            {article.specialty}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isHindi ? article.titleHi : article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1.5 text-slate-900 font-medium">
              <User className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{isHindi ? (article.author.includes("Aakash") ? "डॉ. आकाश सिंह" : "डॉ. अंकिता पुंडीर") : article.author}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1CA7EC]" />
              <span>{isHindi ? t(article.readTime, "५ मिनट पठन") : article.readTime}</span>
            </span>
            <span>·</span>
            <span>{isHindi ? t(article.date, "अक्टूबर २०२६") : article.date}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt */}
        <div className="p-6 rounded-2xl bg-[#F0F9FF] border-l-4 border-[#1CA7EC] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium shadow-sm">
          {isHindi ? article.excerptHi : article.excerpt}
        </div>

        {/* Article Body */}
        <div className="max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <div className="whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Doctor CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {t("Have Questions About this Condition?", "इस बीमारी या इलाज के बारे में डॉक्टर से परामर्श लें")}
            </h3>
            <p className="text-xs text-slate-600">
              {t("Consult our specialists at Gorakhpur or Bhagalpur branch.", "गोरखपुर या भागलपुर शाखा में विशेषज्ञ परामर्श उपलब्ध है।")}
            </p>
          </div>
          <button
            onClick={() => openBooking()}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shrink-0 shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
          >
            {t("Book Consultation", "अपॉइंटमेंट बुक करें")}
          </button>
        </div>
      </div>
    </div>
  );
}
