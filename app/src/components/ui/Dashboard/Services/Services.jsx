import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return <div>{t("dashboard.Services")}</div>;
}
