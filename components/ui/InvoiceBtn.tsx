"use client";
import { FlexBox, StyledInvoiceBtn } from "@/styles/components/UI.styles";
import React, { useState } from "react";
import VariableButton from "./Button";
import { handleDelete, handlePaidStatus } from "@/utils/actions/updateInvoice";
import { useRouter } from "next/navigation";

interface InvoiceBtnTypes {
  toggleForm: () => void;
  id: string;
}

const InvoiceBtn = ({ toggleForm, id }: InvoiceBtnTypes) => {
  const router = useRouter();

  const onDelete = async () => {
    const result = await handleDelete(id);
    if (result) {
      router.push("/");
    }
  };

  // Todo: update status in realtime
  const onPaid = async () => {
    const result = await handlePaidStatus(id);
    console.log(result);
  };
  return (
    <StyledInvoiceBtn>
      <FlexBox $justify="center">
        <VariableButton variant="btn-300" onClick={toggleForm}>
          edit
        </VariableButton>
        <VariableButton variant="btn-500" onClick={onDelete}>
          Delete
        </VariableButton>
        <VariableButton variant="btn-200" onClick={onPaid}>
          Mark as Paid
        </VariableButton>
      </FlexBox>
    </StyledInvoiceBtn>
  );
};

export default InvoiceBtn;
