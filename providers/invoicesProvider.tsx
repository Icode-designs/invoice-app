"use client";
import useFetch from "@/hooks/useFetchData";
import { InvoiceType } from "@/types/api/invoiceType";
import { saveInvoice } from "@/utils/actions/saveInvoice";
import {
  handleDelete,
  handleDraftStatus,
  handlePaidStatus,
  updateInvoice,
} from "@/utils/actions/updateInvoice";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FormContext } from "./FormProvider";

interface FilterContextType {
  filters: string[];
  addFilter: (f: string) => void;
  removeFilter: (f: string) => void;
  displayInvoices: InvoiceType[];
  isLoading: boolean;
  fetchErr: string | null;
  saveNewPendingInvoice: (formData: FormData) => Promise<void>;
  saveNewDraftInvoice: (formData: FormData) => Promise<void>;
  updateExistingInvoice: (formData: FormData, id: string) => Promise<void>;
  deleteInvoiceData: (id: string) => Promise<void>;
  addPaidStatus: (id: string) => Promise<void>;
  addDraftStatus: (id: string) => Promise<void>;
  getInvoice: (id: string) => InvoiceType | undefined;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<string[]>([]);
  const location = usePathname();
  const { invoices, fetchErr, isLoading } = useFetch(location);
  const [invoiceList, setInvoiceList] = useState<InvoiceType[]>([]);
  const formCtx = useContext(FormContext);
  const router = useRouter();

  //sync invoiceList
  useEffect(() => {
    if (invoices.length > 0 && invoiceList.length === 0) {
      setInvoiceList(invoices);
    }
  }, [invoices, invoiceList.length]);

  if (!formCtx) {
    console.log("couldnt get form context");
    return;
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
  async function updateExistingInvoice(formData: FormData, id: string) {
    const { data } = await updateInvoice(formData, id);

    if (data) {
      setInvoiceList((prev) =>
        prev.map((inv) => (inv.id === data.id ? data : inv))
      );
    }

    toggleForm();
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
      ? invoiceList.filter((item) => filters.includes(item.status))
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
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
