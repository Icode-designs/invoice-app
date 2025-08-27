"use client";
import { ButtonStyles } from "@/styles/components/UI.styles";
import { pxToRem } from "@/utils/helpers/pxTorem";
import React from "react";
import { FaPlus } from "react-icons/fa";

type ButtonProps = {
  variant: string;
  children: string;
};

const VariableButton = ({ variant, children }: ButtonProps) => {
  return (
    <ButtonStyles $variant={variant}>
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
