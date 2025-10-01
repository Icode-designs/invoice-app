"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";

export interface FormContextType {
  isOpen: boolean;
  toggleForm: () => void;
}

export const FormContext = createContext<FormContextType | null>(null);

const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userCtx = useContext(UserContext);
  const [isOpen, setIsopen] = useState<boolean>(false);

  useEffect(() => {
    if (!userCtx) return;

    if (!userCtx.authUser) {
      setIsopen(false);
    }
  }, [userCtx, userCtx?.authUser]);

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
