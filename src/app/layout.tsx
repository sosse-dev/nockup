import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOCKUP",
  description: "Satu Ketuk untuk Instan Meeting!",
  icons: {
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/yoom-logo.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "#333333",            /* Text hitam soft (bukan putih lagi) */
            colorPrimary: "#3B82F6",         /* Biru lebih soft (tetap sebagai aksen) */
            colorBackground: "#FFFFFF",      /* Background putih */
            colorInputBackground: "#F5F7FA", /* Warna input abu-abu sangat muda */
            colorInputText: "#333333"        /* Text input hitam */
          },
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
