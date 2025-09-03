"use client";
import { pxToRem } from "@/utils/helpers/pxTorem";
import styled from "styled-components";
import QUERIES from "../mediaQueries";
import { lightTheme } from "../themes";

export const StyledListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: fit-content;
`;

export const ListTitleBox = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${pxToRem(4)};

  > p {
    opacity: 50%;
  }
`;

export const ListControls = styled.div<{ $activeFilter?: boolean }>`
  position: relative;
  display: flex;
  gap: ${pxToRem(18)};
  align-items: center;
  button:nth-of-type(1) {
    display: flex;
    gap: ${pxToRem(16)};
    align-items: center;

    .icon {
      transition: transform 0.3s ease;
      transform: translateY(${pxToRem(2)})
        ${({ $activeFilter }) => $activeFilter && "rotate(-90deg)"};
    }
  }
`;

export const StyledInvoiceList = styled.ul`
  margin-top: ${pxToRem(32)};
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${pxToRem(16)};

  @media (${QUERIES.TABLET}) {
    margin-top: ${pxToRem(56)};
  }
`;

export const StyledListCard = styled.li`
  position: relative;
  padding: ${pxToRem(24)};
  height: fit-content;
  background-color: ${({ theme }) =>
    theme === lightTheme ? "var(--col-1300)" : "var(--col-300)"};
  border-radius: ${pxToRem(8)};
  display: grid;
  grid-template-areas: "id clientName" "due status" "amt status";

  h3 {
    text-align: left;
    &:nth-of-type(1) {
      grid-area: id;
    }
    &:nth-of-type(2) {
      grid-area: amt;
    }
  }

  p {
    opacity: 50%;
    &:nth-of-type(1) {
      grid-area: clientName;
      text-align: right;
    }
    &:nth-of-type(2) {
      margin-top: ${pxToRem(24)};
      grid-area: due;
    }
  }

  .icon .angle {
    grid-area: angle;
    right: 0;
  }

  .status {
    justify-self: right;
    align-self: self-end;
    grid-area: status;
    width: ${pxToRem(104)};
    height: ${pxToRem(40)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${pxToRem(6)};
    text-transform: capitalize;
    gap: ${pxToRem(6)};
    padding: ${pxToRem(5)};

    &.pending {
      background-color: rgba(var(--pending-col-rgb), 0.3);
      color: var(--pending-color);
    }
    &.paid {
      background-color: rgba(var(--paid-col-rgb), 0.3);
      color: var(--paid-color);
    }
    &.draft {
      background-color: rgba(var(--draft-col-rgb), 0.3);
      color: var(--draft-col);
    }
  }

  @media (${QUERIES.TABLET}) {
    padding: ${pxToRem(16)};
    grid-template-areas: "id due clientName amt status angle";
    align-items: center;
    height: ${pxToRem(72)};

    .status {
      justify-self: unset;
    }

    h3 {
      text-align: unset;
    }

    p {
      opacity: 50%;
      &:nth-of-type(1) {
        text-align: unset;
      }
      &:nth-of-type(2) {
        margin-top: 0;
      }
    }
    > * {
      align-self: center;
    }
  }
`;

export const FilterCard = styled.div<{ $activeFilter?: boolean }>`
  position: absolute;
  top: ${pxToRem(70)};
  left: ${pxToRem(-20)};
  display: ${({ $activeFilter }) => ($activeFilter ? "grid" : "none")};
  grid-template-columns: 1fr;
  grid-row-gap: ${pxToRem(16)};
  border-radius: var(--border-radius-g);
  padding: var(--padding-g);
  width: ${pxToRem(192)};
  height: fit-content;
  box-shadow: 0 ${pxToRem(6)}${pxToRem(10)} rgba(0, 0, 0, 0.3);
  z-index: 90;
  background-color: var(--col-1300);
  color: var(--col-800);
`;

export const StatusBox = styled.div`
  width: ${pxToRem(104)};
  height: ${pxToRem(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${pxToRem(6)};
  text-transform: capitalize;
  gap: ${pxToRem(6)};
  padding: ${pxToRem(5)};

  &.pending {
    background-color: rgba(var(--pending-col-rgb), 0.3);
    color: var(--pending-color);
  }
  &.paid {
    background-color: rgba(var(--paid-col-rgb), 0.3);
    color: var(--paid-color);
  }
  &.draft {
    background-color: rgba(var(--draft-col-rgb), 0.3);
    color: var(--draft-col);
  }
`;
