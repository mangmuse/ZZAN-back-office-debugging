import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

interface SearchBarProps {
  selectedSearchOption: string;
  searchKeyword: string;
  onSearchOptionChange: (value: string) => void;
  onSearchKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

function SearchBar({
  selectedSearchOption,
  searchKeyword,
  onSearchOptionChange,
  onSearchKeywordChange,
  onSearch
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <Select onValueChange={onSearchOptionChange} value={selectedSearchOption}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="검색 옵션을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="titleContent">제목 + 내용</SelectItem>
          <SelectItem value="nickname">닉네임</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={searchKeyword}
        onChange={onSearchKeywordChange}
        placeholder="검색어를 입력하세요"
        className="w-full"
      />
      <Button type="submit">검색</Button>
    </form>
  );
}

export default SearchBar;
