"use client";

import KnowhowList from "@/app/(main)/knowhow/_components/KnowhowList";
import { KNOWHOW_PAGE_LIMIT } from "@/app/(main)/knowhow/_constant";
import PaginationContainer from "@/components/PaginationContainer";
import useKnowhowsQuery from "@/store/queries/knowhow/useKnowhowsQuery";
import { useState } from "react";

function KnowhowContainer() {
  const [page, setPage] = useState(1);

  const { data: knowhows, isLoading } = useKnowhowsQuery(page, KNOWHOW_PAGE_LIMIT);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <section>
      {isLoading ? <p>로딩 중 입니다.</p> : knowhows && <KnowhowList knowhows={knowhows.data} />}
      <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={knowhows?.totalPages || 1} />
    </section>
  );
}

export default KnowhowContainer;
