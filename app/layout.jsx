import { Plus_Jakarta_Sans, Bebas_Neue, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { BookingProvider } from "@/lib/booking-context";
import { ReducedEffectsProvider } from "@/lib/reduced-effects-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { BookingModal } from "@/components/BookingModal";
import { CLINIC_INFO } from "@/lib/data";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const notoHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-hindi",
  display: "swap",
});

export const metadata = {
  title: "ACORD Clinics | Super-Speciality Rheumatology & Dermatology (Gorakhpur & Bhagalpur)",
  description:
    "India's premier hybrid centre of excellence in Rheumatology, Immunology, and Dermatology. Expert care for Arthritis, Lupus, Biologics, Vitiligo Surgery, FUE Hair Transplant, and Laser Treatments by Dr. Aakash Singh (AIR 1, PGIMER Chandigarh) & Dr. Ankita Pundir (MD Dermatology, AIIMS).",
  keywords: [
    "Rheumatologist in Gorakhpur",
    "Best Dermatologist in Gorakhpur",
    "Arthritis Treatment in Bhagalpur",
    "Biologics Infusion UP Bihar",
    "Hair Transplant Gorakhpur",
    "Vitiligo Surgery Bihar",
    "Dr. Aakash Singh Rheumatology",
    "Dr. Ankita Pundir Dermatology",
  ],
  authors: [{ name: "ACORD Clinics" }],
  icons: {
    icon: "/images/acord-logo.png",
    shortcut: "/images/acord-logo.png",
    apple: "/images/acord-logo.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://acordclinics.com/#clinic",
        name: "ACORD Clinics",
        description: "Autoimmunity Centre Of excellence in Rheumatology and Dermatology",
        url: "https://acordclinics.com",
        logo: "https://acordclinics.com/images/acord-logo.png",
        telephone: CLINIC_INFO.branches[0].phoneDisplay,
      },
      {
        "@type": "Physician",
        name: "Dr. Aakash Singh",
        jobTitle: "Rheumatologist & Clinical Immunologist",
        description: "DM (AIR 1, PGIMER Chandigarh), AIIMS & JIPMER Fellow",
        worksFor: { "@id": "https://acordclinics.com/#clinic" },
      },
      {
        "@type": "Physician",
        name: "Dr. Ankita Pundir",
        jobTitle: "Consultant Dermatologist & Dermatosurgeon",
        description: "MD Dermatology (NEET PG AIR 1488, AIIMS AIR 456), South Korea Fellow",
        worksFor: { "@id": "https://acordclinics.com/#clinic" },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${bebas.variable} ${notoHindi.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col selection:bg-[#1CA7EC]/20 selection:text-[#1F2F98]">
        <ReducedEffectsProvider>
          <LanguageProvider>
            <ThemeProvider>
              <BookingProvider>
                <Navbar />
                <main className="flex-1 pt-[65px] lg:pt-[72px]">{children}</main>
                <Footer />
                <MobileStickyBar />
                <BookingModal />
              </BookingProvider>
            </ThemeProvider>
          </LanguageProvider>
        </ReducedEffectsProvider>
      </body>
    </html>
  );
}
