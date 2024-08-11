"use client";

import TableContainer from "@/components/TableContainer";
import useClaimsQuery from "@/store/queries/claim/useClaimsQuery";
import { CLAIM_PAGE_LIMIT, CLAIM_SELECT_ITEMS } from "@/app/(main)/claim/_constant";
import { TClaim } from "@/types/claim.type";
import ClaimItem from "@/app/(main)/claim/_components/ClaimItem";

const claimHeaders = [
  "ID",
  "신청 날짜",
  "신청 시간",
  "닉네임",
  "이메일",
  "상품명",
  "발송 상태",
  "발송 날짜",
  "발송 시간",
  "발송 상태 변경"
];

function ClaimContainer() {
  const query = useClaimsQuery;
  return (
    <TableContainer<TClaim>
      useQuery={query}
      renderRow={(claim: TClaim) => <ClaimItem key={claim.gift_claimId} claim={claim} />}
      headers={claimHeaders}
      pageLimit={CLAIM_PAGE_LIMIT}
      searchOptions={CLAIM_SELECT_ITEMS}
    />
  );
}

export default ClaimContainer;
