import { lazy, Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useListAServiceStore from "@/store/useListAServiceStore";
import { useDebounce } from "@uidotdev/usehooks";
import Button from "@/components/Button";
import Input from "@/components/Input";

const RichTextEditor = lazy(() => import("@/components/RichTextEditor"));

export default function QnA() {
  const { t } = useTranslation();
  const { frequentlyAskedQuestions, setFrequentlyAskedQuestions } =
    useListAServiceStore((state) => ({
      frequentlyAskedQuestions: state.frequentlyAskedQuestions,
      setFrequentlyAskedQuestions: state.setFrequentlyAskedQuestions,
    }));

  const [inputValues, setInputValues] = useState(frequentlyAskedQuestions);
  const debouncedInputValues = useDebounce(inputValues, 500);

  useEffect(() => {
    setFrequentlyAskedQuestions(debouncedInputValues);
  }, [debouncedInputValues]);

  const handleInputChange = (index, type, value) => {
    const newList = [...inputValues];
    newList[index][type] = value;
    setInputValues(newList);
  };

  const addQnAPair = () => {
    const newQnAList = [...inputValues, { question: "", answer: "" }];
    setInputValues(newQnAList);
  };

  const removeQnAPair = (index) => {
    if (inputValues.length > 1) {
      const newList = [...inputValues];
      newList.splice(index, 1);
      setInputValues(newList);
    } else {
      setInputValues([{ question: "", answer: "" }]);
    }
  };

  return (
    <div className={styles.qnaContainer}>
      <h1>{t("listAService.QnA")}</h1>
      <p>{t("listAService.QnACreate")}</p>
      <div className={styles.qnaListContainer}>
        {inputValues.map((item, index) => (
          <div key={index} className={styles.qnaList}>
            <div>
              <label className={styles.qnaTitle}>
                {t("listAService.Question")} {index + 1}
              </label>
              <Input
                type="text"
                value={item.question}
                onChange={(e) =>
                  handleInputChange(index, "question", e.target.value)
                }
                placeholder="How long does it take to accept my request?"
              />
            </div>
            <div>
              <label className={styles.qnaTitle}>
                {t("listAService.Answer")} {index + 1}
              </label>
              <Suspense fallback={<div>Loading editor...</div>}>
                <RichTextEditor
                  value={item.answer}
                  onChange={(value) =>
                    handleInputChange(index, "answer", value)
                  }
                />
              </Suspense>
            </div>
            <Button
              onClick={() => removeQnAPair(index)}
              className={styles.removeQnA}
            >
              {t("listAServiceServicesTab.remove")}
            </Button>
          </div>
        ))}
        <Button className={styles.addQnA} onClick={addQnAPair}>
          {t("listAService.AddMore")}
        </Button>
      </div>
    </div>
  );
}
