import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { faqs } from "@/lib/faq";

export function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-20">
        <Reveal>
          <h2 className="font-heading text-2xl font-medium tracking-tight">
            Frequently asked questions
          </h2>
          <Accordion className="mt-6">
            {faqs.map((f) => (
              <AccordionItem key={f.question} value={f.question}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{f.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
