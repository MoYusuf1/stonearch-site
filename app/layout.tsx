import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });

const title = "Stone Arch Web Design — $499 One-Page Websites in Minneapolis";
const description =
  "One-page websites for Minneapolis–St. Paul small businesses. $499 to build, $49 a month, free mockup before you pay. Live in 2–3 days.";

export const metadata: Metadata = {
  metadataBase: new URL("https://moyusuf1.github.io/stonearch-site/"),
  title,
  description,
  applicationName: "Stone Arch Web Design",
  authors: [{ name: "Mohamed Yusuf" }],
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    siteName: "Stone Arch Web Design",
    title,
    description,
    images: [{ url: "img/hero-cafe.jpg", width: 1600, height: 1097, alt: "Inside a small cafe" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["img/hero-cafe.jpg"] },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.svg`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH}/apple-touch-icon.png`,
  },
  other: { "geo.region": "US-MN", "geo.placename": "Minneapolis" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen text-[17px] leading-[1.4]">{children}</body>
    </html>
  );
}
