export default function robots() {
  const baseUrl = "https://acordclinics.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Explicitly allow all major AI Search, LLM, and Agent crawlers
      {
        userAgent: [
          // OpenAI & ChatGPT
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          // Anthropic Claude
          "ClaudeBot",
          "Claude-Web",
          "Anthropic-AI",
          // Perplexity AI
          "PerplexityBot",
          // Google Gemini & Vertex AI
          "Google-Extended",
          "GoogleOther",
          "GoogleOther-Image",
          "GoogleOther-Video",
          // Meta AI
          "Meta-ExternalAgent",
          "FacebookBot",
          // Apple Intelligence
          "Applebot",
          "Applebot-Extended",
          // Microsoft Copilot & Bing
          "Bingbot",
          // Cohere, Mistral & Knowledge Graph Bots
          "cohere-ai",
          "Diffbot",
          "Bytespider",
          "Amazonbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
