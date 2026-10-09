"use client";

/**
 * Floating WhatsApp button — all pages, bottom-right.
 * 60px round green button with a soft pulse ring and a hover label.
 */
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/shared/social-icons";

export function WhatsAppFab() {
  const { t } = useI18n();
  const href = whatsappLink(t("whatsapp.orderMessage"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.fabLabel")}
      className="group fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6"
    >
      <span className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-[6px] bg-ink px-3 py-2 text-[12px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
        {t("whatsapp.fabLabel")}
      </span>
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
        className="pulse-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 md:h-[60px] md:w-[60px]"
      >
        <WhatsAppIcon size={28} />
      </motion.span>
    </a>
  );
}
