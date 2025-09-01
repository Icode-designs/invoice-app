"use client";
import { StyledInvoiceList } from "@/styles/components/List.style";
import React, { useContext } from "react";
import ListCard from "./ui/ListCard";
import { LoaderBox } from "@/styles/components/UI.styles";
import { FilterContext } from "@/providers/invoicesProvider";
import EmptyInvoiceList from "./ui/EmptyInvoiceList";

const InvoiceList = () => {
  const filterCtx = useContext(FilterContext);

  if (!filterCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { displayInvoices, isLoading } = filterCtx;

  if (displayInvoices.length === 0) {
    return <EmptyInvoiceList />;
  }

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
