"use client";
import { ButtonStyles } from "@/styles/components/UI.styles";
import { pxToRem } from "@/utils/helpers/pxTorem";
import React from "react";
import { FaPlus } from "react-icons/fa";

type ButtonProps = {
  variant: string;
  children: string;
  onHandle?: () => void | undefined;
  type: "button" | "reset" | "submit" | undefined;
};

//variable button that addapts based on the value of variant
//variants: btn-100, btn-200, btn-300, btn-400, btn-500, btn-600
const VariableButton = ({ variant, type, children, onHandle }: ButtonProps) => {
  return (
    <ButtonStyles
      $variant={variant}
      onClick={onHandle}
      type={type ? type : "button"}
    >
      {variant === "btn-100" ? (
        <div>
          <FaPlus />
        </div>
      ) : variant === "btn-600" ? (
        <FaPlus size={pxToRem(8)} />
      ) : null}
      <p>{children}</p>
    </ButtonStyles>
  );
};

export default VariableButton;
