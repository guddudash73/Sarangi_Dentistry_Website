// components/contact/ContactNoticeBar.tsx
import type { ContactInfo } from "@/types/contact";

type ContactNoticeBarProps = {
  contactInfo: ContactInfo;
};

export default function ContactNoticeBar({
  contactInfo,
}: ContactNoticeBarProps) {
  const message = contactInfo.noticeMessage?.trim();

  if (!contactInfo.noticeEnabled || !message) {
    return null;
  }

  return (
    <div className="relative z-20 overflow-hidden border-y border-red-300 bg-red-600 py-2 text-white shadow-[0_10px_24px_rgba(220,38,38,0.18)]">
      <div className="flex w-max animate-[contact-notice-marquee_18s_linear_infinite] whitespace-nowrap">
        <span className="px-8 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
          Important Notice: {message}
        </span>
        <span className="px-8 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
          Important Notice: {message}
        </span>
        <span className="px-8 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
          Important Notice: {message}
        </span>
      </div>

      <style jsx>{`
        @keyframes contact-notice-marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
