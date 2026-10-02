"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RHEUMATOLOGY_CONDITIONS, DERMATOLOGY_TREATMENTS, DOCTORS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { Search, X, Stethoscope, Sparkles, BookOpen, ArrowRight } from "lucide-react";

export const GlobalSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { t, isHindi } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (url) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  const q = query.toLowerCase().trim();

  const matchedConditions = q
    ? RHEUMATOLOGY_CONDITIONS.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.titleHi.toLowerCase().includes(q) ||
          c.shortDesc.toLowerCase().includes(q)
      )
    : [];

  const matchedTreatments = q
    ? DERMATOLOGY_TREATMENTS.filter(
        (tr) =>
          tr.title.toLowerCase().includes(q) ||
          tr.titleHi.toLowerCase().includes(q) ||
          tr.tagline.toLowerCase().includes(q)
      )
    : [];

  const matchedDoctors = q
    ? DOCTORS.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.nameHi.toLowerCase().includes(q) ||
          d.role.toLowerCase().includes(q)
      )
    : [];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-sm"
        title="Search (Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5 text-[#1CA7EC]" />
        <span>{t("Search...", "खोजें...")}</span>
        <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 font-mono">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-[#1CA7EC] shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder={t(
              "Search arthritis, vitiligo, hair transplant, doctors...",
              "गठिया, विटिलिगो, हेयर ट्रांसप्लांट, डॉक्टर खोजें..."
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none font-medium"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {q.length === 0 && (
            <div className="py-6 text-center text-slate-500 text-xs">
              <p className="text-[#1F2F98] font-semibold mb-2">
                {t("Quick Suggestions:", "त्वरित सुझाव:")}
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto mt-2">
                {[
                  { label: "Dr. Aakash Singh (AIR 1)", href: "/doctors/dr-aakash-singh" },
                  { label: "Dr. Ankita Pundir (MD)", href: "/doctors/dr-ankita-pundir" },
                  { label: "Biologics Infusion", href: "/rheumatology/treatments" },
                  { label: "Vitiligo Surgeries", href: "/dermatology/treatments/vitiligo-surgeries" },
                  { label: "Hair Transplant FUE", href: "/dermatology/treatments/hair-restoration-transplant" },
                ].map((sugg) => (
                  <button
                    key={sugg.label}
                    onClick={() => handleSelect(sugg.href)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#F0F9FF] text-xs text-slate-700 hover:text-[#1F2F98] border border-slate-200 hover:border-[#1CA7EC]"
                  >
                    {sugg.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedConditions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F2F98] mb-2 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-[#1CA7EC]" />
                <span>Rheumatology Conditions</span>
              </div>
              <div className="space-y-1.5">
                {matchedConditions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(`/rheumatology/conditions/${item.slug}`)}
                    className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#F0F9FF] text-left transition-all flex items-center justify-between group border border-slate-100 hover:border-[#1CA7EC]"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-[#1F2F98]">
                        {isHindi ? item.titleHi : item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.shortDesc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1CA7EC] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedTreatments.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1CA7EC] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dermatology Treatments</span>
              </div>
              <div className="space-y-1.5">
                {matchedTreatments.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(`/dermatology/treatments/${item.slug}`)}
                    className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#F0F9FF] text-left transition-all flex items-center justify-between group border border-slate-100 hover:border-[#1CA7EC]"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-[#1F2F98]">
                        {isHindi ? item.titleHi : item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.tagline}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1CA7EC] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedDoctors.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1AA7EC] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Specialist Doctors</span>
              </div>
              <div className="space-y-1.5">
                {matchedDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelect(`/doctors/${doc.slug}`)}
                    className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#F0F9FF] text-left transition-all flex items-center justify-between group border border-slate-100 hover:border-[#1CA7EC]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.posterImage}
                        alt={doc.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#1CA7EC]"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-xs group-hover:text-[#1F2F98]">
                          {isHindi ? doc.nameHi : doc.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{doc.role}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1CA7EC] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
