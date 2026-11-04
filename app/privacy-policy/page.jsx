"use client";
import React from "react";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Privacy Policy", "गोपनीयता नीति")}</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Data Protection & Patient Confidentiality", "डेटा सुरक्षा एवं रोगी गोपनीयता")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t("Privacy Policy", "गोपनीयता नीति (Privacy Policy)")}
          </h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("1. Information We Collect", "1. हमारे द्वारा एकत्रित जानकारी")}
            </h2>
            <p>
              {t(
                "When you book an appointment, submit an inquiry form, or communicate with our desk via WhatsApp, we collect basic patient information such as your name, contact phone number, city, and brief clinical concern.",
                "जब आप अपॉइंटमेंट बुक करते हैं, पूछताछ फॉर्म जमा करते हैं, या व्हाट्सएप पर संपर्क करते हैं, तो हम आपका नाम, संपर्क नंबर, शहर और प्राथमिक समस्या जैसी आवश्यक जानकारी एकत्रित करते हैं।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("2. Use of Medical Data & Confidentiality", "2. मेडिकल डेटा का उपयोग एवं गोपनीयता")}
            </h2>
            <p>
              {t(
                "Your personal health information is strictly confidential. We never sell, rent, or lease patient contact details or medical histories to any third-party marketing companies. Data is used solely for clinical appointments and patient care navigation.",
                "आपकी व्यक्तिगत स्वास्थ्य जानकारी पूरी तरह गोपनीय रखी जाती है। हम आपकी जानकारी किसी भी तृतीय-पक्ष विज्ञापन कंपनियों को साझा नहीं करते हैं। डेटा केवल क्लिनिकल देखभाल हेतु उपयोग किया जाता है।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("3. Direct Contact & Updates", "3. संपर्क एवं पूछताछ")}
            </h2>
            <p>
              {t(
                "If you have queries regarding your data or medical records, please contact our administrative desk at ",
                "यदि आपके पास अपने डेटा या मेडिकल रिकॉर्ड के संबंध में कोई प्रश्न हैं, तो कृपया हमारे संपर्क ईमेल पर लिखें: "
              )}
              <span className="text-[#1F2F98] font-mono font-bold">{CLINIC_INFO.email}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
