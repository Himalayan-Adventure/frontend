import SearchBar from "@/components/ui/search-bar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function SortFilters() {
  return (
    <div className="z-10 flex gap-x-4 rounded-lg border border-gray-200 bg-white p-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filters" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <SearchBar selector="code" />
    </div>
  );
}
