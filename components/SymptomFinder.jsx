"use client";
import React, { useState } from "react";
import { SYMPTOM_CHIPS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import {
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

export const SymptomFinder = () => {
  const { t, isHindi } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedChips, setSelectedChips] = useState([]);

  const toggleChip = (id) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const hasEmergency = selectedChips.includes("sudden-vision-loss") || selectedChips.includes("painful-red-eye");

  const selectedDetails = SYMPTOM_CHIPS.filter((c) => selectedChips.includes(c.id));
  const rheumCount = selectedDetails.filter((c) => c.category === "rheumatology").length;
  const dermCount = selectedDetails.filter((c) => c.category === "dermatology").length;

  let recommendedSpecialty = null;
  if (selectedChips.length > 0) {
    if (rheumCount > 0 && dermCount > 0) recommendedSpecialty = "both";
    else if (rheumCount >= dermCount) recommendedSpecialty = "rheumatology";
    else recommendedSpecialty = "dermatology";
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Interactive Symptom Guide", "लक्षण आधारित मार्गदर्शन")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            {t("What Are You Feeling Today?", "आप आज कैसा महसूस कर रहे हैं?")}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600">
            {t(
              "Select your symptoms below to find the right super-specialist and immediate care path.",
              "अपने लक्षणों को चुनें और जानिए किस विशेषज्ञ से परामर्श लें।"
            )}
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
              {t("Tap on all matching symptoms:", "लक्षणों पर टैप करें:")}
            </span>
            {selectedChips.length > 0 && (
              <button
                onClick={() => setSelectedChips([])}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                {t("Clear all", "सभी हटाएं")}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {SYMPTOM_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.id);
              const isAlert = chip.category === "emergency";
              return (
                <button
                  key={chip.id}
                  onClick={() => toggleChip(chip.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? isAlert
                        ? "bg-red-100 border border-red-400 text-red-700 shadow-sm scale-105 font-bold"
                        : "bg-[#1F2F98] text-white font-bold shadow-md shadow-[#1CA7EC]/20 scale-105"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-[#1CA7EC] hover:bg-slate-50"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {hasEmergency && (
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 mb-8 flex items-start gap-3.5 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-900">
                {t("Urgent Medical Notice", "आपातकालीन सूचना")}
              </h4>
              <p className="text-xs text-red-700 mt-1">
                {t(
                  "Sudden loss of vision, suspected stroke, or severe chest pain symptoms require immediate hospital emergency care.",
                  "अचानक नजर कम होना या सीने में तेज दर्द के लक्षणों में तुरंत नजदीकी आपातकालीन अस्पताल जाएं।"
                )}
              </p>
            </div>
          </div>
        )}

        {selectedChips.length > 0 && (
          <div className="p-6 md:p-8 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/40 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#1CA7EC]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F2F98]">
                    {t("Recommended Specialist Care", "अनुशंसित विशेषज्ञ परामर्श")}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {recommendedSpecialty === "rheumatology" &&
                    t("Dr. Aakash Singh (AIR 1, PGIMER) · Rheumatology & Immunology", "डॉ. आकाश सिंह · रूमेटोलॉजी एवं ऑटोइम्यून विभाग")}
                  {recommendedSpecialty === "dermatology" &&
                    t("Dr. Ankita Pundir (MD) · Dermatology, Aesthetics & Hair", "डॉ. अंकिता पुंडीर · डर्मेटोलॉजी, एस्थेटिक्स एवं हेयर")}
                  {recommendedSpecialty === "both" &&
                    t("Hybrid Dual Consultation (Rheumatology + Dermatology)", "हाइब्रिड संयुक्त परामर्श (रूमेटोलॉजी + डर्मेटोलॉजी)")}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                  {recommendedSpecialty === "rheumatology" &&
                    t(
                      "Your symptoms correlate with joint inflammation or autoimmune connective tissue disorders. Early biological evaluation protects cartilage from destruction.",
                      "आपके लक्षण जोड़ों की सूजन या ऑटोइम्यून गठिया से मेल खाते हैं। समय पर जांच से जोड़ों को स्थायी नुकसान से बचाया जा सकता है।"
                    )}
                  {recommendedSpecialty === "dermatology" &&
                    t(
                      "Your symptoms suggest an active cutaneous or follicular condition. Specialist dermatosurgery and lasers can restore skin health.",
                      "आपके लक्षण त्वचा, बाल या पिगमेंटेशन विकार का संकेत देते हैं।"
                    )}
                  {recommendedSpecialty === "both" &&
                    t(
                      "Autoimmune disorders frequently manifest in both joints and skin. ACORD's hybrid clinic provides coordinated care under one roof.",
                      "ऑटोइम्यून बीमारियां अक्सर त्वचा और जोड़ों दोनों को एक साथ प्रभावित करती हैं।"
                    )}
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <button
                  onClick={() =>
                    openBooking({
                      specialty: recommendedSpecialty === "dermatology" ? "dermatology" : "rheumatology",
                      doctor: recommendedSpecialty === "dermatology" ? "dr-ankita-pundir" : "dr-aakash-singh",
                    })
                  }
                  className="w-full md:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t("Book Consultation for These Symptoms", "डॉक्टर अपॉइंटमेंट बुक करें")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-[11px] text-slate-500 mt-6 max-w-xl mx-auto">
          {t(
            "* Medical Disclaimer: This symptom guide provides triage guidance and does not constitute a formal diagnosis. Always consult our physicians for clinical evaluation.",
            "* मेडिकल अस्वीकरण: यह लक्षण मार्गदर्शक केवल सामान्य जानकारी के लिए है और डॉक्टर के औपचारिक निदान का विकल्प नहीं है।"
          )}
        </p>
      </div>
    </section>
  );
};

export default SymptomFinder;
