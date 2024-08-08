"use client";

import KnowhowList from "@/app/(main)/knowhow/_components/KnowhowList";
import { KNOWHOW_PAGE_LIMIT } from "@/app/(main)/knowhow/_constant";
import PaginationContainer from "@/components/PaginationContainer";
import useKnowhowsQuery from "@/store/queries/knowhow/useKnowhowsQuery";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

function KnowhowContainer() {
  const [page, setPage] = useState(1);
  const [selectedSearchOption, setSelectedSearchOption] = useState("titleContent");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useState({ option: "titleContent", keyword: "" });

  const { data: knowhows, isLoading } = useKnowhowsQuery(
    page,
    KNOWHOW_PAGE_LIMIT,
    searchParams.option,
    searchParams.keyword
  );

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
      ) : knowhows && knowhows.data.length > 0 ? (
        <>
          <KnowhowList knowhows={knowhows.data} />
          <PaginationContainer
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={knowhows?.totalPages || 1}
          />
        </>
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </section>
  );
}

export default KnowhowContainer;
