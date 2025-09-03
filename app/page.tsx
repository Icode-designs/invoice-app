"use client";
import InvoiceList from "@/components/InvoiceList";
import ListHeader from "@/components/ListHeader";
import NewInvoiceForm from "@/components/NewInvoiceForm";
import FormContextProvider from "@/providers/FormProvider";
import {
  FilterContext,
  FilterContextProvider,
} from "@/providers/invoicesProvider";
import { MainWrapper } from "@/styles/components/UI.styles";
import { useContext } from "react";

export default function Home() {
  const filterCtx = useContext(FilterContext);

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
