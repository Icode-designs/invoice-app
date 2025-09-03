"use client";
import { StyledTextInput } from "@/styles/components/UI.styles";
import React from "react";

interface Props {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "date" | null;
  readOnly?: boolean;
  value?: string | number | null;
}

const TextInput = ({ name, label, type, readOnly, value }: Props) => {
  return (
    <StyledTextInput>
      <label htmlFor={name}>
        <p>{label}</p>
      </label>
      <input
        type={type ? type : "text"}
        id={name}
        name={name}
        required
        readOnly={readOnly}
        defaultValue={value ? value : ""}
      />
    </StyledTextInput>
  );
};

export default TextInput;
