// Run: npm test   (Node's built-in runner, no framework)
//
// These four assertions are the whole reason appointments were 5.5 hours wrong.
// Run with TZ=UTC and TZ=Asia/Kolkata — they must pass identically in both,
// because that difference is exactly what prod (Vercel/UTC) and a local dev
// machine (IST) disagreed about.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  istInputToISO,
  isoToISTInput,
  formatISTDate,
  formatISTDateTime,
} from "./dates.ts";

test("a datetime-local value is read as IST, not as the server's zone", () => {
  // 10:30 typed in Chandigarh is 05:00 UTC — never 10:30 UTC.
  assert.equal(istInputToISO("2026-09-05T10:30"), "2026-09-05T05:00:00.000Z");
  assert.equal(istInputToISO("2026-09-05T10:30:00"), "2026-09-05T05:00:00.000Z");
});

test("round-trips back to the same wall clock for the edit form", () => {
  assert.equal(isoToISTInput("2026-09-05T05:00:00.000Z"), "2026-09-05T10:30");
  for (const local of [
    "2026-01-01T00:00",
    "2026-09-05T12:00",
    "2026-12-31T23:59",
  ]) {
    assert.equal(isoToISTInput(istInputToISO(local)), local);
  }
});

test("display always shows the Chandigarh wall clock", () => {
  assert.match(formatISTDateTime("2026-09-05T05:00:00.000Z"), /10:30/);
  // 23:00 UTC is already the next day in IST — the cheapest way to catch a
  // regression back to server-zone formatting.
  assert.match(formatISTDate("2026-09-05T23:00:00.000Z"), /6 Sept 2026/);
});

test("a bare date column renders as that calendar day", () => {
  assert.match(formatISTDate("2026-09-05"), /5 Sept 2026/);
});
