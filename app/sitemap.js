import {
  DOCTORS,
  RHEUMATOLOGY_CONDITIONS,
  DERMATOLOGY_TREATMENTS,
  CLINIC_INFO,
  BLOG_ARTICLES,
} from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://acordclinics.com";
  const lastModified = new Date();

  // Static core pages
  const staticRoutes = [
    { url: `${baseUrl}`, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/doctors`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/rheumatology`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/dermatology`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/book-appointment`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/results`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/locations`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/technology`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/testimonials`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/patient-hub`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/patient-hub/faq`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/rheumatology/conditions`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/rheumatology/procedures`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/rheumatology/treatments`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/rheumatology/symptom-finder`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/medical-disclaimer`, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Dynamic doctor profile pages
  const doctorRoutes = (DOCTORS || []).map((doc) => ({
    url: `${baseUrl}/doctors/${doc.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic location pages (Gorakhpur, Bhagalpur)
  const locationRoutes = (CLINIC_INFO?.branches || []).map((b) => ({
    url: `${baseUrl}/locations/${b.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Dynamic rheumatology condition pages
  const conditionRoutes = (RHEUMATOLOGY_CONDITIONS || []).map((cond) => ({
    url: `${baseUrl}/rheumatology/conditions/${cond.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic dermatology treatment pages
  const treatmentRoutes = (DERMATOLOGY_TREATMENTS || []).map((t) => ({
    url: `${baseUrl}/dermatology/treatments/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic blog pages
  const blogRoutes = (BLOG_ARTICLES || []).map((b) => ({
    url: `${baseUrl}/patient-hub/blog/${b.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes.map((r) => ({ ...r, lastModified })),
    ...doctorRoutes,
    ...locationRoutes,
    ...conditionRoutes,
    ...treatmentRoutes,
    ...blogRoutes,
  ];
}
