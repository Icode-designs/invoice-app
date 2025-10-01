"use client";
import {
  HeaderActions,
  HeaderLogo,
  HeaderSessionAction,
  StyledHeader,
} from "@/styles/components/Header.styles";
import Image from "next/image";
import React, { useContext } from "react";
import logo from "@/assets/logo.svg";
import ThemeControl from "./ui/ThemeControl";
import Link from "next/link";
import { TbDoorExit } from "react-icons/tb";
import { UserContext } from "@/providers/UserProvider";
import { logOut } from "@/utils/actions/logoutUser";
import { TbDoorEnter } from "react-icons/tb";

const Header = () => {
  const userCtx = useContext(UserContext);

  if (!userCtx) {
    return;
  }

  const { authUser } = userCtx;

  return (
    <StyledHeader>
      <HeaderLogo>
        <Image src={logo} alt="Invoice App Logo" width={28} height={26} />
      </HeaderLogo>

      <HeaderActions>
        <ThemeControl />
        <HeaderSessionAction>
          {authUser ? (
            <button onClick={logOut}>
              <TbDoorExit size={20} color="red" />
            </button>
          ) : (
            <Link href="/onBoarding/login">
              <TbDoorEnter size={20} color="green" />
            </Link>
          )}
        </HeaderSessionAction>
      </HeaderActions>
    </StyledHeader>
  );
};

export default Header;
