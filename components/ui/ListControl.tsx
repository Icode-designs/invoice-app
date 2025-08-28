"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListControls } from "@/styles/components/List.style";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import VariableButton from "./Button";
import FilterBox from "../FilterBox";

const ListControl = () => {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const isTablet = useMediaQuery(768);

  function handleActiveFilter() {
    setFilterActive(!filterActive);
  }
  return (
    <ListControls $activeFilter={filterActive}>
      <button onClick={handleActiveFilter}>
        <p>{isTablet ? "Filter by status" : "Filter"}</p>
        <span>
          <FaAngleDown className="icon" />
        </span>
      </button>
      <VariableButton variant="btn-100">
        {isTablet ? "new invoice" : "new"}
      </VariableButton>
      <FilterBox filterActive={filterActive} />
    </ListControls>
  );
};

export default ListControl;
