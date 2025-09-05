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

  if (!filterCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  //distructure filter context
  const { addFilter, removeFilter, filters } = filterCtx;
  const checked = filters.includes(name);

  //input change event handler
  function handleCheck() {
    const isChecked = inputRef.current?.checked;
    if (isChecked) {
      addFilter(name);
    } else {
      removeFilter(name);
    }
  }

  return (
    <StyledCheckBox>
      <label htmlFor={name}>
        <h3>{label}</h3>
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={handleCheck}
        ref={inputRef}
        checked={checked}
      />
    </StyledCheckBox>
  );
};

export default CheckBoxInput;
