"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function ChandigarhClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
      <Clock className="size-3.5" />
      It&apos;s currently {time} in Chandigarh (IST)
    </p>
  );
}
