"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListTitleBox, StyledListHeader } from "@/styles/components/List.style";
import React from "react";
import ListControl from "./ui/ListControl";
import { invoiceList } from "@/utils/constants";

const ListHeader = () => {
  const isDesktop = useMediaQuery(1024);
  const listLength = invoiceList.length;

  const Wrapper = isDesktop ? "h1" : "h2";
  return (
    <StyledListHeader>
      <ListTitleBox>
        <Wrapper>Invoices</Wrapper>
        <p>
          {listLength > 0
            ? `There are ${listLength} total invoice`
            : "No invoices"}
        </p>
      </ListTitleBox>
      <ListControl />
    </StyledListHeader>
  );
};

export default ListHeader;
