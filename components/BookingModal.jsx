"use client";
import React, { useState, useEffect } from "react";
import { useBooking } from "@/lib/booking-context";
import { useLanguage } from "@/lib/language-context";
import { CLINIC_INFO, DOCTORS } from "@/lib/data";
import {
  X,
  Calendar,
  Building2,
  Video,
  Sparkles,
  CheckCircle2,
  Send,
  MessageCircle,
} from "lucide-react";

export const BookingModal = () => {
  const { isOpen, options, closeBooking } = useBooking();
  const { t, isHindi } = useLanguage();

  const [step, setStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("gorakhpur");
  const [selectedSpecialty, setSelectedSpecialty] = useState("rheumatology");
  const [selectedDoctor, setSelectedDoctor] = useState("dr-aakash-singh");
  const [consultType, setConsultType] = useState("clinic");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("Morning (10:00 AM - 1:00 PM)");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientCity, setPatientCity] = useState("");
  const [symptomNote, setSymptomNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (options.branch) setSelectedBranch(options.branch);
    if (options.specialty) setSelectedSpecialty(options.specialty);
    if (options.doctor) setSelectedDoctor(options.doctor);
    if (isOpen) {
      setStep(1);
      setBookingConfirmed(false);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [isOpen, options]);

  const branchObj = CLINIC_INFO.branches.find((b) => b.id === selectedBranch) || CLINIC_INFO.branches[0];
  const doctorObj = DOCTORS.find((d) => d.id === selectedDoctor) || DOCTORS[0];

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
      setStep(4);
    }, 400);
  };

  const getWhatsAppBookingLink = () => {
    const text = encodeURIComponent(
      `*ACORD Clinics Appointment Request*\n` +
      `--------------------------------\n` +
      `*Patient Name:* ${patientName}\n` +
      `*Phone:* ${patientPhone}\n` +
      `*City:* ${patientCity || "Not provided"}\n` +
      `*Branch:* ${branchObj.city}\n` +
      `*Consultation:* ${consultType === "clinic" ? "In-Clinic Visit" : "Video Teleconsultation"}\n` +
      `*Doctor:* ${doctorObj.name} (${doctorObj.role})\n` +
      `*Date:* ${selectedDate}\n` +
      `*Slot:* ${selectedSlot}\n` +
      (symptomNote ? `*Symptoms/Notes:* ${symptomNote}\n` : "") +
      `\nPlease confirm my appointment slot. Thank you!`
    );
    return `https://wa.me/${branchObj.whatsapp}?text=${text}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-2xl p-6 md:p-8">
        <button
          onClick={closeBooking}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1CA7EC]/10 border border-[#1CA7EC]/30 text-[#1F2F98] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1CA7EC]" />
            <span>{t("Instant 2-Tap Booking", "तुरंत 2-क्लिक अपॉइंटमेंट")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {t("Book Your Specialist Consultation", "विशेषज्ञ डॉक्टर से परामर्श बुक करें")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t(
              "Gorakhpur & Bhagalpur Super-Speciality Care",
              "गोरखपुर एवं भागलपुर — विश्वस्तरीय सुपर-स्पेशलिटी इलाज"
            )}
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-2.5">
                {t("1. Choose Clinic Location", "1. क्लिनिक की शाखा चुनें")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CLINIC_INFO.branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranch(b.id)}
                    className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                      selectedBranch === b.id
                        ? "bg-[#F0F9FF] border-[#1CA7EC] shadow-sm ring-1 ring-[#1CA7EC]"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Building2 className={`w-5 h-5 mt-0.5 ${selectedBranch === b.id ? "text-[#1CA7EC]" : "text-slate-400"}`} />
                    <div>
                      <div className="font-bold text-slate-900 text-base">
                        {isHindi ? b.cityHi : b.city} {t("Branch", "शाखा")}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1">{b.landmark}</div>
                      <div className="text-xs text-[#1CA7EC] mt-1 font-mono font-bold">{b.phoneDisplay}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-2.5">
                {t("2. Consulting Specialist", "2. परामर्श डॉक्टर")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOCTORS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => {
                      setSelectedDoctor(doc.id);
                      setSelectedSpecialty(doc.specialty);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                      selectedDoctor === doc.id
                        ? "bg-[#F0F9FF] border-[#1CA7EC] shadow-sm ring-1 ring-[#1CA7EC]"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={doc.posterImage}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#1CA7EC]/40"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {isHindi ? doc.nameHi : doc.name}
                      </div>
                      <div className="text-xs text-[#1CA7EC] font-semibold">{doc.degrees.split("(")[0]}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{doc.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm sm:text-base shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
            >
              {t("Continue to Date & Slot →", "तारीख और समय चुनें →")}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConsultType("clinic")}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                  consultType === "clinic"
                    ? "bg-[#F0F9FF] border-[#1CA7EC] text-[#1F2F98] ring-1 ring-[#1CA7EC]"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-4 h-4 text-[#1CA7EC]" />
                <span>{t("In-Clinic Visit", "क्लिनिक पर आकर")}</span>
              </button>
              <button
                type="button"
                onClick={() => setConsultType("teleconsult")}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                  consultType === "teleconsult"
                    ? "bg-[#F0F9FF] border-[#1CA7EC] text-[#1F2F98] ring-1 ring-[#1CA7EC]"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Video className="w-4 h-4 text-[#1CA7EC]" />
                <span>{t("Video Teleconsult", "वीडियो परामर्श")}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-2">
                {t("Preferred Date", "पसंदीदा तारीख")}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1CA7EC]" />
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#1CA7EC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-2">
                {t("Preferred Time Slot", "समय स्लॉट")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Morning (10:00 AM - 1:00 PM)",
                  "Afternoon (2:00 PM - 5:00 PM)",
                  "Evening (5:00 PM - 7:00 PM)",
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      selectedSlot === slot
                        ? "bg-[#F0F9FF] border-[#1CA7EC] text-[#1F2F98] ring-1 ring-[#1CA7EC]"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-all"
              >
                ← {t("Back", "पीछे")}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all"
              >
                {t("Patient Details →", "मरीज की जानकारी →")}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-1.5">
                {t("Patient Full Name *", "मरीज का पूरा नाम *")}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-[#1CA7EC]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-1.5">
                  {t("Mobile (WhatsApp) *", "मोबाइल नंबर *")}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 77029 41735"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-[#1CA7EC]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-1.5">
                  {t("City / Town", "शहर / जिला")}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gorakhpur / Bhagalpur"
                  value={patientCity}
                  onChange={(e) => setPatientCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-[#1CA7EC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1F2F98] mb-1.5">
                {t("Symptoms / Prior Reports (Optional)", "लक्षण / पुरानी जांच (वैकल्पिक)")}
              </label>
              <textarea
                rows={2}
                placeholder="Brief symptoms..."
                value={symptomNote}
                onChange={(e) => setSymptomNote(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-[#1CA7EC]"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F0F9FF] border border-[#1CA7EC]/30 text-xs text-slate-700 flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-slate-500">{t("Specialist:", "डॉक्टर:")}</span>
                <span className="font-bold text-slate-900">{doctorObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("Branch:", "शाखा:")}</span>
                <span className="font-bold text-slate-900">{branchObj.city} Clinic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("Date & Slot:", "तारीख व समय:")}</span>
                <span className="font-bold text-[#1F2F98]">{selectedDate} ({selectedSlot.split(" ")[0]})</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-all"
              >
                ← {t("Back", "पीछे")}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#1F2F98] to-[#1CA7EC] text-white font-bold text-sm shadow-md shadow-[#1CA7EC]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t("Confirm Appointment", "अपॉइंटमेंट पक्का करें")}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4 */}
        {step === 4 && bookingConfirmed && (
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#F0F9FF] border-2 border-[#1CA7EC] text-[#1CA7EC] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {t("Appointment Request Received!", "अपॉइंटमेंट अनुरोध दर्ज हो गया!")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                {t(
                  `Thank you, ${patientName}. Our coordinator will contact you at ${patientPhone} within 15 minutes to confirm your slot.`,
                  `धन्यवाद, ${patientName}। हमारे क्लिनिक समन्वयक 15 मिनट में आपसे संपर्क करेंगे।`
                )}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-3">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t("Send Booking to WhatsApp Now", "व्हाट्सएप पर तुरंत भेजें")}</span>
              </a>
            </div>

            <button
              onClick={closeBooking}
              className="text-xs text-slate-500 hover:text-slate-800 underline pt-2"
            >
              {t("Close this window", "खिड़की बंद करें")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
