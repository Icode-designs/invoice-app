import { StyledInvoiceList } from "@/styles/components/List.style";
import { invoiceList } from "@/utils/constants";
import React from "react";
import ListCard from "./ui/ListCard";

const InvoiceList = () => {
  return (
    <StyledInvoiceList>
      {invoiceList.map((invoice) => (
        <ListCard invoice={invoice} key={invoice.id} />
      ))}
    </StyledInvoiceList>
  );
};

export default InvoiceList;
