import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "ArmanX-Labs — Build. Explore. Innovate.",
  description:
    "An open-source technology lab building developer tools, AI systems, software engineering tools, automation, and experimental projects. RepoMap is our first major project.",
  keywords: [
    "ArmanX-Labs",
    "open source",
    "developer tools",
    "AI",
    "RepoMap",
    "software engineering",
    "code intelligence",
    "automation",
  ],
  authors: [{ name: "ArmanX-Labs" }],
  icons: {
    icon: "/brand-logo.png",
    apple: "/brand-logo.png",
  },
  openGraph: {
    title: "ArmanX-Labs — Build. Explore. Innovate.",
    description:
      "An open-source technology lab building developer tools, AI systems, and experimental software.",
    siteName: "ArmanX-Labs",
    type: "website",
    images: ["/brand-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArmanX-Labs — Build. Explore. Innovate.",
    description:
      "An open-source technology lab building developer tools, AI systems, and experimental software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground grain-overlay`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
