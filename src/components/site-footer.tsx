import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { firm, offices, practiceAreas } from "@/lib/firm-data";
import { mainNav } from "@/lib/nav";

// Deep-charcoal literal rather than a semantic token: this band must stay dark
// in both themes, and --primary/--ink both invert under .dark.
const SURFACE = "bg-[#12181E] text-[#F8F5F0]";

function ContactRow({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group flex items-center gap-3 text-sm text-[#F8F5F0]/70 transition-colors hover:text-[#F8F5F0]"
    >
      <span className="[perspective:400px]">
        <span className="flex size-8 items-center justify-center rounded-lg bg-white/8 transition-colors group-hover:bg-brand/25 group-hover:animate-[icon-spin_1.1s_cubic-bezier(0.65,0,0.35,1)] motion-reduce:group-hover:animate-none">
          <Icon className="size-4" />
        </span>
      </span>
      <span className="min-w-0 break-words">{label}</span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className={SURFACE}>
      {/* Helpline band — the single loudest thing in the footer. */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] text-brand uppercase">
              {firm.helplineLabel}
            </p>
            <a
              href={`tel:${firm.helpline.replace(/\s/g, "")}`}
              className="group mt-2 flex items-center gap-3 font-heading text-2xl font-medium tracking-tight transition-colors hover:text-brand sm:text-3xl"
            >
              <span className="[perspective:400px]">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand/20 group-hover:animate-[icon-spin_1.1s_cubic-bezier(0.65,0,0.35,1)] motion-reduce:group-hover:animate-none">
                  <Phone className="size-5 text-brand" />
                </span>
              </span>
              {firm.helpline}
            </a>
          </div>
          <Button
            size="lg"
            render={<Link href="/contact" />}
            nativeButton={false}
            className="btn-sheen w-full bg-[#F8F5F0] text-[#161616] hover:bg-white sm:w-auto"
          >
            Get a Call Back <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={32}
              height={30}
              className="h-8 w-auto invert"
            />
            <div className="font-heading text-lg leading-tight font-medium">
              {firm.name}
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F8F5F0]/60">
            Personalized attention, settlement and courtroom experience, and a
            24/7 legal helpline.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <ContactRow
              href={`mailto:${firm.email}`}
              icon={Mail}
              label={firm.email}
            />
            <ContactRow
              href={`https://wa.me/${firm.whatsapp}`}
              icon={MessageCircle}
              label="WhatsApp the firm"
              external
            />
          </div>
        </div>

        <div>
          <div className="text-[11px] font-medium tracking-[0.2em] text-[#F8F5F0]/45 uppercase">
            Navigate
          </div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[#F8F5F0]/70">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] font-medium tracking-[0.2em] text-[#F8F5F0]/45 uppercase">
            Practice Areas
          </div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[#F8F5F0]/70">
            {practiceAreas.slice(0, 5).map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="transition-colors hover:text-brand"
                >
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] font-medium tracking-[0.2em] text-[#F8F5F0]/45 uppercase">
            Chandigarh Offices
          </div>
          <ul className="mt-4 flex flex-col gap-4 text-sm text-[#F8F5F0]/60">
            {offices.map((office) => (
              <li key={office.label} className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand/70" />
                <span>
                  <span className="block font-medium text-[#F8F5F0]">
                    {office.label}
                  </span>
                  {office.address}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-[#F8F5F0]/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            &copy; {new Date().getFullYear()} {firm.name}. All rights reserved.{" "}
            Interface effects by{" "}
            <a
              href="https://skiper-ui.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand"
            >
              Skiper UI
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.originkit.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand"
            >
              Originkit
            </a>
            .
          </span>
          <div className="flex gap-5">
            <Link href="/disclaimer" className="hover:text-brand">
              Disclaimer
            </Link>
            <Link href="/privacy" className="hover:text-brand">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
