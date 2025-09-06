"use client";
import { pxToRem } from "@/utils/helpers/pxTorem";
import styled from "styled-components";
import QUERIES from "../mediaQueries";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--col-300);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  z-index: 100;
  > * {
    border: none;
  }

  @media (${QUERIES.DESKTOP}) {
    width: fit-content;
    height: 100vh;
    flex-direction: column;
  }
`;

export const HeaderLogo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${pxToRem(24)};
  background-color: var(--col-100);
  border-top-right-radius: ${pxToRem(20)};
  border-bottom-right-radius: ${pxToRem(20)};
  overflow: hidden;

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 50%;
    background-color: var(--col-1300);
    opacity: 30%;
    border: none;
    border-top-left-radius: ${pxToRem(20)};
    bottom: 0;
    left: 0;
  }
`;

export const HeaderActions = styled.div`
  display: flex;

  > div {
    padding: ${pxToRem(16)} ${pxToRem(24)};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (${QUERIES.DESKTOP}) {
    flex-direction: column;
  }
`;

export const HeaderAvatar = styled.div`
  border-left: 1px solid #494e6e;
  img {
    border-radius: 50%;
  }

  @media (${QUERIES.DESKTOP}) {
    border: none;
    border-top: 1px solid #494e6e;
  }
`;

export const ThemeControls = styled.div`
  height: fit-content;
  align-self: center;
  button {
    background: none;
    border: none;
    height: fit-content;
    width: fit-content;
    color: var(--col-700);
    font-size: ${pxToRem(20)};
  }
`;
