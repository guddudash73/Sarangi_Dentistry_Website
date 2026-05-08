import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";

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
  metadataBase: new URL('https://sarangidentistry.com'),
  title: {
    default: 'Sarangi Dentistry | Best Dentistry in Bhubaneswar',
    template: '%s | Sarangi Dentistry',
  },
  description: 'Top rated dental clinic and best dentistry in Bhubaneswar providing advanced, personalized, and aesthetic dental treatments.',
  keywords: ["dentist bhubaneswar", "best dentistry in bhubaneswar", "dental clinic bhubaneswar", "sarangi dentistry"],
  authors: [{ name: 'Dr. Sarangi' }],
  creator: 'Dr. Sarangi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={footlightMtPro.variable}>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
