"use client";
import InvoiceList from "@/components/InvoiceList";
import ListHeader from "@/components/ListHeader";
import NewInvoiceForm from "@/components/NewInvoiceForm";
import { FilterContext } from "@/providers/invoicesProvider";
import { MainWrapper } from "@/styles/components/UI.styles";
import { useContext, useEffect } from "react";

export default function Home() {
  const filterCtx = useContext(FilterContext);
  useEffect(() => {}, []);

  if (!filterCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { displayInvoices, isLoading, fetchErr } = filterCtx;

  return (
    <>
      <NewInvoiceForm />
      <MainWrapper>
        <ListHeader
          displayInvoices={displayInvoices}
          isLoading={isLoading}
          fetchErr={fetchErr}
        />
        <InvoiceList displayInvoices={displayInvoices} isLoading={isLoading} />
      </MainWrapper>
    </>
  );
}
