"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListTitleBox, StyledListHeader } from "@/styles/components/List.style";
import React from "react";
import ListControl from "./ui/ListControl";
import { useFetch } from "@/hooks/useFetchData";
import { LoaderBox } from "@/styles/components/UI.styles";

const ListHeader = () => {
  const { invoices, isLoading, fetchErr } = useFetch();
  const isDesktop = useMediaQuery(1024);

  //set wrapper based on screen size for responsiveness
  const Wrapper = isDesktop ? "h1" : "h2";
  return (
    <StyledListHeader>
      <ListTitleBox>
        <Wrapper>Invoices</Wrapper>
        {isLoading ? (
          <LoaderBox $variant="small" />
        ) : (
          <p>
            {fetchErr && "could not read invoice list"}
            {!isLoading && invoices.length > 0
              ? `There are ${invoices.length} total invoice`
              : "No invoices"}
          </p>
        )}
      </ListTitleBox>
      <ListControl />
    </StyledListHeader>
  );
};

export default ListHeader;
