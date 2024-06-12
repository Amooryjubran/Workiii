import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Input from "@/components/Input";

export default function QA({ frequentlyAskedQuestions }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = frequentlyAskedQuestions?.filter(
    (faq) =>
      faq?.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq?.answer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqTitle}>
        <div className={styles.faqHeader}>
          <h1>{filteredQuestions?.length || 0}</h1>
          <div>{t("listAService.QnA")}</div>
        </div>
        <div className={styles.addQuestionContainer}>
          <Input
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`${t("services.Search")}...`}
          />
          <span>{t("listAService.Search")}</span>
        </div>
      </div>
      <div className={styles.faqWrapper}>
        {filteredQuestions?.map((faq, index) => (
          <div key={index} className={styles.faqQuestion}>
            <h1>{faq.question}</h1>
            <div
              className={`${styles.faqDescription} ck-content`}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

QA.propTypes = {
  frequentlyAskedQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
};
