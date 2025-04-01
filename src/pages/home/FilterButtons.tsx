import {FilterContent,FilterButton,} from '../../styles/home'
type FilterType = "all" | "active" | "completed";
type FilterButtonsProps= {
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
}
const FilterButtons = ({ filter, onFilterChange }:FilterButtonsProps) => {
  const filterOptions = [
    { value: "all", label: "全部" },
    { value: "active", label: "未完成" },
    { value: "completed", label: "已完成" }
  ];
  return (
    <FilterContent>
      {filterOptions.map((option) => (
        <FilterButton
          key={option.value}
          $active={filter === option.value}
          onClick={() => onFilterChange(option.value as FilterType)}
        >
          {option.label}
        </FilterButton>
      ))}
    </FilterContent>
  );
};

export default FilterButtons