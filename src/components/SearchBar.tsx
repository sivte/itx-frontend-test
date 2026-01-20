import SearchIcon from "./icons/SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search brand or model...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 text-sm border-b border-neutral-300 focus:border-black focus:outline-none transition-colors bg-transparent font-light placeholder:text-neutral-400 placeholder:uppercase placeholder:text-xs placeholder:tracking-wide"
      />
    </div>
  );
}
