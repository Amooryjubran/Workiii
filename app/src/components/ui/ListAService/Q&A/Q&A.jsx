import { useState } from "react";
import styles from "./style.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function QnA() {
  const [qnaList, setQnaList] = useState([{ question: "", answer: "" }]);

  const handleInputChange = (index, type, value) => {
    const newList = [...qnaList];
    if (type === "question") {
      newList[index].question = value;
    } else {
      newList[index].answer = value;
    }
    setQnaList(newList);
    console.log(qnaList);
  };

  const addQnAPair = () => {
    setQnaList([...qnaList, { question: "", answer: "" }]);
  };

  const removeQnAPair = (index) => {
    if (qnaList.length === 1) {
      // Reset the only QnA pair to empty strings if it's the only one in the list
      setQnaList([{ question: "", answer: "" }]);
    } else {
      // Remove the QnA pair at the specified index
      const newList = [...qnaList];
      newList.splice(index, 1);
      setQnaList(newList);
    }
  };

  return (
    <div className={styles.qnaContainer}>
      <h1>Questions and Answers</h1>
      <p>
        Create your own frequently asked questions and provide answers here.
        This will help users get immediate responses to common inquiries,
        enhancing user engagement and satisfaction.
      </p>
      <div className={styles.qnaListContainer}>
        {qnaList.map((item, index) => (
          <div key={index} className={styles.qnaList}>
            <div>
              <label>Question {index + 1}</label>
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
              <label>Answer {index + 1}</label>
              <textarea
                value={item.answer}
                onChange={(e) =>
                  handleInputChange(index, "answer", e.target.value)
                }
                placeholder="It usually takes around two hours to get back to you."
                className={styles.textArea}
              />
            </div>
            <Button
              onClick={() => removeQnAPair(index)}
              className={styles.removeQnA}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button className={styles.addQnA} onClick={addQnAPair}>
          Add More
        </Button>
      </div>
    </div>
  );
}
