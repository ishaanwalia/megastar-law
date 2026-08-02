"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";

const STORAGE_KEY = "megastar-cookie-consent";
const CONSENT_EVENT = "megastar-consent-change";

// localStorage is an external store, so read it through useSyncExternalStore
// rather than an effect that setStates on mount — same result, one render
// fewer, and no flash of a banner the visitor already dismissed.
function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const getConsent = () => localStorage.getItem(STORAGE_KEY);
// Server render has no localStorage; assume consented so the banner never
// appears in the HTML and then vanish on hydration.
const getConsentOnServer = () => "accepted";

// Both widgets live in one `flex-col-reverse` container anchored to the
// bottom of the screen: the cookie banner (first in DOM) sits flush at
// the bottom, and the WhatsApp button (second in DOM) stacks above it —
// the browser's own layout engine keeps them apart, correct regardless
// of how many lines the banner wraps to. No JS-measured pixel offsets.
export function FloatingWidgets() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getConsentOnServer
  );
  const cookieVisible = consent === null;

  function acceptCookies() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  // Internal CRM, not the public marketing site — neither widget belongs there.
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col-reverse items-end gap-4 p-5">
      {cookieVisible && (
        <div
          role="region"
          aria-label="Cookie notice"
          className="pointer-events-auto w-full rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm sm:p-5"
        >
          <div className="mx-auto flex max-w-[1680px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-muted-foreground">
              This site uses privacy-friendly, cookieless analytics to
              understand how pages are used. No personal data is sold or
              shared. See our{" "}
              <Link href="/privacy" className="underline hover:text-brand">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <Button size="sm" onClick={acceptCookies} className="shrink-0">
              Got it
            </Button>
          </div>
        </div>
      )}
      <div className="motion-safe:animate-[widget-in_0.5s_ease-out_1s_both]">
        <WhatsAppButton />
      </div>
    </div>
  );
}
