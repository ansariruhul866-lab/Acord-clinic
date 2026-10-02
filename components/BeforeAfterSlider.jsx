"use client";
import React, { useState } from "react";
import { BEFORE_AFTER_CASES } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { Sparkles, ShieldCheck } from "lucide-react";

export const BeforeAfterSlider = () => {
  const { t, isHindi } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sliderPositions, setSliderPositions] = useState({
    "case-vitiligo": 50,
    "case-hair": 50,
    "case-acne-scars": 50,
  });

  const categories = ["All", "Dermatology", "Hair Restoration"];

  const filteredCases =
    activeCategory === "All"
      ? BEFORE_AFTER_CASES
      : BEFORE_AFTER_CASES.filter((c) => c.category === activeCategory);

  const handleSliderChange = (id, value) => {
    setSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 bg-[#F8FAFC] text-slate-900 w-full overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Verified Clinical Transformations", "प्रमाणित परिणाम एवं परिवर्तन")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            {t("Real Patient Results, Backed by Science", "वैज्ञानिक तकनीक से वास्तविक परिणाम")}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {t(
              "Slide left and right to inspect the clinical changes achieved under Dr. Ankita Pundir and Dr. Aakash Singh.",
              "स्लाइडर को आगे-पीछे खींचकर देखें उपचार से पहले और बाद का वास्तविक बदलाव।"
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#1F2F98] text-white shadow-lg shadow-[#1F2F98]/25 scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:border-[#1CA7EC] border border-slate-200 shadow-sm"
                }`}
              >
                {cat === "All" ? t("All Cases", "सभी परिणाम") : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((item) => {
            const pos = sliderPositions[item.id] || 50;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden p-6 flex flex-col justify-between hover:border-[#1CA7EC] hover:shadow-xl transition-all shadow-sm"
              >
                <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden select-none mb-5 group">
                  <img
                    src={item.afterImage}
                    alt={`${item.title} After Treatment`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${pos}%` }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} Before Treatment`}
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/20">
                      {t("Before", "पहले")}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#1CA7EC] backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/40">
                    {t("After", "बाद में")}
                  </div>

                  <div
                    className="absolute inset-y-0 w-0.5 bg-[#1CA7EC] shadow-md cursor-ew-resize flex items-center justify-center pointer-events-none"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1CA7EC] text-white flex items-center justify-center text-xs font-black shadow-lg">
                      ⇄
                    </div>
                  </div>

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

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1CA7EC]">{item.procedure}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px]">
                      {item.timeframe}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    {isHindi ? item.titleHi : item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi ? item.descriptionHi : item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200 text-center max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-slate-600 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#1CA7EC] shrink-0" />
          <span>
            {t(
              "All clinical photographs are published with patient consent. Results are individual and vary by biological response.",
              "सभी चिकित्सकीय तस्वीरें मरीज की सहमति से प्रकाशित हैं। परिणाम प्रत्येक व्यक्ति की प्रतिक्रिया के अनुसार भिन्न हो सकते हैं।"
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
