"use client";
import styled from "styled-components";
import { lightTheme } from "../themes";
import { pxToRem } from "@/utils/helpers/pxTorem";
import QUERIES from "../mediaQueries";

export const StyledFormContainer = styled.div<{ $isOpen: boolean }>`
  padding-top: ${pxToRem(104)};
  position: fixed;
  width: 100%;
  height: 100%;
  overscroll-behavior: contain;
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  left: 0;
  z-index: 85;
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-1200)"};
  display: block;
  transition: top 0.5s ease, left 0.5s ease;
  overscroll-behavior: contain;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: 0;

  @media (${QUERIES.TABLET}) {
    padding: 0;
    padding-top: ${pxToRem(72)};
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    height: 100vh;
  }

  @media (${QUERIES.DESKTOP}) {
    padding: 0;
    top: ${pxToRem(0)};
    left: ${({ $isOpen }) => ($isOpen ? pxToRem(80) : "-100%")};
  }
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: start;
  position: relative;
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-1200)"};
  overscroll-behavior: contain;
  height: 100%;
  overscroll-behavior: contain;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scrollbar-width: 0;
  padding-top: ${pxToRem(56)};
  padding: 0;
  > * {
    margin: ${pxToRem(16)};
    margin-bottom: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  > button {
    margin-bottom: ${pxToRem(24)};
  }
  > h2,
  > h3 {
    margin-bottom: ${pxToRem(32)};
  }
  fieldset {
    margin-bottom: ${pxToRem(32)};
    border: none;
    display: grid;
    grid-row-gap: ${pxToRem(24)};
    h3 {
      color: var(--col-100);
      text-transform: capitalize;
    }
  }
  .itemList {
    margin-bottom: ${pxToRem(56)};
    > div {
      button {
        align-self: center;
        transform: translateY(${pxToRem(13)});
      }
    }
    > button {
      margin-top: ${pxToRem(32)};
      background-color: var(--col-400);
      color: var(--col-600) !important;
    }
  }
  @media (${QUERIES.TABLET}) {
    padding-top: ${pxToRem(56)};
    margin: 0;
    height: 100%;
    width: ${pxToRem(616)};
    border-top-right-radius: ${pxToRem(20)};
    border-bottom-right-radius: ${pxToRem(20)};
    > * {
      margin: 0 ${pxToRem(56)};
    }
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-row-gap: ${pxToRem(16)};
`;
