import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { roobert } from "./fonts";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skinstric",
  description: "Sophisticated skincare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roobert.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
