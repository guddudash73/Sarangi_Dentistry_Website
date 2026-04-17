"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { proceduresData } from "@/data/procedures";

type NavItem = {
  name: string;
  path: string;
  hasDropdown?: boolean;
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

export default function Navbar() {
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

  useEffect(() => {
    setIsOpen(false);
    setIsMobileProcedureOpen(false);
  }, [pathname]);

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
      if (window.innerWidth >= 768) {
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
            ? "max-w-5xl rounded-full border border-white/30 bg-white/12 px-4 shadow-[0_18px_50px_rgba(15,35,28,0.16)] backdrop-blur-2xl supports-backdrop-filter:bg-white/14 sm:px-6 md:px-8"
            : "max-w-7xl rounded-full border border-transparent bg-transparent px-4 shadow-none sm:px-8 lg:px-10"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}
        >
          <div className="shrink-0">
            <Link
              href="/"
              className="cursor-grow text-[1.65rem] font-bold tracking-tight text-[#17332b] transition-colors duration-300 md:text-3xl"
            >
              Sarangi <span className="text-[#4ea172]">Dentistry</span>
            </Link>
          </div>

          <div className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => {
              const active = isItemActive(pathname, item.path);

              return (
                <div key={item.name} className="group/dropdown relative">
                  <Link
                    href={item.path}
                    className={`cursor-grow group relative isolate flex items-center overflow-hidden rounded-full px-4 py-2.5 font-mono text-[0.98rem] font-semibold transition-all duration-300 ${
                      active
                        ? "text-[#03966a]"
                        : "text-[#17332b] hover:text-[#03966a]"
                    }`}
                  >
                    <span className="relative z-20">{item.name}</span>

                    {item.hasDropdown && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          active ? "text-[#03966a]" : ""
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
                      className={`absolute bottom-1.5 left-4 right-4 z-20 h-0.5 origin-center bg-[#03966a] transition-transform duration-300 ${
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
                          <h3 className="font-mono text-lg font-bold tracking-tight text-[#03966a]">
                            Our Procedures
                          </h3>
                        </div>

                        <div className="relative z-10 flex max-h-90 flex-col gap-y-1 overflow-y-auto pr-1">
                          {proceduresData.map((proc) => {
                            const procedureActive =
                              pathname === proc.path ||
                              pathname.startsWith(`${proc.path}/`);

                            return (
                              <Link
                                key={proc.id}
                                href={proc.path}
                                className={`cursor-grow group/item flex flex-col rounded-2xl px-3 py-3 transition-colors duration-300 ${
                                  procedureActive
                                    ? "bg-[#edf8f2]"
                                    : "hover:bg-[#f3fbf6]"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span
                                    className={`font-semibold transition-colors duration-300 ${
                                      procedureActive
                                        ? "text-[#03966a]"
                                        : "text-[#17332b] group-hover/item:text-[#03966a]"
                                    }`}
                                  >
                                    {proc.title}
                                  </span>
                                  <span
                                    className={`transition-all duration-300 ${
                                      procedureActive
                                        ? "translate-x-0 text-[#03966a] opacity-100"
                                        : "-translate-x-2 text-[#03966a] opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100"
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

            <Link
              href="/book-appointment"
              className={`cursor-grow group relative ml-4 flex shrink-0 items-center justify-center overflow-hidden bg-[#03966a] font-mono font-bold text-white shadow-lg shadow-[#03966a]/20 transition-all duration-300 hover:-translate-y-0.5 md:ml-6 ${
                isScrolled
                  ? "h-10 w-10 rounded-full md:h-11 md:w-11"
                  : "whitespace-nowrap rounded-full px-6 py-2.5"
              }`}
              title="Book Appointment"
            >
              <div className="absolute -inset-4 z-0 skew-x-12 translate-x-[-120%] bg-[#00ebb0] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" />
              <span
                className={`relative z-10 flex items-center justify-center transition-colors duration-500 group-hover:text-[#17332b] ${
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
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isOpen
                  ? "border-white/25 bg-white/16 text-[#17332b] backdrop-blur-xl"
                  : isScrolled
                    ? "border-white/30 bg-white/16 text-[#17332b] backdrop-blur-xl"
                    : "border-[#d9e7e0] bg-white/85 text-[#17332b] shadow-[0_10px_22px_rgba(20,40,34,0.08)]"
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
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-40 bg-[rgba(7,22,16,0.38)] backdrop-blur-md md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%", opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.9 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 h-dvh w-[86%] max-w-sm border-r border-white/20 bg-[linear-gradient(180deg,rgba(45,76,62,0.92),rgba(29,50,41,0.96))] shadow-[0_24px_80px_rgba(5,18,13,0.38)] backdrop-blur-2xl md:hidden"
            >
              <div className="flex h-full flex-col overflow-y-auto px-5 pb-6 pt-5">
                <div className="mb-6 flex items-center justify-between rounded-[28px] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-md">
                  <div>
                    <div className="text-[1.5rem] font-bold tracking-tight text-white">
                      Sarangi <span className="text-[#8be0b6]">Dentistry</span>
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8eee3]/75">
                      Premium Dental Care
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-white/16"
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

                <div className="rounded-[30px] border border-white/10 bg-white/6 p-3 backdrop-blur-md">
                  {navItems.map((item) => {
                    const active = isItemActive(pathname, item.path);

                    return (
                      <div
                        key={item.name}
                        className="overflow-hidden rounded-[22px]"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`grow rounded-[18px] px-4 py-4 font-mono text-[1.05rem] font-semibold transition-all duration-300 ${
                              active
                                ? "bg-[#e8f7ee] text-[#03966a]"
                                : "text-[#eef8f1] hover:bg-white/8"
                            }`}
                          >
                            {item.name}
                          </Link>

                          {item.hasDropdown && (
                            <button
                              onClick={() =>
                                setIsMobileProcedureOpen((prev) => !prev)
                              }
                              className={`ml-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
                                isMobileProcedureOpen
                                  ? "bg-white/16 text-[#8be0b6]"
                                  : "text-[#eef8f1] hover:bg-white/10"
                              }`}
                              type="button"
                              aria-label="Toggle procedure menu"
                              aria-expanded={isMobileProcedureOpen}
                            >
                              <svg
                                className={`h-5 w-5 transition-transform duration-300 ${
                                  isMobileProcedureOpen ? "rotate-180" : ""
                                }`}
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
                              transition={{ duration: 0.28 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 space-y-2 rounded-[20px] bg-white/6 p-3">
                                {proceduresData.map((proc) => {
                                  const procedureActive =
                                    pathname === proc.path ||
                                    pathname.startsWith(`${proc.path}/`);

                                  return (
                                    <Link
                                      key={proc.id}
                                      href={proc.path}
                                      onClick={() => setIsOpen(false)}
                                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[0.98rem] font-medium transition-all duration-300 ${
                                        procedureActive
                                          ? "bg-[#e8f7ee] text-[#03966a]"
                                          : "text-[#d8eee3] hover:bg-white/8 hover:text-white"
                                      }`}
                                    >
                                      <span>{proc.title}</span>
                                      <span className="text-sm">→</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Link
                    href="/book-appointment"
                    onClick={() => setIsOpen(false)}
                    className="group relative flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full bg-[#03966a] px-6 py-4 text-center font-mono font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(3,150,106,0.24)] transition-all duration-300"
                  >
                    <div className="absolute -inset-4 z-0 skew-x-12 translate-x-[-120%] bg-[#00ebb0] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-[#17332b]">
                      Book Appointment
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
