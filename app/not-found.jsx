import React from "react";
import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { CLINIC_INFO } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white text-slate-900 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block p-4 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 text-[#1F2F98]">
          <span className="font-display text-6xl tracking-wider">404</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Page Not Found / पृष्ठ नहीं मिला
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The page you are looking for might have been moved or does not exist. Please return to the home page or book an appointment directly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-semibold text-sm hover:opacity-95 transition-all shadow-md shadow-[#1CA7EC]/20"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <a
            href={`tel:${CLINIC_INFO.branches[0].phone}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-sm transition-all shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#1CA7EC]" />
            <span>Call Clinic</span>
          </a>
        </div>
      </div>
    </div>
  );
}
