"use client";
import { ThemeControls } from "@/styles/components/Header.styles";
import React, { useContext } from "react";
import { ThemeContext } from "@/providers/themeProvider";
import { lightTheme } from "@/styles/themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeControl = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme, toggleTheme } = themeContext;

  return (
    <ThemeControls>
      <button onClick={toggleTheme}>
        {theme === lightTheme ? <FaMoon /> : <FaSun />}
      </button>
    </ThemeControls>
  );
};

export default ThemeControl;
