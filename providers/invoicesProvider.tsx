"use client";
import { useFetch } from "@/hooks/useFetchData";
import { InvoiceType } from "@/types/api/invoiceType";
import React, { createContext, useState } from "react";

export interface FilterContextType {
  filters: string[];
  addFilter: (f: string) => void;
  removeFilter: (f: string) => void;
  displayInvoices: InvoiceType[];
  isLoading: boolean;
  fetchErr: string | null;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<string[]>([]);
  const { invoices, isLoading, fetchErr } = useFetch();

  function addFilter(f: string) {
    setFilters((prevFilters) => [...prevFilters, f]);
  }

  function removeFilter(f: string) {
    if (filters.includes(f)) {
      setFilters((prevFilters) => prevFilters.filter((item) => item !== f));
    } else {
      return;
    }
  }

  const displayInvoices =
    filters.length > 0
      ? invoices.filter((item) => filters.includes(item.status))
      : invoices;

  return (
    <FilterContext.Provider
      value={{
        filters,
        addFilter,
        removeFilter,
        isLoading,
        fetchErr,
        displayInvoices,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
