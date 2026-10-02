/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#1CA7EC",          // Primary Azure
          azure: "#1CA7EC",         // #1CA7EC
          royal: "#1F2F98",         // #1F2F98 (Deep Royal Blue)
          cyan: "#4ADEDE",          // #4ADEDE (Bright Cyan Accent)
          ocean: "#1AA7EC",         // #1AA7EC
          aqua: "#1CA7EC",
          mint: "#1CA7EC",
          "pale-aqua": "#F0F9FF",   // Soft Ice Surface
          "deep-green": "#1F2F98",
          "clinical-green": "#162270",
          ink: "#0F172A",           // Deep Slate Navy Text
          dark: "#F8FAFC",          // Light Section Card
          darker: "#FFFFFF",        // Root Body Light
          grey: "#64748B",
        },
        accent: {
          purple: "#1F2F98", // Royal Cobalt (Rheumatology)
          amber: "#F59E2B",  // Joint / Inflammation
          rose: "#1CA7EC",   // Azure / Dermatology
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-bebas)", "sans-serif"],
        hindi: ["var(--font-noto-hindi)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "acord-gradient": "linear-gradient(135deg, #1CA7EC 0%, #1AA7EC 50%, #4ADEDE 100%)",
        "acord-royal-gradient": "linear-gradient(135deg, #1CA7EC 0%, #1F2F98 100%)",
        "acord-cyan-gradient": "linear-gradient(135deg, #4ADEDE 0%, #1AA7EC 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "teal-glow": "0 10px 25px -5px rgba(28, 167, 236, 0.35)",
        "azure-glow": "0 10px 25px -5px rgba(28, 167, 236, 0.35)",
        "royal-glow": "0 10px 25px -5px rgba(31, 47, 152, 0.3)",
        "cyan-glow": "0 10px 25px -5px rgba(74, 222, 222, 0.35)",
        "card-soft": "0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 0 1px 1px rgba(28, 167, 236, 0.1)",
        "glass": "0 10px 30px 0 rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
