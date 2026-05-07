"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { calLink, calNamespace } from "@/data/booking";

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: calNamespace });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#2547D0" },
          dark: { "cal-brand": "#2547D0" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace={calNamespace}
      calLink={calLink}
      style={{ width: "100%", height: "640px", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
