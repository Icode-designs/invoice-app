"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListControls } from "@/styles/components/List.style";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import VariableButton from "./Button";

const ListControl = () => {
  const isTablet = useMediaQuery(768);
  return (
    <ListControls>
      <button>
        <p>{isTablet ? "Filter by status" : "Filter"}</p>
        <span>
          <FaAngleDown className="icon" />
        </span>
      </button>
      <VariableButton variant="btn-100">
        {isTablet ? "new invoice" : "new"}
      </VariableButton>
    </ListControls>
  );
};

export default ListControl;
