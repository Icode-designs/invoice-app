import { StyledListCard } from "@/styles/components/List.style";
import { InvoiceType } from "@/types/api/invoiceType";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { LuHash } from "react-icons/lu";
import formatToEuro from "@/utils/helpers/formatToEuro";
import { useMediaQuery } from "@/hooks/useMedia";
import { FaAngleRight } from "react-icons/fa";

interface ListCardProps {
  invoice: InvoiceType;
}

const ListCard = ({ invoice }: ListCardProps) => {
  const isTablet = useMediaQuery(768);
  return (
    <StyledListCard>
      <h3>
        <LuHash className="icon" />
        {invoice.id}
      </h3>
      <p>{invoice.clientname}</p>
      <p>Due {invoice.paymentdue}</p>
      <h3>{formatToEuro(invoice.total)}</h3>
      <div className={`status ${invoice.status}`}>
        <GoDotFill size={12} />
        <h3>{invoice.status}</h3>
      </div>
      {isTablet && (
        <button className="icon angle">
          <FaAngleRight />
        </button>
      )}
    </StyledListCard>
  );
};

export default ListCard;
