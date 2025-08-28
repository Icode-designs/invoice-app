import { Theme } from "@/types/theme/theme";
import { createGlobalStyle } from "styled-components";
import { colorVariables } from "./variables/colors";
import fontVariables from "./variables/fonts";
import { darkTheme } from "./themes";
import { pxToRem } from "@/utils/helpers/pxTorem";

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  :root{
    ${({ theme }) => colorVariables({ theme })}
    ${() => fontVariables()}

    --col-100: #7C5DFA;
    --col-200: #9277FF;
    --col-300: #1E2139;
    --col-400: #252945;
    --col-500: #DFE3FA;
    --col-600: #888EB0;
    --col-700: #7E88C3;
    --col-800: #0C0E16;
    --col-900: #EC5757;
    --col-1000: #FF9797;
    --col-1100: #F8F8FB;
    --col-1200: #141625;
    --col-1300: #FFFFFF;
    --pending-col-rgb: 255, 143, 0;
    --draft-col-rgb: 12, 14, 22;
    --draft-col: #0C0E16;
    --paid-col-rgb: 51, 214, 159;

    --max-w: ${pxToRem(730)};
    --centered: 0 auto;

    --padding-g: ${pxToRem(24)};
    --border-radius-g: ${pxToRem(8)};
  
  }

  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-family: var(--font-family);
    font-size: var(--font-size-body);
    background-color: var(--background-color);
    color: var(--primary-font-color);
    font-weight: var(--regular-font);
    position: relative;
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a{
    text-decoration: none;
    color: inherit;
 }

 h1{
    font-size: var(--font-size-h1);
    line-height: var(--line-height-h1);
    letter-spacing: var(--letter-spacing-h1);
    font-weight: var(--bold-font);
  }

  h2{
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
    letter-spacing: var(--letter-spacing-h2);
    font-weight: var(--bold-font);
  }

  h3{
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
    letter-spacing: var(--letter-spacing-h3);
    font-weight: var(--bold-font);

    @media (max-width: 600px) {
      font-size: var(--font-size-h3-sm);
      line-height: var(--line-height-h3-sm);
      letter-spacing: var(--letter-spacing-h3-sm);
    }
  }

  p, span, li, button, input, textarea{
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
    letter-spacing: var(--letter-spacing-body);
    

    @media (max-width: 600px) {
      font-size: var(--font-size-body-sm);
      line-height: var(--line-height-body-sm);
      letter-spacing: var(--letter-spacing-body-sm);
    }
  }


  button{
    cursor: pointer;
    border: none;
    font-family: inherit;
    background: none;
    transition: all 0.3s ease;
    color: var(--primary-font-color);
    font-weight: var(--bold-font);
  }

  input, textarea{
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color:var(--fill-color);
    border: ${({ theme }) =>
      theme === darkTheme
        ? "1px solid transparent"
        : "1px solid ${(theme)=>theme.colors.color100}"};
    outline: none;
    border-radius: ${pxToRem(4)};
    padding: ${pxToRem(16)};

  }

  ul{
    list-style: none;
 }

 .icon{
    color: var(--col-100);
    font-size: var(--icon-size);
 }

  `;
