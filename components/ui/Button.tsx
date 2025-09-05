"use client";
import { ButtonStyles } from "@/styles/components/UI.styles";
import { pxToRem } from "@/utils/helpers/pxTorem";
import React from "react";
import { FaPlus } from "react-icons/fa";

type ButtonProps = {
  variant: string;
  children: string;
  onHandle?: () => void;
  type?: "button" | "reset" | "submit";
  formAction?: (formData: FormData) => void | Promise<void>;
  onClick?: () => void; // Add onClick as alternative
  disabled?: boolean | undefined;
};

//variable button that adapts based on the value of variant
//variants: btn-100, btn-200, btn-300, btn-400, btn-500, btn-600
const VariableButton = ({
  variant,
  type = "button",
  children,
  onHandle,
  formAction,
  onClick,
  disabled,
}: ButtonProps) => {
  // Use onHandle, onClick, or neither
  const handleClick = onHandle || onClick;

  return (
    <ButtonStyles
      $variant={variant}
      type={type}
      onClick={handleClick}
      formAction={formAction} // This will be ignored if type !== "submit"
      disabled={disabled}
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
