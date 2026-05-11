// components/layout/FooterClient.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProcedureItem } from "@/types/procedure";
import type { ContactInfo } from "@/types/contact";
import Image from "next/image";

type QuickLink = {
  name: string;
  path: string;
};

type FooterClientProps = {
  procedures: ProcedureItem[];
  contactInfo: ContactInfo;
};

const quickLinks: QuickLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Photography", path: "/photography" },
  { name: "Author", path: "/books" },
  { name: "Contact", path: "/contact" },
];

function buildPhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");

  if (!digits) {
    return "#";
  }

  return `tel:${digits}`;
}

export default function FooterClient({
  procedures,
  contactInfo,
}: FooterClientProps) {
  return (
    <footer className="relative z-10 w-full overflow-hidden border-t border-[#c0d2d8] bg-accent-soft pb-8 pt-16 text-secondary">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-40 right-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -left-20 top-10 h-[400px] w-[400px] rounded-full bg-white/40 blur-[100px]" />

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 bottom-10 h-80 w-80 opacity-[0.06] blur-[0.5px] sm:h-96 sm:w-96 md:-right-10 md:bottom-0 md:h-[450px] md:w-[450px]"
        >
          <Image width={1200} height={1200} 
            src="/assets/sd_teeth.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </motion.div>

        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -left-32 top-20 h-[400px] w-[400px] opacity-[0.15] md:-left-20 md:-top-10 md:h-[600px] md:w-[600px]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#03966a"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <circle cx="50" cy="50" r="35" stroke="#03966a" strokeWidth="0.2" />
        </motion.svg>

        <motion.svg
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-[-10rem] left-1/3 h-[300px] w-[300px] opacity-[0.2]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="1 6"
          />
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.3" />
        </motion.svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
            <Link
              href="/"
              className="mb-8 inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image width={1200} height={1200} 
                src="/assets/sarangi-logo.png"
                alt="Sarangi Dentistry Logo"
                className="h-16 w-auto object-contain md:h-20"
              />
            </Link>

            <p className="mb-8 max-w-sm text-base leading-relaxed text-secondary/80">
              Sophisticated dental procedures and treatments tailored to enhance
              your smile with natural-looking results.
            </p>

            <div className="flex space-x-6">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/50 text-secondary transition-all duration-300 hover:scale-110 hover:border-[#03966a]/30 hover:bg-[#03966a] hover:text-white hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/50 text-secondary transition-all duration-300 hover:scale-110 hover:border-[#03966a]/30 hover:bg-[#03966a] hover:text-white hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:col-span-8 lg:ml-auto lg:gap-16">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-[#03966a]">
                Explore
              </h3>
              <ul className="flex flex-col items-center space-y-4 text-sm font-medium text-secondary/80 lg:items-start">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="group flex w-max items-center transition-colors duration-300 hover:text-[#03966a]"
                    >
                      <span className="mr-0 h-[2px] w-0 bg-[#03966a] transition-all duration-300 ease-out group-hover:mr-2 group-hover:w-3" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-[#03966a]">
                Procedures
              </h3>
              <ul className="flex flex-col items-center space-y-4 text-sm font-medium text-secondary/80 lg:items-start">
                {procedures.map((proc) => (
                  <li key={proc.id}>
                    <Link
                      href={proc.path}
                      className="group flex w-max items-center transition-colors duration-300 hover:text-[#03966a]"
                    >
                      <span className="mr-0 h-[2px] w-0 bg-[#03966a] transition-all duration-300 ease-out group-hover:mr-2 group-hover:w-3" />
                      {proc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-[#03966a]">
                Contact Us
              </h3>

              <ul className="flex flex-col items-center space-y-6 text-sm text-secondary/80 lg:items-start">
                <li className="group flex flex-col items-center text-center transition-colors duration-300 hover:text-[#03966a] lg:flex-row lg:items-start lg:text-left">
                  <svg
                    className="mb-3 h-6 w-6 shrink-0 text-[#03966a] lg:mb-0 lg:mr-4 lg:mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <div className="leading-relaxed">
                    {contactInfo.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </li>

                <li className="group flex flex-col items-center transition-colors duration-300 hover:text-[#03966a] lg:flex-row">
                  <svg
                    className="mb-3 h-6 w-6 shrink-0 text-[#03966a] lg:mb-0 lg:mr-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <a href={`mailto:${contactInfo.email}`} className="break-all">
                    {contactInfo.email}
                  </a>
                </li>

                <li className="group flex flex-col items-center transition-colors duration-300 hover:text-[#03966a] lg:flex-row">
                  <svg
                    className="mb-3 h-6 w-6 shrink-0 text-[#03966a] lg:mb-0 lg:mr-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>

                  <a href={buildPhoneHref(contactInfo.phone)}>
                    {contactInfo.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-secondary/20 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-secondary/60">
            &copy; {new Date().getFullYear()} Sarangi Dentistry. All rights
            reserved.
          </p>

          <div className="flex space-x-8 text-xs font-medium text-secondary/60">
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-[#03966a]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-[#03966a]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
