import { FilterContext } from "@/providers/invoicesProvider";
import { StyledCheckBox } from "@/styles/components/UI.styles";
import React, { useContext } from "react";

interface CheckInput {
  name: string;
  label: string;
}

const CheckBoxInput = ({ name, label }: CheckInput) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const filterCtx = useContext(FilterContext);

  if (!filterCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }
  const { addFilter, removeFilter, filters } = filterCtx;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked && !filters.includes(name)) {
      addFilter(name);
    } else if (!checked && filters.includes(name)) {
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
        onChange={handleChange}
        checked={isChecked}
      />
    </StyledCheckBox>
  );
};

export default CheckBoxInput;
