import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AgencyBackground } from "@/components/background/AgencyBackground";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Web & Mobile App Development for Startups`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "We build scalable web and mobile apps for startups. From idea to launch—clean code, fast delivery, measurable results.",
  openGraph: {
    title: `${SITE_NAME} | Web & Mobile App Development for Startups`,
    description:
      "From idea to launch, we help you ship faster with clean, reliable code.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/image/i2logo.png", type: "image/png" }],
    apple: "/image/i2logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full bg-transparent text-foreground transition-colors duration-300">
        <ThemeProvider>
          <AgencyBackground />
          <div className="relative z-10 flex min-h-full flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
