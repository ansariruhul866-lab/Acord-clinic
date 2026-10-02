"use client";
import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Terms of Service</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Clinic Portal Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Appointment Scheduling & Tokens</h2>
            <p>
              Online appointment booking facilitates direct token allocation with our front desk. While we strive to adhere strictly to time slots, priority is given to emergency and acute patient admissions when required.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Medical Consultation Fees</h2>
            <p>
              Consultation charges, investigation fees, and procedure costs are clearly communicated at our registration desks without hidden markups.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Intellectual Property</h2>
            <p>
              All branding, logos, graphics, and clinical write-ups are the property of ACORD Clinics. Reproduction without prior written permission is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
