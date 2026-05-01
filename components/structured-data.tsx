import { siteConfig } from "@/lib/config";

/**
 * JSON-LD Person + WebSite schema rendered in the root layout.
 * Helps Google build a Knowledge Panel and rich results for "Sreekar Atla".
 */
export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sreekar Atla",
    alternateName: "Sreekar Reddy Atla",
    url: siteConfig.url,
    image: `${siteConfig.url}/social/avatar.svg`,
    jobTitle: "Director — Enterprise Architect",
    description:
      "Director-level Enterprise Architect specialising in AI/cloud platforms and enterprise architecture. Founder of Atlas — a hospitality-tech portfolio. 21+ years across enterprise architecture, presales, and as a hands-on founder.",
    worksFor: {
      "@type": "Organization",
      name: "Codincity Digital Technologies"
    },
    founder: {
      "@type": "Organization",
      name: "Atlas Homestays",
      url: "https://atlashomestays.com"
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Indian School of Business — CTO Programme"
      },
      {
        "@type": "EducationalOrganization",
        name: "Liverpool John Moores University, UK — MS Machine Learning & AI"
      }
    ],
    knowsAbout: [
      "Enterprise Architecture",
      "Generative AI",
      "Large Language Models",
      "Cloud Computing",
      "Multi-tenant SaaS",
      "Hospitality Technology",
      "DORA metrics"
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      "https://atlashomestays.com",
      "https://atlaspms.in",
      "https://atlastays.com"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "Sreekar Atla"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
