"use client";
import { useMediaQuery } from "@/hooks/useMedia";
import { ListTitleBox, StyledListHeader } from "@/styles/components/List.style";
import React from "react";
import ListControl from "./ui/ListControl";
import { InvoiceType } from "@/types/api/invoiceType";
import QUERIES from "@/styles/mediaQueries";

interface ListHeaderProps {
  displayInvoices: InvoiceType[];
  totalInvoices?: number; // Total count before filtering
  isLoading: boolean;
  fetchErr: string | null;
  hasActiveFilters?: boolean; // Whether any filters are applied
}

const ListHeader = ({
  displayInvoices,
  totalInvoices,
  isLoading,
  fetchErr,
  hasActiveFilters = false,
}: ListHeaderProps) => {
  const isDesktop = useMediaQuery(1024);

  // Set wrapper based on screen size for responsiveness
  const Wrapper = isDesktop ? "h1" : "h2";

  // Generate status message
  const getStatusMessage = (): string => {
    if (isLoading) return "Loading invoices...";

    if (fetchErr) return "Could not load invoice list";

    const displayCount = displayInvoices.length;
    const total = totalInvoices ?? displayCount;

    if (displayCount === 0) {
      return hasActiveFilters
        ? "No invoices match your current filters"
        : "No invoices found";
    }

    if (hasActiveFilters && displayCount < total) {
      return `Showing ${displayCount} of ${total} invoice${
        total !== 1 ? "s" : ""
      }`;
    }

    return `${displayCount} invoice${displayCount !== 1 ? "s" : ""} total`;
  };

  return (
    <StyledListHeader>
      <ListTitleBox>
        <Wrapper>Invoices</Wrapper>
        <p>{getStatusMessage()}</p>
      </ListTitleBox>
      <ListControl />
    </StyledListHeader>
  );
};

export default ListHeader;
