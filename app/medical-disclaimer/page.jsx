"use client";
import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Medical Disclaimer</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>Statutory Medical Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Medical Disclaimer & Ethical Practice Statement
          </h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Not a Substitute for Direct Medical Consultation</h2>
            <p>
              The content published on this website (including text, graphics, images, procedures, symptom check guides, and blog articles) is for educational and informational awareness only. It does not constitute medical advice, diagnosis, or personalized treatment recommendations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Doctor-Patient Relationship</h2>
            <p>
              Browsing this website, submitting an appointment inquiry, or messaging via WhatsApp does not automatically form a doctor-patient relationship until an in-person or verified teleconsultation has been formally conducted by our registered medical practitioners.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Emergency Care Notice</h2>
            <p>
              If you are experiencing acute medical emergencies such as sudden severe chest pain, shortness of breath, sudden visual loss, acute paralysis, or life-threatening drug reactions, please visit the nearest hospital emergency room immediately.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Treatment Results & Variations</h2>
            <p>
              Before and after photographs, testimonials, and case studies displayed on this platform are for illustrative and clinical educational purposes with patient consent. Medical and aesthetic outcomes vary based on individual biological factors, severity, compliance, and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
