import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();

  return <div>{t("home.homeMessage")}</div>;
}
