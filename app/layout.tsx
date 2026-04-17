import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/common/CustomCursor";

const footlightMtPro = localFont({
  src: [
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/footlight-mt-pro/FootlightMTProExtraBoldIt.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-footlight-mt-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarangi Dentistry",
  description: "Modern dental care website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={footlightMtPro.variable}>
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
