import { StyledListCard } from "@/styles/components/List.style";
import { InvoiceType } from "@/types/api/invoiceType";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { LuHash } from "react-icons/lu";
import formatToEuro from "@/utils/helpers/formatToEuro";

interface ListCardProps {
  invoice: InvoiceType;
}

const ListCard = ({ invoice }: ListCardProps) => {
  return (
    <StyledListCard>
      <h3>
        <LuHash className="icon" />
        {invoice.id}
      </h3>
      <p>{invoice.clientName}</p>
      <p>Due {invoice.paymentDue}</p>
      <h3>{formatToEuro(invoice.total)}</h3>
      <div className={`status ${invoice.status}`}>
        <GoDotFill size={12} />
        <h3>{invoice.status}</h3>
      </div>
    </StyledListCard>
  );
};

export default ListCard;
