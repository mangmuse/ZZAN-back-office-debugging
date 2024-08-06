"use client";

import { useState } from "react";
import useQuizMutation from "@/store/queries/quiz/useQuizMutation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function QuizWriteForm() {
  const router = useRouter();

  const { addQuiz } = useQuizMutation();

  const [question, setQuestion] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [issueDate, setIssueDate] = useState<string>("");

  const validateForm = () => {
    if (!question.trim()) {
      alert("문제는 필수 입력 항목입니다.");
      return false;
    }
    if (question.length < 2 || question.length > 150) {
      alert("문제를 2자 이상 150자 이하로 입력해 주세요.");
      return false;
    }

    if (!explanation.trim()) {
      alert("해설은 필수 입력 항목입니다.");
      return false;
    }
    if (explanation.length < 2 || explanation.length > 200) {
      alert("해설을 2자 이상 200자 이하로 입력해 주세요.");
      return false;
    }

    if (isCorrect === null) {
      alert("정답 여부를 선택해 주세요.");
      return false;
    }

    if (!issueDate) {
      alert("발행일자는 필수 입력 항목입니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateForm();

    const newQuiz = {
      question,
      explanation,
      is_correct: isCorrect !== null ? isCorrect : undefined,
      issue_date: issueDate
    };

    try {
      await addQuiz(newQuiz);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleCancel = () => {
    if (confirm("정말 퀴즈 등록을 취소하시겠습니까?")) {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question">문제</label>
      <input
        type="textarea"
        id="question"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
        placeholder="문제를 150자 이내로 입력해 주세요."
        maxLength={150}
      />
      <label htmlFor="explanation">해설</label>
      <input
        type="textarea"
        id="explanation"
        onChange={(e) => setExplanation(e.target.value)}
        value={explanation}
        placeholder="해설을 200자 이내로 입력해 주세요."
        maxLength={200}
      />
      <div>
        <label>정답</label>
        <div>
          <input
            type="radio"
            id="correct"
            name="isCorrect"
            value="true"
            checked={isCorrect === true}
            onChange={() => setIsCorrect(true)}
          />
          <label htmlFor="correct">O</label>
        </div>
        <div>
          <input
            type="radio"
            id="incorrect"
            name="isCorrect"
            value="false"
            checked={isCorrect === false}
            onChange={() => setIsCorrect(false)}
          />
          <label htmlFor="incorrect">X</label>
        </div>
      </div>
      <label htmlFor="issueDate">발행일자</label>
      <input type="date" id="issueDate" onChange={(e) => setIssueDate(e.target.value)} value={issueDate} />
      <Button type="button" onClick={handleCancel}>
        취소
      </Button>
      <Button type="submit">등록</Button>
    </form>
  );
}

export default QuizWriteForm;
