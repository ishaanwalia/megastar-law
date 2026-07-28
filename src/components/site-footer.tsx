import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { firm, offices, practiceAreas } from "@/lib/firm-data";
import { mainNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-sm font-medium tracking-wide text-gold uppercase">
              {firm.helplineLabel}
            </p>
            <a
              href={`tel:${firm.helpline.replace(/\s/g, "")}`}
              className="mt-1 flex items-center gap-2 font-heading text-2xl font-medium hover:text-gold"
            >
              <Phone className="size-5" /> {firm.helpline}
            </a>
          </div>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            className="btn-sheen"
          >
            Get a Call Back <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={32}
              height={30}
              className="h-8 w-auto dark:invert"
            />
            <div className="font-heading text-lg font-medium">
              {firm.name}
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Personalized attention, settlement and courtroom experience,
            and a 24/7 legal helpline.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${firm.email}`}
              className="flex items-center gap-2 hover:text-gold"
            >
              <Mail className="size-4" /> {firm.email}
            </a>
            <a
              href={`https://wa.me/${firm.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold"
            >
              <MessageCircle className="size-4" /> WhatsApp the firm
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Navigate</div>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium">Practice Areas</div>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {practiceAreas.slice(0, 5).map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="hover:text-gold"
                >
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium">Chandigarh Offices</div>
          <ul className="mt-3 flex flex-col gap-3 text-sm text-muted-foreground">
            {offices.map((office) => (
              <li key={office.label}>
                <div className="font-medium text-foreground">{office.label}</div>
                {office.address}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            &copy; {new Date().getFullYear()} {firm.name}. All rights reserved.
            {" "}Interface effects by{" "}
            <a
              href="https://skiper-ui.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Skiper UI
            </a>
            {" "}&amp;{" "}
            <a
              href="https://www.originkit.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Originkit
            </a>
            .
          </span>
          <div className="flex gap-4">
            <Link href="/disclaimer" className="hover:text-gold">
              Disclaimer
            </Link>
            <Link href="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
