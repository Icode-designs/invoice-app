"use client";
import { StyledTextInput } from "@/styles/components/UI.styles";
import React from "react";

interface Props {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "date" | "time" | "password" | null;
  readOnly?: boolean;
  value?: string | number | null;
  step?: string | number | undefined;
  hidden?: boolean | undefined;
  required?: boolean | undefined;
}

const TextInput = ({
  name,
  label,
  type,
  readOnly,
  value,
  step,
  hidden,
  required,
}: Props) => {
  return (
    <StyledTextInput>
      <label htmlFor={name}>
        <p>
          {label}
          {required && <span>*</span>}
        </p>
      </label>
      <input
        type={type ? type : "text"}
        id={name}
        name={name}
        required={required}
        readOnly={readOnly}
        defaultValue={value ? value : ""}
        step={step}
        min={type === "number" ? 1 : undefined}
        hidden={hidden}
      />
    </StyledTextInput>
  );
};

export default TextInput;
