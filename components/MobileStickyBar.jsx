"use client";
import React from "react";
import { useBooking } from "@/lib/booking-context";
import { useLanguage } from "@/lib/language-context";
import { CLINIC_INFO } from "@/lib/data";
import { Phone, MessageCircle, Calendar } from "lucide-react";

export const MobileStickyBar = () => {
  const { openBooking } = useBooking();
  const { t } = useLanguage();

  const gorakhpurBranch = CLINIC_INFO.branches[0];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a
            href={`tel:${gorakhpurBranch.phone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 active:scale-95 transition-transform"
            aria-label="Call clinic directly"
          >
            <Phone className="w-4 h-4 text-[#1CA7EC] mb-0.5" />
            <span className="text-[10px] font-bold">{t("Call Clinic", "कॉल करें")}</span>
          </a>

          <a
            href={`https://wa.me/${gorakhpurBranch.whatsapp}?text=${encodeURIComponent(
              "Hello ACORD Clinics, I would like to book an appointment."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] active:scale-95 transition-transform"
            aria-label="WhatsApp clinic"
          >
            <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
            <span className="text-[10px] font-bold">WhatsApp</span>
          </a>

          <button
            onClick={() => openBooking()}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-black shadow-md shadow-[#1CA7EC]/20 active:scale-95 transition-transform"
            aria-label="Book appointment"
          >
            <Calendar className="w-4 h-4 text-white mb-0.5" />
            <span className="text-[10px] font-black">{t("Book Slot", "बुक करें")}</span>
          </button>
        </div>
      </div>

      <aside aria-label="WhatsApp quick chat" className="hidden lg:block fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${gorakhpurBranch.whatsapp}?text=${encodeURIComponent(
            "Hello ACORD Clinics, I would like to book a specialist consultation."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
            {t("Chat on WhatsApp", "व्हाट्सएप चैट")}
          </span>
        </a>
      </aside>
    </>
  );
};
