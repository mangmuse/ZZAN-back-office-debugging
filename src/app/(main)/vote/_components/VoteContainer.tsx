"use client";

import VoteList from "@/app/(main)/vote/_components/VoteList";
import { VOTE_PAGE_LIMIT } from "@/app/(main)/vote/_constant";
import PaginationContainer from "@/components/PaginationContainer";
import useVotesQuery from "@/store/queries/vote/useVotesQuery";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

function VoteContainer() {
  const [page, setPage] = useState(1);
  const [selectedSearchOption, setSelectedSearchOption] = useState("titleContent");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useState({ option: "titleContent", keyword: "" });

  const { data: votes, isLoading } = useVotesQuery(page, VOTE_PAGE_LIMIT, searchParams.option, searchParams.keyword);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSearchOptionChange = (value: string) => {
    setSelectedSearchOption(value);
  };

  const handleSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    setSearchParams({ option: selectedSearchOption, keyword: searchKeyword });
  };

  return (
    <section>
      <SearchBar
        selectedSearchOption={selectedSearchOption}
        searchKeyword={searchKeyword}
        onSearchOptionChange={handleSearchOptionChange}
        onSearchKeywordChange={handleSearchKeywordChange}
        onSearch={handleSearch}
      />
      {isLoading ? (
        <p>로딩 중 입니다.</p>
      ) : votes && votes.data.length > 0 ? (
        <>
          <VoteList votes={votes.data} />
          <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={votes?.totalPages || 1} />
        </>
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </section>
  );
}

export default VoteContainer;
