"use client";
import { StyledInvoiceList } from "@/styles/components/List.style";
import React, { useContext } from "react";
import ListCard from "./ui/ListCard";
import { LoaderBox } from "@/styles/components/UI.styles";
import { FilterContext } from "@/providers/invoicesProvider";

const InvoiceList = () => {
  const filterCtx = useContext(FilterContext);

  if (!filterCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { displayInvoices, isLoading } = filterCtx;

  return (
    <StyledInvoiceList>
      {isLoading ? (
        <LoaderBox />
      ) : (
        displayInvoices.map((invoice) => (
          <ListCard invoice={invoice} key={invoice.id} />
        ))
      )}
    </StyledInvoiceList>
  );
};

export default InvoiceList;
