"use client";
import styled, { css } from "styled-components";
import { pxToRem } from "@/utils/helpers/pxTorem";
import { lightTheme } from "../themes";

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
  font-size: ${pxToRem(16)};
  font-weight: var(--bold-font);

  p {
    font-size: inherit;
    color: var(--col-1300);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.button100Hover};
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
          color: "var(--col-1300)";

          &:hover {
            background-color: ${({ theme }) => theme.colors.button100Hover};
          }
        `
      : null}

  ${({ $variant }) =>
    $variant === "btn-300" &&
    css`
      background-color: ${({ theme }) => theme.colors.button300};
      color: ${({ theme }) =>
        theme === lightTheme ? "var(--col-1300)" : "var(--col-700)"};
      border-radius: ${pxToRem(24)};
      &:hover {
        background-color: ${({ theme }) => theme.colors.button300Hover};
        color: var(--col-700);
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
  max-width: var(--max-w);
  margin: var(--centered);
  padding: ${pxToRem(104)} ${pxToRem(24)};
`;

export const LoaderBox = styled.div<{ $variant?: string }>`
  /* HTML: <div class="loader"></div> */

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

export const StyledCheckBox = styled.div`
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
