import { ArrowLeft } from "react-feather";
import LinkButton from "@/components/Link";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>
      <div className={styles.notFoundPageContainer}>
        <h1>{t("notFound.notFoundTitle")}</h1>
        <span>{t("notFound.notFoundMessage")}</span>
        <LinkButton to="/" className={styles.notFoundLink}>
          <ArrowLeft color="white" size={16} />
          <span>{t("notFound.goHome")}</span>
        </LinkButton>
      </div>
    </div>
  );
}
