import { StyledEmptyInvoice } from "@/styles/components/UI.styles";
import Image from "next/image";
import React from "react";
import image from "@/assets/illustration-empty.svg";

const EmptyInvoiceList = () => {
  return (
    <StyledEmptyInvoice>
      <div>
        {" "}
        <Image src={image} alt="empty invoice" />
        <article>
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the New Invoice button and get started
          </p>
        </article>
      </div>
    </StyledEmptyInvoice>
  );
};

export default EmptyInvoiceList;
