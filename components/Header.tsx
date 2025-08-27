import {
  HeaderActions,
  HeaderAvatar,
  HeaderLogo,
  StyledHeader,
} from "@/styles/components/Header.styles";
import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import userAvatar from "@/assets/image-avatar.jpg";
import ThemeControl from "./ui/ThemeControl";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderLogo>
        <Image src={logo} alt="Invoice App Logo" width={28} height={26} />
      </HeaderLogo>

      <HeaderActions>
        <ThemeControl />
        <HeaderAvatar>
          <Image src={userAvatar} alt="User Avatar" width={32} height={32} />
        </HeaderAvatar>
      </HeaderActions>
    </StyledHeader>
  );
};

export default Header;
