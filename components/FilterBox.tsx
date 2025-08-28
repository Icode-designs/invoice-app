import { FilterCard } from "@/styles/components/List.style";
import React from "react";
import CheckBoxInput from "./ui/CheckBoxInput";

interface FilterBoxProps {
  filterActive: boolean;
}

const FilterBox: React.FC<FilterBoxProps> = ({ filterActive }) => {
  return (
    <FilterCard $activeFilter={filterActive}>
      <CheckBoxInput name="draft" label="draft" />
      <CheckBoxInput name="pending" label="pending" />
      <CheckBoxInput name="paid" label="paid" />
    </FilterCard>
  );
};

export default FilterBox;
