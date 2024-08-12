"use client";

import { useState } from "react";
import QuizList from "@/app/(main)/quiz/_components/QuizList";
import useQuizzesQuery from "@/store/queries/quiz/useQuizzesQuery";
import { QUIZ_PAGE_LIMIT } from "@/app/(main)/quiz/_constant";
import PaginationContainer from "@/components/PaginationContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function QuizContainer() {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data: quizzes, isLoading } = useQuizzesQuery(page, QUIZ_PAGE_LIMIT);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleWriteClick = () => {
    router.push(`/quiz/write`);
  };

  return (
    <section>
      <div>
        <Button onClick={handleWriteClick}>퀴즈 등록</Button>
      </div>
      {isLoading ? <p>Loading...</p> : quizzes && <QuizList quizzes={quizzes.data} />}
      <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={quizzes?.totalPages || 1} />
    </section>
  );
}

export default QuizContainer;
