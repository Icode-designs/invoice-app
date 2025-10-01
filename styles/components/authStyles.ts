"use client";
import { pxToRem } from "@/utils/helpers/pxTorem";
import styled from "styled-components";
import QUERIES from "../mediaQueries";

export const ProfileImageBox = styled.div`
  border: var(--col-100) ${pxToRem(2)} solid;
  width: ${pxToRem(200)};
  height: ${pxToRem(200)};
  margin: var(--centered);
  position: relative;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;

export const AuthForm = styled.form<{ $variant?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${pxToRem(16)};
  width: 100%;
  height: auto;
  margin: var(--centered);
  padding: ${pxToRem(16)};
  border-radius: var(--border-radius-g);
  box-shadow: ${pxToRem(6)} ${pxToRem(6)} ${pxToRem(16)} rgba(0, 0, 0, 0.1);
  margin-top: ${({ $variant }) => ($variant === "login" ? "10vh" : undefined)};

  > div:nth-of-type(1) {
    justify-self: center;
  }

  @media (${QUERIES.TABLET}) {
    width: 80%;
  }
`;
