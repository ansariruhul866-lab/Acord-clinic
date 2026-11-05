"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CLINIC_INFO, DOCTORS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { Calendar, MapPin, User, CheckCircle2, MessageCircle } from "lucide-react";

export default function BookAppointmentPage() {
  const { t, isHindi } = useLanguage();

  const [formData, setFormData] = useState({
    branch: "gorakhpur",
    specialty: "rheumatology",
    doctor: "dr-aakash-singh",
    date: "",
    timeSlot: "Morning (10:00 AM - 01:00 PM)",
    name: "",
    phone: "",
    city: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const sanitizeText = (val) => (val ? val.replace(/[<>]/g, "").trim().slice(0, 500) : "");

  const handleBranchChange = (branch) => {
    setFormData((prev) => ({ ...prev, branch }));
  };

  const handleSpecialtyChange = (specialty) => {
    const defaultDoc = specialty === "rheumatology" ? "dr-aakash-singh" : "dr-ankita-pundir";
    setFormData((prev) => ({ ...prev, specialty, doctor: defaultDoc }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = sanitizeText(formData.name);
    const cleanPhoneDigits = formData.phone.replace(/[^0-9]/g, "");

    if (!cleanName) {
      setFormError(t("Please enter patient name", "कृपया मरीज का नाम दर्ज करें"));
      return;
    }

    if (cleanPhoneDigits.length < 10) {
      setFormError(t("Please enter a valid 10-digit mobile number", "कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें"));
      return;
    }

    setFormError("");

    const branches = Array.isArray(CLINIC_INFO.branches) ? CLINIC_INFO.branches : Object.values(CLINIC_INFO.branches);
    const branchInfo = branches.find((b) => b.id === formData.branch) || branches[0];
    const docObj = DOCTORS.find((d) => d.id === formData.doctor || d.slug?.includes(formData.doctor));
    const doctorName = docObj ? docObj.name : "ACORD Specialist";

    const cleanCity = sanitizeText(formData.city);
    const cleanNotes = sanitizeText(formData.notes);

    const msg = `*ACORD Clinics - Appointment Request*\n` +
      `--------------------------------\n` +
      `*Patient Name:* ${cleanName}\n` +
      `*Phone:* ${formData.phone.trim()}\n` +
      `*City:* ${cleanCity || "Not provided"}\n` +
      `*Branch:* ${branchInfo.name} (${branchInfo.city})\n` +
      `*Specialty:* ${formData.specialty === "rheumatology" ? "Rheumatology & Immunology" : "Dermatology & Aesthetics"}\n` +
      `*Doctor:* ${doctorName}\n` +
      `*Preferred Date:* ${formData.date || "Earliest Available"}\n` +
      `*Time Slot:* ${formData.timeSlot}\n` +
      (cleanNotes ? `*Concern / Symptoms:* ${cleanNotes}\n` : "") +
      `--------------------------------\n` +
      `Requested via ACORD Website Portal`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${branchInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${encoded}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1CA7EC]">Home</Link>
          <span>/</span>
          <span className="text-[#1F2F98] font-semibold">Book Appointment</span>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Fast 2-Tap Booking", "आसान 2-स्टेप अपॉइंटमेंट")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("Schedule Your Consultation", "विशेषज्ञ परामर्श बुक करें")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(
              "Choose your branch, specialist, and date. You will receive an instant WhatsApp confirmation with clinic location & token.",
              "अपनी शाखा, विशेषज्ञ एवं तिथि चुनें। तुरंत व्हाट्सएप पर टोकन एवं समय प्राप्त करें।"
            )}
          </p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#F0F9FF] border border-[#1CA7EC]/30 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#1CA7EC]/20 text-[#1CA7EC] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">{t("Booking Request Transmitted!", "परामर्श अनुरोध सफलतापूर्वक भेजा गया!")}</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {t(
                  "Our desk team is processing your request on WhatsApp. If WhatsApp did not open, click the button below.",
                  "हमारी टीम व्हाट्सएप पर आपके संदेश की पुष्टि कर रही है। यदि व्हाट्सएप नहीं खुला, तो नीचे क्लिक करें।"
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-xs hover:opacity-95 transition-all shadow-sm"
              >
                {t("Book Another Appointment", "अन्य अपॉइंटमेंट बुक करें")}
              </button>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs transition-all shadow-sm"
              >
                {t("Back to Home", "होम पेज पर जाएं")}
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-8 shadow-sm">
            {/* Step 1: Select Branch */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1F2F98] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1CA7EC]" />
                <span>1. Select Clinic Branch / शाखा चुनें</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleBranchChange("gorakhpur")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.branch === "gorakhpur"
                      ? "bg-white border-[#1CA7EC] text-slate-900 shadow-sm ring-2 ring-[#1CA7EC]/20"
                      : "bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1CA7EC] uppercase block">Uttar Pradesh</span>
                  <span className="text-base font-bold text-slate-900 block">Gorakhpur Flagship</span>
                  <span className="text-xs text-slate-500 block mt-1">Medical College Road, Asuran Chowk</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBranchChange("bhagalpur")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.branch === "bhagalpur"
                      ? "bg-white border-[#1CA7EC] text-slate-900 shadow-sm ring-2 ring-[#1CA7EC]/20"
                      : "bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1CA7EC] uppercase block">Bihar</span>
                  <span className="text-base font-bold text-slate-900 block">Bhagalpur Centre</span>
                  <span className="text-xs text-slate-500 block mt-1">Tilkamanjhi / Zero Mile</span>
                </button>
              </div>
            </div>

            {/* Step 2: Select Specialty & Doctor */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1F2F98] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1CA7EC]" />
                <span>2. Select Specialty & Doctor / विशेषज्ञ चुनें</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSpecialtyChange("rheumatology")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.specialty === "rheumatology"
                      ? "bg-white border-[#1F2F98] text-slate-900 shadow-sm ring-2 ring-[#1F2F98]/20"
                      : "bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1F2F98] uppercase block">Rheumatology & Lupus</span>
                  <span className="text-base font-bold text-slate-900 block">Dr. Aakash Singh</span>
                  <span className="text-xs text-slate-500 block mt-1">DM Rheumatology (AIR 1 PGIMER)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSpecialtyChange("dermatology")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.specialty === "dermatology"
                      ? "bg-white border-[#1CA7EC] text-slate-900 shadow-sm ring-2 ring-[#1CA7EC]/20"
                      : "bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1CA7EC] uppercase block">Dermatology & Aesthetics</span>
                  <span className="text-base font-bold text-slate-900 block">Dr. Ankita Pundir</span>
                  <span className="text-xs text-slate-500 block mt-1">Faculty at BRD Medical College · AIIMS AIR 456</span>
                </button>
              </div>
            </div>

            {/* Step 3: Date & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Preferred Date / दिनांक</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#1CA7EC]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Time Slot / समय</label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#1CA7EC]"
                >
                  <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                  <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                  <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Patient Details */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1F2F98] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1CA7EC]" />
                <span>3. Patient Information / मरीज का विवरण</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#1CA7EC]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700">WhatsApp / Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#1CA7EC]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700">City / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Gorakhpur, Deoria, Bhagalpur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#1CA7EC]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-700">Primary Symptoms or Condition (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Joint pain with morning stiffness, Hair thinning, Skin rash..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#1CA7EC]"
                />
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
                {formError}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-slate-200">
              <span className="text-xs text-slate-500">
                🔒 Direct clinic WhatsApp desk confirmation. No wait time.
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t("Confirm via WhatsApp", "व्हाट्सएप पर बुक करें")}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
