import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Button from "@/components/Button";
import Input from "@/components/Input";

function QnAItem({ index, item, updateQuestion, removeQnAPair }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: item.answer,
    onUpdate: ({ editor }) => {
      updateQuestion(index, "answer", editor.getHTML());
    },
  });

  return (
    <div>
      <div>
        <label>Question {index + 1}</label>
        <Input
          type="text"
          value={item.question}
          onChange={(e) => updateQuestion(index, "question", e.target.value)}
          placeholder="How long does it take to accept my request?"
        />
      </div>
      <div>
        <label>Answer {index + 1}</label>
        {editor && <EditorContent editor={editor} />}
      </div>
      <Button onClick={() => removeQnAPair(index)}>Remove</Button>
    </div>
  );
}

export default QnAItem;
