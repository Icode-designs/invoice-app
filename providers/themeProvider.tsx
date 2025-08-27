"use client";
import { Theme } from "@/types/theme/theme";
import { createContext, useState } from "react";
import { darkTheme, lightTheme } from "@/styles/themes";
import { GlobalStyles } from "@/styles/globalStyles";
import { ThemeProvider } from "styled-components";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currrentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: currrentTheme, toggleTheme }}>
      <ThemeProvider theme={currrentTheme}>
        <GlobalStyles theme={currrentTheme} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
