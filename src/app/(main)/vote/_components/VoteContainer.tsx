"use client";

import VoteList from "@/app/(main)/vote/_components/VoteList";
import { VOTE_PAGE_LIMIT } from "@/app/(main)/vote/_constant";
import PaginationContainer from "@/components/PaginationContainer";
import useVotesQuery from "@/store/queries/vote/useVotesQuery";
import { useRouter } from "next/navigation";
import { useState } from "react";

function VoteContainer() {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data: votes, isLoading } = useVotesQuery(page, VOTE_PAGE_LIMIT);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <section>
      {isLoading ? <p>Loading...</p> : votes && <VoteList votes={votes.data} />}
      <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={votes?.totalPages || 1} />
    </section>
  );
}

export default VoteContainer;
