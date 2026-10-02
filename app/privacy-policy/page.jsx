"use client";
import React from "react";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Privacy Policy</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Data Protection & Patient Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you book an appointment, submit an inquiry form, or communicate with our desk via WhatsApp, we collect basic patient information such as your name, contact phone number, city, and brief clinical concern.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Use of Medical Data & Confidentiality</h2>
            <p>
              Your personal health information is strictly confidential. We never sell, rent, or lease patient contact details or medical histories to any third-party marketing companies. Data is used solely for clinical appointments and patient care navigation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Direct Contact & Updates</h2>
            <p>
              If you have queries regarding your data or medical records, please contact our administrative desk at <span className="text-[#1F2F98] font-mono font-bold">{CLINIC_INFO.email}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
