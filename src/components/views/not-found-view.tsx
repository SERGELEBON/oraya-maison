"use client";

import { useNavigate } from "@/lib/router";
import { useI18n } from "@/lib/i18n";

export default function NotFoundView() {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <div className="container-x flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="font-serif text-[36px] font-semibold text-ink">{t("notFound.title")}</h1>
      <p className="max-w-md text-body">{t("notFound.text")}</p>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="label-caps h-11 rounded-[4px] bg-emerald px-8 text-[13px] font-medium text-ivory hover:bg-emerald-dark"
      >
        {t("notFound.cta")}
      </button>
    </div>
  );
}
