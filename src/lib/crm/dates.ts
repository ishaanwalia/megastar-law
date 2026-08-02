// The firm works in one timezone and only one: Chandigarh, IST. The server does
// not — Vercel runs UTC while `next dev` on a local machine runs whatever that
// machine is set to. So every date crossing the browser/database boundary is
// converted explicitly here rather than relying on the ambient zone, which is
// what silently stored appointments 5.5 hours off.

const IST = "Asia/Kolkata";
const IST_OFFSET = "+05:30";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: IST,
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dateTimeFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: IST,
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const inputParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: IST,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * A `date` column arrives as "2026-09-05" and a `timestamptz` as a full ISO
 * string; both render as the IST calendar day. (A bare date parses as UTC
 * midnight, which is still the same day in IST because IST is ahead of UTC.)
 */
export function formatISTDate(value: string | Date) {
  return dateFormat.format(new Date(value));
}

/** "5 Sep 2026, 10:30 am" — always the wall clock in Chandigarh. */
export function formatISTDateTime(value: string | Date) {
  return dateTimeFormat.format(new Date(value));
}

/**
 * A `datetime-local` input yields a bare "2026-09-05T10:30" with no zone, so
 * `new Date()` would read it in the *server's* zone. Pin it to IST: 10:30 typed
 * in Chandigarh is 10:30 in Chandigarh no matter where this runs.
 */
export function istInputToISO(local: string) {
  return new Date(`${local}${IST_OFFSET}`).toISOString();
}

/** Inverse of `istInputToISO`, for pre-filling a `datetime-local` on an edit form. */
export function isoToISTInput(iso: string) {
  // en-CA with these options gives "2026-09-05, 10:30" — reshape to the
  // "YYYY-MM-DDTHH:mm" the input element requires.
  return inputParts.format(new Date(iso)).replace(", ", "T");
}
