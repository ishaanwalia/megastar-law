import { firm, advocates, practiceAreas } from "@/lib/firm-data";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: firm.name,
    url: "https://megastarlawassociates.com",
    email: firm.email,
    telephone: firm.helpline,
    address: {
      "@type": "PostalAddress",
      streetAddress: "SCO-570, 2nd Floor, Sector 45-C",
      addressLocality: "Chandigarh",
      postalCode: "160047",
      addressCountry: "IN",
    },
    areaServed: "Chandigarh, Punjab & Haryana",
    knowsAbout: practiceAreas.map((area) => area.title),
    founder: {
      "@type": "Person",
      name: advocates[0].fullName,
      jobTitle: advocates[0].role,
      description: advocates[0].bio,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
