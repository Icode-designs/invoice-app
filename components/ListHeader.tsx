"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListTitleBox, StyledListHeader } from "@/styles/components/List.style";
import React from "react";
import ListControl from "./ui/ListControl";
import { LoaderBox } from "@/styles/components/UI.styles";
import { InvoiceType } from "@/types/api/invoiceType";

const ListHeader = ({
  displayInvoices,
  isLoading,
  fetchErr,
}: {
  displayInvoices: InvoiceType[];
  isLoading: boolean;
  fetchErr: string | null;
}) => {
  const isDesktop = useMediaQuery(1024);

  //set wrapper based on screen size for responsiveness
  const Wrapper = isDesktop ? "h1" : "h2";
  return (
    <StyledListHeader>
      <ListTitleBox>
        <Wrapper>Invoices</Wrapper>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            {fetchErr && "could not read invoice list"}
            {!isLoading &&
              !fetchErr &&
              displayInvoices.length > 0 &&
              `There are ${displayInvoices.length} total invoice`}
          </p>
        )}
      </ListTitleBox>
      <ListControl />
    </StyledListHeader>
  );
};

export default ListHeader;
