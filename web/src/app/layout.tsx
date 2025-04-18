import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutHeader from "@/components/layoutHeader";
import { SessionProvider } from "next-auth/react";
import AddQuoteButton from "@/components/addQouteButton";
import LayoutFooter from "@/components/layoutFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kdramaqoutes.com",
  description: "kdramaqoutes.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LayoutHeader />
          {children}
          <AddQuoteButton />
          <LayoutFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
