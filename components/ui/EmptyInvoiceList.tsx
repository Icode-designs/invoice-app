"use client";
import { StyledEmptyInvoice } from "@/styles/components/UI.styles";
import Image from "next/image";
import React, { useContext } from "react";
import image from "@/assets/illustration-empty.svg";
import { UserContext } from "@/providers/UserProvider";

const EmptyInvoiceList = () => {
  const userCtx = useContext(UserContext);

  if (!userCtx) {
    return;
  }

  const { authUser } = userCtx;

  return (
    <StyledEmptyInvoice>
      <div>
        {" "}
        <Image src={image} alt="empty invoice" />
        <article>
          <h2>There is nothing here</h2>
          <p>
            {!authUser
              ? "User is not logged in, login to see invoices"
              : "Create an invoice by clicking the New Invoice button and get started"}
          </p>
        </article>
      </div>
    </StyledEmptyInvoice>
  );
};

export default EmptyInvoiceList;
