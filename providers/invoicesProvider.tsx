"use client";
import { InvoiceType } from "@/types/api/invoiceType";
import { saveInvoice } from "@/utils/actions/saveInvoice";
import {
  handleDelete,
  handleDraftStatus,
  handlePaidStatus,
  updateInvoice,
} from "@/utils/actions/updateInvoice";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FormContext } from "./FormProvider";
import useFetchInvoices from "@/hooks/useFetchInvoices";

interface InvoicesContextType {
  filters: string[];
  addFilter: (f: string) => void;
  removeFilter: (f: string) => void;
  displayInvoices: InvoiceType[];
  isLoading: boolean;
  fetchErr: string | null;
  saveNewPendingInvoice: (formData: FormData) => Promise<void>;
  saveNewDraftInvoice: (formData: FormData) => Promise<void>;
  updateExistingInvoice: (updatedInvoice: InvoiceType) => Promise<void>;
  deleteInvoiceData: (id: string) => Promise<void>;
  addPaidStatus: (id: string) => Promise<void>;
  addDraftStatus: (id: string) => Promise<void>;
  getInvoice: (id: string) => InvoiceType | undefined;
}

export const InvoicesContext = createContext<InvoicesContextType | null>(null);

export const InvoicesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const { invoices, fetchErr, isLoading } = useFetchInvoices();
  const [invoiceList, setInvoiceList] = useState<InvoiceType[]>([]);
  const formCtx = useContext(FormContext);
  const router = useRouter();

  //sync invoiceList
  useEffect(() => {
    setInvoiceList(invoices);
  }, [invoices]);

  if (!formCtx) {
    return null;
  }

  const { toggleForm } = formCtx;

  //save new pending invoice
  async function saveNewPendingInvoice(formData: FormData) {
    const { data } = await saveInvoice(formData, "pending");

    if (data) {
      setInvoiceList((prev) => [...prev, data]);
    }

    toggleForm();
  }

  //save new draft invoice
  async function saveNewDraftInvoice(formData: FormData) {
    const { data } = await saveInvoice(formData, "draft");

    if (data) {
      setInvoiceList((prev) => [...prev, data]);
    }

    toggleForm();
  }

  //get single invoice
  function getInvoice(id: string) {
    return invoiceList.find((inv) => inv.id === id);
  }

  //delete invoice
  async function deleteInvoiceData(id: string) {
    setInvoiceList((prevInv) => prevInv.filter((item) => item.id !== id));
    await handleDelete(id);
    router.push("/");
  }

  //update existing invoices
  async function updateExistingInvoice(invoiceObj: InvoiceType) {
    try {
      const { success, data, error } = await updateInvoice(invoiceObj);

      if (success && data) {
        console.log("Updated invoice:", data);

        setInvoiceList((prevInvoices) =>
          prevInvoices.map((inv) => (inv.id === data.id ? data : inv))
        );
      } else {
        console.error(
          "Update failed:",
          error ?? "Unknown error from server action"
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Unexpected error updating invoice:", message);
    }
  }

  //add paid status and update state
  async function addPaidStatus(id: string) {
    setInvoiceList((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv))
    );
    await handlePaidStatus(id);
  }

  //add draft status and update state
  async function addDraftStatus(id: string) {
    setInvoiceList((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "draft" } : inv))
    );
    await handleDraftStatus(id);
  }

  //add filter
  function addFilter(f: string) {
    setFilters((prevFilters) => [...prevFilters, f]);
  }

  //remove filter
  function removeFilter(f: string) {
    if (filters.includes(f)) {
      setFilters((prevFilters) => prevFilters.filter((item) => item !== f));
    } else {
      return;
    }
  }

  //set displayed invoices based on filter

  const displayInvoices =
    filters.length > 0
      ? invoiceList.filter((item) => filters.includes(item.status as string))
      : invoiceList;

  const value = {
    filters,
    addFilter,
    removeFilter,
    isLoading,
    fetchErr,
    displayInvoices,
    saveNewPendingInvoice,
    saveNewDraftInvoice,
    updateExistingInvoice,
    deleteInvoiceData,
    addPaidStatus,
    addDraftStatus,
    getInvoice,
  };
  return (
    <InvoicesContext.Provider value={value}>
      {children}
    </InvoicesContext.Provider>
  );
};
