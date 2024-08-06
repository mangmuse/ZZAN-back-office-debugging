"use client";

import { useState } from "react";
import ClaimList from "@/app/(main)/claim/_components/ClaimList";
import PaginationContainer from "@/components/PaginationContainer";
import useClaimsQuery from "@/store/queries/claim/useClaimsQuery";
import { CLAIM_PAGE_LIMIT } from "@/app/(main)/claim/_constant";

function ClaimContainer() {
  const [page, setPage] = useState(1);

  const { data: claims, isLoading } = useClaimsQuery(page, CLAIM_PAGE_LIMIT);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <>
      {isLoading ? <p>Loading...</p> : claims && <ClaimList claims={claims.data} />}
      <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={claims?.totalPages || 1} />
    </>
  );
}

export default ClaimContainer;
