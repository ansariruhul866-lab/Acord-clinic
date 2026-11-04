"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Terms of Service", "नियम एवं शर्तें")}</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Clinic Portal Terms", "क्लिनिक नियम एवं शर्तें")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t("Terms of Service", "सेवा की शर्तें (Terms of Service)")}
          </h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("1. Appointment Scheduling & Tokens", "1. अपॉइंटमेंट एवं टोकन व्यवस्था")}
            </h2>
            <p>
              {t(
                "Online appointment booking facilitates direct token allocation with our front desk. While we strive to adhere strictly to time slots, priority is given to emergency and acute patient admissions when required.",
                "ऑनलाइन अपॉइंटमेंट बुकिंग से आपको प्राथमिकता टोकन प्राप्त होता है। हम समय का कड़ाई से पालन करने का प्रयास करते हैं, हालांकि आपातकालीन मरीजों को प्राथमिकता दी जा सकती है।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("2. Medical Consultation Fees", "2. चिकित्सकीय परामर्श शुल्क")}
            </h2>
            <p>
              {t(
                "Consultation charges, investigation fees, and procedure costs are clearly communicated at our registration desks without hidden markups.",
                "परामर्श शुल्क, जांच शुल्क एवं प्रक्रियाओं की लागत पंजीकरण डेस्क पर पूरी पारदर्शिता के साथ बताई जाती है।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("3. Intellectual Property", "3. बौद्धिक संपदा")}
            </h2>
            <p>
              {t(
                "All branding, logos, graphics, and clinical write-ups are the property of ACORD Clinics. Reproduction without prior written permission is prohibited.",
                "वेबसाइट पर मौजूद सभी ब्रांडिंग, लोगो, ग्राफिक्स और चिकित्सकीय लेख एकॉर्ड क्लिनिक्स की संपत्ति हैं।"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
