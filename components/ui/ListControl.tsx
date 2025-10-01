"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListControls } from "@/styles/components/List.style";
import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import VariableButton from "./Button";
import FilterBox from "../FilterBox";
import { FormContext } from "@/providers/FormProvider";
import { UserContext } from "@/providers/UserProvider";
import { redirect } from "next/navigation";

const ListControl = () => {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const userCtx = useContext(UserContext);
  const isTablet = useMediaQuery(768);
  const formCtx = useContext(FormContext);

  if (!formCtx || !userCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { authUser } = userCtx;
  const { toggleForm } = formCtx;

  //toggle filter box
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
      <VariableButton
        type="button"
        variant="btn-100"
        onHandle={authUser ? toggleForm : () => redirect("/onBoarding/login")}
      >
        {isTablet ? "new invoice" : "new"}
      </VariableButton>
      <FilterBox filterActive={filterActive} />
    </ListControls>
  );
};

export default ListControl;
