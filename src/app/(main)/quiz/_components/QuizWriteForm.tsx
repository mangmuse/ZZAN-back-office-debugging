"use client";

import { useState } from "react";
import useQuizMutation from "@/store/queries/quiz/useQuizMutation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ModalDialog from "@/components/ModalDialog";
import { TQuiz } from "@/types/quiz";

type QuizWriteFormProps = {
  previousContent?: TQuiz;
};

function QuizWriteForm({ previousContent }: QuizWriteFormProps) {
  const router = useRouter();
  const { addQuiz, updateQuiz } = useQuizMutation();

  const [question, setQuestion] = useState<string>(previousContent?.question || "");
  const [explanation, setExplanation] = useState<string>(previousContent?.explanation || "");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(previousContent?.is_correct ?? null);
  const [issueDate, setIssueDate] = useState<string>(previousContent?.issue_date || "");

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const validateForm = () => {
    if (!question.trim()) {
      setAlertMessage("문제는 필수 입력 항목입니다.");
      setAlertOpen(true);
      return false;
    }
    if (question.length < 10 || question.length > 150) {
      setAlertMessage("문제를 10자 이상 150자 이하로 입력해 주세요.");
      setAlertOpen(true);
      return false;
    }

    if (!explanation.trim()) {
      setAlertMessage("해설은 필수 입력 항목입니다.");
      setAlertOpen(true);
      return false;
    }
    if (explanation.length < 10 || explanation.length > 200) {
      setAlertMessage("해설을 10자 이상 200자 이하로 입력해 주세요.");
      setAlertOpen(true);
      return false;
    }

    if (isCorrect === null) {
      setAlertMessage("정답 여부를 선택해 주세요.");
      setAlertOpen(true);
      return false;
    }

    if (!issueDate) {
      setAlertMessage("발행일자는 필수 입력 항목입니다.");
      setAlertOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newQuiz = {
      question,
      explanation,
      is_correct: isCorrect !== null ? isCorrect : undefined,
      issue_date: issueDate
    };

    try {
      if (previousContent) {
        await updateQuiz({ ...newQuiz, quizId: previousContent.quizId });
      } else {
        await addQuiz(newQuiz);
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(error.message);
        setAlertOpen(true);
      }
    }
  };

  const handleCancel = () => {
    setAlertMessage("정말 퀴즈 작성을 취소하시겠습니까?");
    setCancelConfirmOpen(true);
  };

  const confirmCancel = () => {
    router.back();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <Label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">
            문제
          </Label>
          <Textarea
            id="question"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder="문제를 150자 이내로 입력해 주세요."
            maxLength={150}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="explanation" className="block text-gray-700 text-sm font-bold mb-2">
            해설
          </Label>
          <Textarea
            id="explanation"
            onChange={(e) => setExplanation(e.target.value)}
            value={explanation}
            placeholder="해설을 200자 이내로 입력해 주세요."
            maxLength={200}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700 text-sm font-bold mb-2">정답</Label>
          <div className="flex space-x-4 mt-1">
            <div className="flex items-center">
              <Input
                type="radio"
                id="correct"
                name="isCorrect"
                value="true"
                checked={isCorrect === true}
                onChange={() => setIsCorrect(true)}
                className="mr-2 leading-tight"
              />
              <Label htmlFor="correct" className="text-sm">
                O
              </Label>
            </div>
            <div className="flex items-center">
              <Input
                type="radio"
                id="incorrect"
                name="isCorrect"
                value="false"
                checked={isCorrect === false}
                onChange={() => setIsCorrect(false)}
                className="mr-2 leading-tight"
              />
              <Label htmlFor="incorrect" className="text-sm">
                X
              </Label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <Label htmlFor="issueDate" className="block text-gray-700 text-sm font-bold mb-2">
            발행일자
          </Label>
          <Input
            type="date"
            id="issueDate"
            onChange={(e) => setIssueDate(e.target.value)}
            value={issueDate}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={handleCancel} variant={"outline"}>
            취소
          </Button>
          <Button type="submit">등록</Button>
        </div>
      </form>

      <ModalDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="알림"
        message={alertMessage}
        type="alert"
        onConfirm={() => setAlertOpen(false)}
      />
      <ModalDialog
        open={cancelConfirmOpen}
        onOpenChange={setCancelConfirmOpen}
        title="퀴즈 작성 취소"
        message="정말 퀴즈 작성을 취소하시겠습니까?"
        type="confirm"
        onConfirm={confirmCancel}
        onCancel={() => setCancelConfirmOpen(false)}
      />
    </>
  );
}

export default QuizWriteForm;
