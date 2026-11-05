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

export const viewport = {
  themeColor: "#1F2F98",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://acordclinics.com"),
  title: {
    default: "ACORD Clinics | Super-Speciality Rheumatology & Dermatology (Gorakhpur & Bhagalpur)",
    template: "%s | ACORD Clinics",
  },
  description:
    "Autoimmunity Centre Of excellence in Rheumatology and Dermatology (ACORD Clinics). Your one-stop super-speciality centre for Arthritis, Lupus, Biologics, Vitiligo Surgery, FUE Hair Transplant, and Laser Treatments by Dr. Aakash Singh (AIR 1, PGIMER Chandigarh) & Dr. Ankita Pundir (Faculty at BRD Medical College, AIIMS).",
  keywords: [
    "Rheumatologist in Gorakhpur",
    "Best Dermatologist in Gorakhpur",
    "Rheumatologist in Eastern UP",
    "Arthritis Specialist Gorakhpur",
    "Arthritis Treatment in Bhagalpur",
    "Best Skin Specialist in Bhagalpur",
    "Biologics Infusion UP Bihar",
    "Hair Transplant Gorakhpur",
    "Vitiligo Surgery Bihar",
    "Laser Hair Reduction Gorakhpur",
    "Dr. Aakash Singh Rheumatology",
    "Dr. Ankita Pundir Dermatology",
    "Lupus Specialist Purvanchal",
    "MSK Ultrasound Joint Injections",
  ],
  authors: [{ name: "ACORD Clinics", url: "https://acordclinics.com" }],
  creator: "ACORD Clinics",
  publisher: "ACORD Clinics",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://acordclinics.com",
    siteName: "ACORD Clinics",
    title: "ACORD Clinics | Super-Speciality Rheumatology & Dermatology",
    description:
      "Expert treatment for Arthritis, Lupus, Biologics, Vitiligo Surgery, FUE Hair Transplant, and US FDA Lasers by Dr. Aakash Singh (AIR 1, PGIMER) & Dr. Ankita Pundir (AIIMS).",
    images: [
      {
        url: "/images/acord-logo.png",
        width: 1200,
        height: 630,
        alt: "ACORD Clinics Super-Speciality Centres",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACORD Clinics | Super-Speciality Rheumatology & Dermatology",
    description:
      "Premier institute healthcare in Eastern UP & Bihar. Led by Dr. Aakash Singh (AIR 1 PGIMER) & Dr. Ankita Pundir (AIIMS).",
    images: ["/images/acord-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
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
        alternateName: "Autoimmunity Centre Of excellence in Rheumatology & Dermatology",
        description: "India's premier hybrid centre of excellence in Rheumatology, Clinical Immunology, and Dermatology.",
        url: "https://acordclinics.com",
        logo: "https://acordclinics.com/images/acord-logo.png",
        image: "https://acordclinics.com/images/acord-logo.png",
        telephone: "+91 77029 41735",
        priceRange: "$$",
        medicalSpecialty: [
          "https://health-lifesci.schema.org/Rheumatology",
          "https://health-lifesci.schema.org/Dermatology",
        ],
        department: [
          {
            "@type": "MedicalClinic",
            name: "ACORD Clinics — Gorakhpur Branch",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2nd Floor, Lotus Tower, Thana Chowk, Opp. V Bazar, near Medical College Road, Basharatpur, Shahpur",
              addressLocality: "Gorakhpur",
              addressRegion: "Uttar Pradesh",
              postalCode: "273003",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 26.7606,
              longitude: 83.3732,
            },
            telephone: "+91 77029 41735",
            openingHours: "Mo-Sa 10:00-19:00",
          },
          {
            "@type": "MedicalClinic",
            name: "ACORD Clinics — Bhagalpur Branch",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jai Mata Di Sweets Building, Tulsinagar Colony, Bank Colony",
              addressLocality: "Bhagalpur",
              addressRegion: "Bihar",
              postalCode: "812001",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 25.2425,
              longitude: 86.9842,
            },
            telephone: "+91 79034 68113",
            openingHours: "Mo-Sa 10:00-19:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Gorakhpur" },
          { "@type": "City", name: "Bhagalpur" },
          { "@type": "AdministrativeArea", name: "Purvanchal" },
          { "@type": "AdministrativeArea", name: "Eastern Uttar Pradesh" },
          { "@type": "AdministrativeArea", name: "Bihar" },
          { "@type": "AdministrativeArea", name: "Jharkhand" },
        ],
      },
      {
        "@type": "Physician",
        "@id": "https://acordclinics.com/#dr-aakash",
        name: "Dr. Aakash Singh",
        jobTitle: "Rheumatologist & Clinical Immunologist",
        medicalSpecialty: "https://health-lifesci.schema.org/Rheumatology",
        description: "MBBS, MD (Medicine), DM Clinical Immunology & Rheumatology (AIR 1, PGIMER Chandigarh), AIIMS & JIPMER Fellow.",
        alumniOf: [
          { "@type": "EducationalOrganization", name: "PGIMER Chandigarh" },
          { "@type": "EducationalOrganization", name: "AIIMS" },
        ],
        image: "https://acordclinics.com/images/dr-aakash-singh.jpg",
        worksFor: { "@id": "https://acordclinics.com/#clinic" },
      },
      {
        "@type": "Physician",
        "@id": "https://acordclinics.com/#dr-ankita",
        name: "Dr. Ankita Pundir",
        jobTitle: "Consultant Dermatologist, Dermatosurgeon & Aesthetic Physician",
        medicalSpecialty: "https://health-lifesci.schema.org/Dermatology",
        description: "MBBS, MD Dermatology (AIIMS AIR 456), Faculty at BRD Medical College Gorakhpur, South Korea & Chandigarh Fellow.",
        alumniOf: [
          { "@type": "EducationalOrganization", name: "AIIMS" },
        ],
        image: "https://acordclinics.com/images/dr-ankita-pundir.png",
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
        {/* Geographic Engine Optimization (GEO) Local Meta Tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Gorakhpur, Uttar Pradesh, India" />
        <meta name="geo.position" content="26.7606;83.3732" />
        <meta name="ICBM" content="26.7606, 83.3732" />

        {/* Preconnect to external critical domains for Performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col selection:bg-[#1CA7EC]/20 selection:text-[#1F2F98] overflow-x-hidden w-full">
        <ReducedEffectsProvider>
          <LanguageProvider>
            <ThemeProvider>
              <BookingProvider>
                <div className="flex flex-col min-h-screen w-full">
                  <Navbar />
                  <main className="flex-1 w-full">
                    {children}
                  </main>
                  <Footer />
                </div>
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
