"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useBooking } from "@/lib/booking-context";
import { useReducedEffects } from "@/lib/reduced-effects-context";
import { Calendar, RefreshCw, Award, Sparkles, Phone, ShieldCheck } from "lucide-react";

export const ACORD_HOLO_CARD_VARIANTS = ["clinic", "dr-aakash", "dr-ankita"];

const ACORD_DOCUMENTS = {
  clinic: "/landing-pages/acord-holo-card.html?variant=clinic",
  "dr-aakash": "/landing-pages/acord-holo-card.html?variant=dr-aakash",
  "dr-ankita": "/landing-pages/acord-holo-card.html?variant=dr-ankita",
};

const ACORD_TITLES = {
  clinic: "ACORD Clinics Holographic Medical Card — Super-Speciality Centre of Excellence",
  "dr-aakash": "ACORD Holographic Card — Dr. Aakash Singh (Rheumatology & Immunology)",
  "dr-ankita": "ACORD Holographic Card — Dr. Ankita Pundir (Dermatology & Hair)",
};

export function AcordHoloCard({
  className = "",
  style,
  variant = "clinic",
  onBook,
  onCall,
}) {
  const safeVariant = ACORD_HOLO_CARD_VARIANTS.includes(variant) ? variant : "clinic";
  const hostRef = useRef(null);
  const { t } = useLanguage();
  const { openBooking } = useBooking();
  const { reducedEffects } = useReducedEffects();

  const [isClient, setIsClient] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [hostVisible, setHostVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Mount on client only to prevent SSR/hydration mismatch
  useEffect(() => {
    setIsClient(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // IntersectionObserver for lazy mounting
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHostVisible(entry?.isIntersecting ?? true);
      },
      { rootMargin: "100px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // VisibilityChange listener
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVis = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, []);

  // PostMessage Bridge listener from 3D Iframe
  useEffect(() => {
    const handleMessage = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "acord:book") {
        if (onBook) {
          onBook(e.data.variant || safeVariant);
        } else {
          openBooking({
            specialty: safeVariant.includes("dr-ankita") ? "dermatology" : "rheumatology",
          });
        }
      } else if (e.data.type === "acord:call") {
        if (onCall) {
          onCall(e.data.branch || "gorakhpur");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [safeVariant, onBook, onCall, openBooking]);

  const mounted = isClient && hostVisible && documentVisible && !reducedEffects && hasWebGL;

  useEffect(() => {
    setReady(false);
  }, [mounted, safeVariant]);

  return (
    <div
      ref={hostRef}
      className={`relative w-full max-w-[315px] sm:max-w-[365px] lg:max-w-[400px] h-[430px] sm:h-[475px] lg:h-[515px] mx-auto select-none bg-[#eaf7fe] rounded-3xl overflow-hidden shadow-xl shadow-[#13BEB5]/20 border border-[#13BEB5]/30 touch-pan-y ${className}`}
      role="region"
      aria-label="Interactive ACORD Clinics holographic medical card"
      style={{
        background: "#eaf7fe",
        touchAction: "pan-y",
        ...style,
      }}
    >
      {/* 3D WebGL Iframe Engine */}
      {mounted ? (
        <iframe
          key={safeVariant}
          title={ACORD_TITLES[safeVariant]}
          src={ACORD_DOCUMENTS[safeVariant]}
          sandbox="allow-scripts allow-same-origin"
          loading="eager"
          onLoad={() => setReady(true)}
          className="absolute inset-0 w-full h-full border-0 transition-opacity duration-300 z-10"
          style={{
            background: "#eaf7fe",
            border: 0,
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? "auto" : "none",
            touchAction: "pan-y",
          }}
        />
      ) : null}

      {/* Instant Static Poster / Low-End Fallback Card */}
      {(!mounted || !ready) && (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-[#eaf7fe] text-slate-800 shadow-sm z-0">
          <div className="flex items-center justify-between border-b border-[#13BEB5]/20 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#13BEB5] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#114E3F]">
                {safeVariant === "dr-aakash"
                  ? "Rheumatology & Immunology"
                  : safeVariant === "dr-ankita"
                  ? "Dermatology & Aesthetics"
                  : "ACORD Clinics Super-Speciality"}
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-[#13BEB5]/10 text-[#1F2F98] text-[9px] font-bold">
              3D Medical Badge
            </span>
          </div>

          <div className="flex flex-col items-center text-center my-auto space-y-2 py-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#1F2F98] via-[#13BEB5] to-[#89EAD7] shadow-md overflow-hidden flex items-center justify-center">
              {safeVariant === "dr-aakash" ? (
                <img
                  src="/images/dr-aakash-singh.jpg"
                  alt="Dr. Aakash Singh"
                  className="w-full h-full object-cover object-[center_top] rounded-full scale-105"
                />
              ) : safeVariant === "dr-ankita" ? (
                <img
                  src="/images/dr-ankita-pundir.png"
                  alt="Dr. Ankita Pundir"
                  className="w-full h-full object-cover object-[center_30%] rounded-full scale-105"
                />
              ) : (
                <img
                  src="/images/acord-logo.png"
                  alt="ACORD Clinics Emblem"
                  className="w-full h-full object-contain rounded-full p-2 bg-white"
                />
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#1F2F98]">
              {safeVariant === "dr-aakash"
                ? "DR. AAKASH SINGH"
                : safeVariant === "dr-ankita"
                ? "DR. ANKITA PUNDIR"
                : "ACORD CLINICS"}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#114E3F] font-semibold max-w-[260px] leading-snug">
              {safeVariant === "dr-aakash"
                ? "MD (Med), DM (Rheumatology & Clinical Immunology, AIR 1 PGIMER)"
                : safeVariant === "dr-ankita"
                ? "MBBS, MD (Dermatology, NEET PG AIR 1488, S. Korea Fellow)"
                : "Autoimmunity Centre Of excellence in Rheumatology & Dermatology"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5 text-[9px] sm:text-[10px] font-bold">
              {safeVariant === "dr-aakash" ? (
                <>
                  <span className="px-2 py-0.5 rounded-full bg-[#7B4FBF]/10 text-[#7B4FBF] border border-[#7B4FBF]/30">
                    Arthritis & SLE Care
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#13BEB5]/10 text-[#13BEB5] border border-[#13BEB5]/30">
                    Biologics Infusion
                  </span>
                </>
              ) : safeVariant === "dr-ankita" ? (
                <>
                  <span className="px-2 py-0.5 rounded-full bg-[#E8715A]/10 text-[#E8715A] border border-[#E8715A]/30">
                    Vitiligo Grafting Surgery
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#13BEB5]/10 text-[#13BEB5] border border-[#13BEB5]/30">
                    Hair FUE & Lasers
                  </span>
                </>
              ) : (
                <>
                  <span className="px-2 py-0.5 rounded-full bg-[#7B4FBF]/10 text-[#7B4FBF] border border-[#7B4FBF]/30">
                    Rheumatology & Biologics
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#13BEB5]/10 text-[#13BEB5] border border-[#13BEB5]/30">
                    Dermatology & Hair FUE
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-[#13BEB5]/20 space-y-1.5">
            <button
              onClick={() =>
                openBooking({
                  specialty: safeVariant.includes("dr-ankita") ? "dermatology" : "rheumatology",
                })
              }
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#1F2F98] to-[#13BEB5] text-white font-bold text-xs shadow-md shadow-[#13BEB5]/20 hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t("Book Consultation", "परामर्श बुक करें")}</span>
            </button>
            <p className="text-center text-[9px] text-slate-500 font-mono">
              Gorakhpur: +91 77029 41735 · Bhagalpur: +91 79034 68113
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcordHoloCard;
