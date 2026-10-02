"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FAQ_DATABASE } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQHubPage() {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <Link href="/patient-hub" className="hover:text-[#1CA7EC]">Patient Hub</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">FAQs</span>
        </div>

        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Patient Information</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(
              "Clear answers regarding appointments, insurance, cold-chain biologics, laser safety, and recovery.",
              "अपॉइंटमेंट, बायोलॉजिकल दवाएं, लेजर सुरक्षा और परामर्श से जुड़े सवाल।"
            )}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQ_DATABASE.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-[#1CA7EC] transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {isHindi ? faq.qHi : faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1CA7EC] transition-transform shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {isHindi ? faq.aHi : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 text-center space-y-4 shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t("Still have questions? We're here to help.", "कोई अन्य प्रश्न है? हम सहायता के लिए उपलब्ध हैं।")}
          </h3>
          <p className="text-xs text-slate-600">
            {t("Speak directly with our clinic coordinators in Gorakhpur or Bhagalpur.", "गोरखपुर या भागलपुर शाखा में सीधे कॉल या व्हाट्सएप करें।")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => openBooking()}
              className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
            >
              {t("Book Consultation", "अपॉइंटमेंट बुक करें")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
