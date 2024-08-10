import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

interface SearchBarProps {
  selectedSearchOption: string;
  searchKeyword: string;
  onSearchOptionChange: (value: string) => void;
  onSearchKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  selectItems: { value: string; label: string }[];
  selectPlaceholder?: string;
  inputPlaceholder?: string; //
  className?: string; //
}

function SearchBar({
  selectedSearchOption,
  searchKeyword,
  onSearchOptionChange,
  onSearchKeywordChange,
  onSearch,
  selectItems = [], //
  selectPlaceholder = "검색 옵션을 선택하세요",
  inputPlaceholder = "검색어를 입력하세요",
  className = ""
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full items-center gap-2 mb-4 ${className}`}>
      <Select onValueChange={onSearchOptionChange} value={selectedSearchOption}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={selectPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={searchKeyword}
        onChange={onSearchKeywordChange}
        placeholder={inputPlaceholder}
        className="w-full"
      />
      <Button type="submit">검색</Button>
    </form>
  );
}

export default SearchBar;
