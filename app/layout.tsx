import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aibuildspace.com"),
  title: {
    default: "AI Buildspace · Work smarter with AI",
    template: "%s · AI Buildspace",
  },
  description:
    "Custom AI workflows and live sessions, built around the tools you already use. Sessions, workshops, and custom builds with Rohit.",
  openGraph: {
    type: "website",
    url: "https://aibuildspace.com",
    siteName: "AI Buildspace",
    title: "AI Buildspace · Work smarter with AI",
    description:
      "Custom AI workflows and live sessions, built around the tools you already use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Buildspace · Work smarter with AI",
    description:
      "Custom AI workflows and live sessions, built around the tools you already use.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFEFC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
