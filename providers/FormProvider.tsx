"use client";
import React, { createContext, useState } from "react";

export interface FormContextType {
  isOpen: boolean;
  toggleForm: () => void;
}

export const FormContext = createContext<FormContextType | null>(null);

const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);

  function toggleForm() {
    setIsopen(!isOpen);
  }
  return (
    <FormContext.Provider value={{ isOpen, toggleForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
