import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { roobert } from "./fonts";
import "./globals.css";
import Navbar from "../components/Navbar";

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
        <div className="min-h-screen flex flex-col">
          <header className="absolute top-0 left-0 right-0 z-10">
            <Navbar />
          </header>
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
