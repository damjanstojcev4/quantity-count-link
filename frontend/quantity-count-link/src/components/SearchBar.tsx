interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search SKU..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border px-2 py-1 rounded w-40"
    />
  );
};

export default SearchBar;
