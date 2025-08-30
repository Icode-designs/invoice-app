"use client";
import { FilterContext } from "@/providers/invoicesProvider";
import { StyledCheckBox } from "@/styles/components/UI.styles";
import React, { useContext, useRef } from "react";

interface CheckInput {
  name: string;
  label: string;
}

const CheckBoxInput = ({ name, label }: CheckInput) => {
  const filterCtx = useContext(FilterContext);
  const inputRef = useRef<HTMLInputElement>(null);
  let checked;

  if (!filterCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  //distructure filter context
  const { addFilter, removeFilter, filters } = filterCtx;

  //input change event handler
  function handleClick() {
    checked = inputRef.current?.checked;

    //check if filter exists before adding or removing filter
    if (checked && !filters.includes(name)) {
      addFilter(name);
    } else if (checked && filters.includes(name)) {
      removeFilter(name);
    }
  }

  return (
    <StyledCheckBox onClick={handleClick}>
      <label htmlFor={name}>
        <h3>{label}</h3>
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={handleClick}
        ref={inputRef}
        checked={checked}
      />
    </StyledCheckBox>
  );
};

export default CheckBoxInput;
