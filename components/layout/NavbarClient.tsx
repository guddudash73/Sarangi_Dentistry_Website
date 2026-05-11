"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ProcedureItem } from "@/types/procedure";
import Image from "next/image";

type NavItem = {
  name: string;
  path: string;
  hasDropdown?: boolean;
};

type NavbarClientProps = {
  procedures: ProcedureItem[];
};

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Procedure", path: "/procedure", hasDropdown: true },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Certification", path: "/certification" },
  { name: "Contact", path: "/contact" },
];

function isItemActive(pathname: string, itemPath: string) {
  if (itemPath === "/") return pathname === "/";
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export default function NavbarClient({ procedures }: NavbarClientProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileProcedureOpen, setIsMobileProcedureOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setIsMobileProcedureOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setIsMobileProcedureOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 ${
        isScrolled ? "pt-3 sm:pt-4" : "pt-0"
      }`}
    >
      <div
        className={`relative z-10 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? "max-w-5xl rounded-full border border-white/40 bg-white/30 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-sm backdrop-saturate-[1.2] sm:px-6 md:px-8"
            : "max-w-7xl rounded-full border border-transparent bg-transparent px-4 shadow-none sm:px-8 lg:px-10"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}
        >
          <div className="flex shrink-0 justify-start">
            <Link
              href="/"
              className="cursor-grow flex items-center transition-opacity duration-300 hover:opacity-90"
            >
              <Image width={1200} height={1200} 
                src="/assets/sarangi-logo.png"
                alt="Sarangi Dentistry Logo"
                className="h-10 w-auto object-contain md:h-12"
              />
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center space-x-1 lg:flex">
            {navItems.map((item) => {
              const active = isItemActive(pathname, item.path);

              return (
                <div key={item.name} className="group/dropdown relative">
                  <Link
                    href={item.path}
                    className={`cursor-grow group relative isolate flex items-center overflow-hidden rounded-full px-4 py-2.5 font-mono text-[0.98rem] font-semibold transition-all duration-300 ${
                      active
                        ? "text-primary"
                        : "text-secondary hover:text-primary-hover"
                    }`}
                  >
                    <span className="relative z-20">{item.name}</span>

                    {item.hasDropdown && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          active ? "text-primary" : ""
                        } group-hover/dropdown:rotate-180`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}

                    <span
                      className={`absolute bottom-1.5 left-4 right-4 z-20 h-0.5 origin-center bg-accent-soft transition-transform duration-300 ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  {item.hasDropdown && (
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-75 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 ease-out group-hover/dropdown:pointer-events-auto group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100">
                      <div className="relative overflow-hidden rounded-3xl border border-white/35 bg-white p-4 shadow-[0_24px_50px_rgba(18,52,41,0.14)] backdrop-blur-2xl">
                        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#03966a]/8 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#03966a]/6 blur-3xl" />

                        <div className="mb-3 flex items-center justify-between border-b border-[#dcebe4] pb-3">
                          <h3 className="font-mono text-lg font-bold tracking-tight text-primary">
                            Our Procedures
                          </h3>
                        </div>

                        <div className="relative z-10 flex max-h-90 flex-col gap-y-1 overflow-y-auto pr-1">
                          {procedures.map((proc) => {
                            const procedureActive =
                              pathname === proc.path ||
                              pathname.startsWith(`${proc.path}/`);

                            return (
                              <Link
                                key={proc.id}
                                href={proc.path}
                                className={`cursor-grow group/item flex flex-col rounded-2xl px-3 py-3 transition-colors duration-300 ${
                                  procedureActive
                                    ? "bg-transparent"
                                    : "hover:bg-accent-soft"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span
                                    className={`font-semibold transition-colors duration-300 ${
                                      procedureActive
                                        ? "text-primary"
                                        : "text-secondary group-hover/item:text-white"
                                    }`}
                                  >
                                    {proc.title}
                                  </span>
                                  <span
                                    className={`transition-all duration-300 ${
                                      procedureActive
                                        ? "translate-x-0 text-primary opacity-100"
                                        : "-translate-x-2 text-primary opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                    }`}
                                  >
                                    →
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3">
            <Link
              href="/book-appointment"
              className={`cursor-grow group relative hidden shrink-0 items-center justify-center overflow-hidden bg-primary font-mono font-bold text-white shadow-lg shadow-[#03966a]/20 transition-all duration-300 hover:-translate-y-0.5 lg:flex ${
                isScrolled
                  ? "h-10 w-10 rounded-full md:h-11 md:w-11"
                  : "whitespace-nowrap rounded-full px-6 py-2.5"
              }`}
              title="Book Appointment"
            >
              <div className="absolute -inset-4 z-0 skew-x-12 translate-x-[-120%] bg-primary-hover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" />
              <span
                className={`relative z-10 flex items-center justify-center transition-colors duration-500 group-hover:text-white ${
                  !isScrolled ? "whitespace-nowrap" : ""
                }`}
              >
                {isScrolled ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="12" cy="15" r="1.5" />
                  </svg>
                ) : (
                  "BOOK APPOINTMENT"
                )}
              </span>
            </Link>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`relative flex h-11 w-11 items-center justify-center transition-all duration-300 lg:hidden ${
                isOpen
                  ? " text-[#17332b]"
                  : isScrolled
                    ? " text-[#17332b]"
                    : " text-[#17332b]"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              type="button"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-secondary/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 flex h-dvh w-[90%] max-w-sm flex-col bg-white/95 shadow-[-24px_0_80px_rgba(20,40,34,0.08)] backdrop-blur-3xl lg:hidden"
            >
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-6">
                <div className="mb-8 flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center"
                  >
                    <Image width={1200} height={1200} 
                      src="/assets/sarangi-logo.png"
                      alt="Sarangi Dentistry Logo"
                      className="h-10 w-auto object-contain"
                    />
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dcebe3] bg-background text-secondary transition-colors duration-300 hover:bg-[#d0e5d9]"
                    aria-label="Close menu"
                    type="button"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => {
                    const active = isItemActive(pathname, item.path);

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                        className="flex flex-col"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex-grow rounded-2xl px-5 py-4 font-mono text-[1.1rem] font-semibold transition-all duration-300 ${
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-secondary hover:bg-accent-soft"
                            }`}
                          >
                            {item.name}
                          </Link>

                          {item.hasDropdown && (
                            <button
                              onClick={() =>
                                setIsMobileProcedureOpen((prev) => !prev)
                              }
                              className={`ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                                isMobileProcedureOpen
                                  ? "bg-primary text-white shadow-md shadow-primary/20"
                                  : "bg-accent-soft text-secondary hover:bg-[#d0e5d9]"
                              }`}
                              type="button"
                              aria-label="Toggle procedure menu"
                            >
                              <svg
                                className={`h-5 w-5 transition-transform duration-300 ${isMobileProcedureOpen ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {item.hasDropdown && isMobileProcedureOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 flex flex-col space-y-1 rounded-[24px] bg-accent-soft p-3">
                                {procedures.map((proc) => {
                                  const procedureActive =
                                    pathname === proc.path ||
                                    pathname.startsWith(`${proc.path}/`);

                                  return (
                                    <Link
                                      key={proc.id}
                                      href={proc.path}
                                      onClick={() => setIsOpen(false)}
                                      className={`flex items-center justify-between rounded-[16px] px-4 py-3.5 text-[0.95rem] font-medium transition-all duration-300 ${
                                        procedureActive
                                          ? "bg-white text-primary shadow-sm"
                                          : "text-secondary hover:bg-white/50"
                                      }`}
                                    >
                                      <span>{proc.title}</span>
                                      <span className="text-lg opacity-50">
                                        →
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-auto pt-10"
                >
                  <Link
                    href="/book-appointment"
                    onClick={() => setIsOpen(false)}
                    className="group relative flex min-h-14 w-full items-center justify-center overflow-hidden rounded-[20px] bg-primary px-6 py-4 text-center font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_rgba(3,150,106,0.24)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute -inset-4 z-0 skew-x-12 translate-x-[-120%] bg-primary-hover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                      Book Appointment
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
