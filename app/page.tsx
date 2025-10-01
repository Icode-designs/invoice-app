"use client";
import InvoiceList from "@/components/InvoiceList";
import ListHeader from "@/components/ListHeader";
import NewInvoiceForm from "@/components/NewInvoiceForm";
import { InvoicesContext } from "@/providers/invoicesProvider";
import { useContext, useEffect } from "react";

export default function Home() {
  const invoicesCtx = useContext(InvoicesContext);
  useEffect(() => {}, []);

  if (!invoicesCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { displayInvoices, isLoading, fetchErr } = invoicesCtx;

  return (
    <>
      <NewInvoiceForm />
      <main>
        <ListHeader
          displayInvoices={displayInvoices}
          isLoading={isLoading}
          fetchErr={fetchErr}
        />
        <InvoiceList displayInvoices={displayInvoices} isLoading={isLoading} />
      </main>
    </>
  );
}
