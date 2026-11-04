"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { ShieldAlert } from "lucide-react";

export default function MedicalDisclaimerPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">{t("Home", "होम")}</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">{t("Medical Disclaimer", "चिकित्सीय अस्वीकरण")}</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Statutory Medical Notice", "वैधानिक चिकित्सा सूचना")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t("Medical Disclaimer & Ethical Practice Statement", "चिकित्सीय अस्वीकरण एवं नैतिक घोषणा")}
          </h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("1. Not a Substitute for Direct Medical Consultation", "1. प्रत्यक्ष चिकित्सकीय परामर्श का विकल्प नहीं")}
            </h2>
            <p>
              {t(
                "The content published on this website (including text, graphics, images, procedures, symptom check guides, and blog articles) is for educational and informational awareness only. It does not constitute medical advice, diagnosis, or personalized treatment recommendations.",
                "इस वेबसाइट पर प्रकाशित सामग्री (लेख, चित्र, लक्षण जांच मार्गदर्शिका आदि) केवल शैक्षणिक और जन-जागरूकता के उद्देश्य से है। यह किसी भी प्रकार की चिकित्सीय सलाह या प्रत्यक्ष निदान का विकल्प नहीं है।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("2. Doctor-Patient Relationship", "2. डॉक्टर-मरीज संबंध")}
            </h2>
            <p>
              {t(
                "Browsing this website, submitting an appointment inquiry, or messaging via WhatsApp does not automatically form a doctor-patient relationship until an in-person or verified teleconsultation has been formally conducted by our registered medical practitioners.",
                "वेबसाइट ब्राउज़ करने या व्हाट्सएप पर संदेश भेजने मात्र से डॉक्टर-मरीज संबंध स्थापित नहीं होता है। औपचारिक परामर्श डॉक्टर से मिलने या सत्यापित टेलीकंसल्टेशन के बाद ही शुरू होता है।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("3. Emergency Care Notice", "3. आपातकालीन चिकित्सा सूचना")}
            </h2>
            <p>
              {t(
                "If you are experiencing acute medical emergencies such as sudden severe chest pain, shortness of breath, sudden visual loss, acute paralysis, or life-threatening drug reactions, please visit the nearest hospital emergency room immediately.",
                "यदि आप किसी गंभीर आपात स्थिति (जैसे अचानक सीने में तेज दर्द, सांस फूलना, अचानक रोशनी जाना आदि) का सामना कर रहे हैं, तो कृपया तुरंत नजदीकी अस्पताल के आपातकालीन कक्ष में संपर्क करें।"
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t("4. Treatment Results & Variations", "4. उपचार परिणाम एवं भिन्नताएं")}
            </h2>
            <p>
              {t(
                "Before and after photographs, testimonials, and case studies displayed on this platform are for illustrative and clinical educational purposes with patient consent. Medical and aesthetic outcomes vary based on individual biological factors, severity, compliance, and lifestyle.",
                "वेबसाइट पर दिखाए गए परिणाम, फोटोग्राफ और अनुभव मरीजों की सहमति से केवल उदाहरण और समझ के लिए हैं। प्रत्येक मरीज के परिणाम उनकी शारीरिक स्थिति और रोग की गंभीरता के अनुसार भिन्न हो सकते हैं।"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
