import { ImageResponse } from "next/og";

export const alt = "AI Buildspace · Work smarter with AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAFAF7";
const INK = "#0B0B0C";
const MUTED = "#5B5B62";
const ACCENT = "#2547D0";
const BORDER = "#E7E5DF";

const HEADLINE = "Work smarter with AI.";
const TAGLINE =
  "Custom AI workflows and live sessions, built around the tools you already use.";
const EYEBROW = "AI Buildspace · by Rohit";
const URL_LABEL = "aibuildspace.com";
const SERVICES_LABEL = "Sessions · Workshops · Custom builds";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      // Spoof a UA that Google serves TTF (not WOFF2) to.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  }).then((r) => r.text());
  const match = css.match(
    /src:\s*url\(([^)]+)\)\s*format\(['"]?(truetype|opentype)['"]?\)/,
  );
  if (!match) throw new Error(`Failed to parse font URL for ${family} ${weight}`);
  const buf = await fetch(match[1]).then((r) => r.arrayBuffer());
  return buf;
}

export default async function Image() {
  const allText = `${HEADLINE}${TAGLINE}${EYEBROW}${URL_LABEL}${SERVICES_LABEL}`;
  const [display700, sans500, sans400] = await Promise.all([
    loadGoogleFont("Bricolage Grotesque", 700, HEADLINE),
    loadGoogleFont("Inter", 500, `${EYEBROW}${URL_LABEL}${SERVICES_LABEL}`),
    loadGoogleFont("Inter", 400, allText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 88px",
          fontFamily: "Inter",
          color: INK,
          position: "relative",
        }}
      >
        {/* subtle border ring */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: `1px solid ${BORDER}`,
            borderRadius: 24,
            display: "flex",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.08em",
            color: MUTED,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: ACCENT,
              marginRight: 16,
              display: "flex",
            }}
          />
          {EYEBROW}
        </div>

        {/* headline + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontFamily: "Bricolage Grotesque",
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            {HEADLINE}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 38,
              lineHeight: 1.35,
              color: MUTED,
              fontWeight: 400,
              maxWidth: 940,
            }}
          >
            {TAGLINE}
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: MUTED,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 2,
                background: ACCENT,
                marginRight: 18,
                display: "flex",
              }}
            />
            <span style={{ color: INK, fontWeight: 500 }}>Sessions</span>
            <span style={{ margin: "0 14px" }}>·</span>
            <span style={{ color: INK, fontWeight: 500 }}>Workshops</span>
            <span style={{ margin: "0 14px" }}>·</span>
            <span style={{ color: INK, fontWeight: 500 }}>Custom builds</span>
          </div>
          <div style={{ display: "flex" }}>{URL_LABEL}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: display700,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: sans500,
          weight: 500,
          style: "normal",
        },
        {
          name: "Inter",
          data: sans400,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
