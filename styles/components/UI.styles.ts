"use client";
import styled, { css } from "styled-components";
import { pxToRem } from "@/utils/helpers/pxTorem";
import { lightTheme } from "../themes";
import QUERIES from "../mediaQueries";

export const ButtonStyles = styled.button<{ $variant?: string }>`
  display: flex;
  align-items: center;
  gap: ${pxToRem(16)};
  justify-content: flex-start;
  border-radius: ${pxToRem(24)};
  padding: ${pxToRem(16)} ${pxToRem(24)};
  text-transform: capitalize;
  width: fit-content;
  height: fit-content;
  font-size: ${pxToRem(12)};
  letter-spacing: ${pxToRem(-0.25)};
  line-height: ${pxToRem(15)};
  font-weight: var(--bold-font);

  p {
    font-size: inherit;
    color: var(--col-1300);
    opacity: 100%;
  }

  ${({ $variant }) =>
    $variant === "btn-100" &&
    css`
      padding: ${pxToRem(8)};
      padding-right: ${pxToRem(24)};

      > div {
        background-color: var(--col-1300);
        color: ${({ theme }) => theme.colors.button100};
        width: ${pxToRem(32)};
        height: ${pxToRem(32)};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}

  ${({ $variant }) =>
    $variant === "btn-100" || $variant === "btn-200"
      ? css`
          background-color: ${({ theme }) => theme.colors.button100};
          color: var(--col-1300);

          &:hover {
            background-color: ${({ theme }) => theme.colors.button100Hover};
          }
        `
      : null}

  ${({ $variant }) =>
    $variant === "btn-300" &&
    css`
      background-color: ${({ theme }) => theme.colors.button300};

      p {
        color: ${({ theme }) =>
          theme === lightTheme ? "var(--col-700)" : "var(--col-1300)"};
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.button300Hover};
        color: var(--col-100);
      }
    `}

  ${({ $variant }) =>
    $variant === "btn-400" &&
    css`
      background-color: ${({ theme }) => theme.colors.button400};
      color: var(--col-1300);
      &:hover {
        background-color: ${({ theme }) => theme.colors.button400Hover};
      }
    `}

    ${({ $variant }) =>
    $variant === "btn-500" &&
    css`
      background-color: ${({ theme }) => theme.colors.button500};
      color: var(--col-1300);

      &:hover {
        background-color: ${({ theme }) => theme.colors.button500Hover};
      }
    `}
    ${({ $variant }) =>
    $variant === "btn-600" &&
    css`
      background-color: ${({ theme }) => theme.colors.button600};
      color: var(--col-700);
      justify-content: center;
      width: 100%;
      gap: 0;

      &:hover {
        background-color: ${({ theme }) => theme.colors.button600Hover};
      }
    `}
`;

export const MainWrapper = styled.main`
  position: relative;
  max-width: var(--max-w);
  margin: var(--centered);
  padding: ${pxToRem(104)} ${pxToRem(24)};
  padding-bottom: ${pxToRem(150)};
  min-height: 100vh;
`;

export const LoaderBox = styled.div<{ $variant?: string }>`
  margin: auto;
  width: ${({ $variant }) =>
    $variant === "small" ? pxToRem(32) : pxToRem(50)};
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 3px;
  background: radial-gradient(farthest-side, var(--pending-color) 95%, #0000)
      50% 0/12px 12px no-repeat,
    radial-gradient(
        farthest-side,
        #0000 calc(100% - 5px),
        var(--pending-color) calc(100% - 4px)
      )
      content-box;
  animation: l6 2s infinite;

  @keyframes l6 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const StyledCheckBox = styled.button`
  display: flex;
  align-items: center;
  gap: ${pxToRem(13)};

  input {
    border: ${pxToRem(1)} solid var(--col-100);
    order: 1;
    transform: translateY(${pxToRem(-3)});
  }

  input[type="checkbox"]:checked {
    accent-color: var(--col-100);
  }

  label {
    order: 2;
    text-transform: capitalize;
  }
`;

export const StyledTextInput = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  label {
    text-transform: capitalize;
  }

  input {
    background-color: ${({ theme }) =>
      theme === lightTheme ? "var(--col-1300)" : "var(--col-400)"} !important;
    padding: ${pxToRem(10)};
    border-radius: var(--border-radius-g);
    border: ${pxToRem(1)} solid grey;
    margin-top: ${pxToRem(10)};
    width: 100%;
    font-weight: var(--regular-font);
    font-size: ${pxToRem(16)};
    outline: none;

    &:-webkit-autofill {
      background-color: ${({ theme }) =>
        theme === lightTheme ? "var(--col-1300)" : "var(--col-400)"} !important;
      -webkit-text-fill-color: var(--primary-font-color) !important;
      transition: background-color 5000s ease-in-out 0s; /* prevent flash */
    }

    &:focus {
      border-color: var(--col-100);
    }
  }
`;

export const FlexBox = styled.div<{
  $variant?: string;
  $justify?: string;
  $noGap?: boolean;
  $align?: string;
  $width?: string;
}>`
  display: flex;
  gap: ${({ $noGap }) => ($noGap ? 0 : pxToRem(10))};
  align-items: ${({ $align }) => ($align ? $align : "center")};
  width: ${({ $width }) => $width || "100%"};
  justify-content: ${({ $justify }) => $justify};

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      display: grid;
      gap: ${pxToRem(16)};

      @media (${QUERIES.TABLET}) {
        display: flex;
      }
    `}
`;

export const StyledFormControl = styled.div`
  display: flex;
  position: sticky;
  width: 100%;
  margin: 0 !important;
  left: 0;
  bottom: 0;
  padding: ${pxToRem(20)} ${pxToRem(16)} !important;
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-300)"};
`;

export const StyledEmptyInvoice = styled.div`
  padding: ${pxToRem(102)} ${pxToRem(16)};
  padding-bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;

    image {
      width: 80%;
      height: 80%;
    }

    article {
      margin-top: ${pxToRem(64)};
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: ${pxToRem(24)};
      text-align: center;
    }
  }
`;

export const StyledCard = styled.div<{ $display?: string }>`
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-300)"};
  padding: ${pxToRem(24)};
  min-height: ${pxToRem(91)};
  display: ${({ $display }) => $display || "flex"};
  align-items: center;
  border-radius: var(--border-radius-g);
  margin-top: ${pxToRem(24)};
  gap: ${pxToRem(32)};
`;

export const StyledAddressBox = styled.div<{ $textAlign?: string }>`
  width: ${pxToRem(94)};
  text-align: ${({ $textAlign }) => $textAlign || "left"};
`;

export const GridBox = styled.div<{ $gap?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(94)}, 1fr));
  gap: ${({ $gap }) => ($gap ? pxToRem($gap) : pxToRem(10))};
  align-items: start;
`;

export const StyledTable = styled.table`
  padding: ${pxToRem(32)};
  text-align: left;
  width: 100%;
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-400)"};
  border-top-right-radius: var(--border-radius-g);
  border-top-left-radius: var(--border-radius-g);
  tr {
    padding: ${pxToRem(16)};
    th:nth-of-type(1),
    td:nth-of-type(1) {
      column-span: 2;
    }
  }
`;

export const TotalBox = styled.div`
  color: var(--col-1300);
  padding: ${pxToRem(24)} ${pxToRem(32)};
  background-color: var(--col-800);
  border-bottom-left-radius: var(--border-radius-g);
  border-bottom-right-radius: var(--border-radius-g);
`;

export const StyledInvoiceBtn = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-300)"};
  padding: ${pxToRem(22)};
  display: flex;
  @media (${QUERIES.TABLET}) {
    position: static;
    top: unset;
    border: unset;
    padding: 0;
    background-color: transparent;
  }
`;

export const StyledDialogBox = styled.dialog`
  border-radius: var(--border-radius-g);
  display: grid;
  grid-gap: ${pxToRem(16)};
  grid-template-columns: 1fr;
  width: fit-content;
  align-self: center;
  justify-self: center;
  padding: ${pxToRem(32)};
  border: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
  }
`;
