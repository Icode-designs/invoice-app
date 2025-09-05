"use client";
import { FlexBox, StyledInvoiceBtn } from "@/styles/components/UI.styles";
import React from "react";
import VariableButton from "./Button";
import { handlePaidStatus } from "@/utils/actions/updateInvoice";

interface InvoiceBtnTypes {
  toggleForm: () => void;
  id: string;
  openDialog: () => void;
  status: string;
}

const InvoiceBtn = ({
  toggleForm,
  id,
  openDialog,
  status,
}: InvoiceBtnTypes) => {
  // Todo: update status in realtime
  const onPaid = async () => {
    await handlePaidStatus(id);
    window.location.reload();
  };
  return (
    <StyledInvoiceBtn>
      <FlexBox $justify="center">
        <VariableButton variant="btn-300" onClick={toggleForm}>
          edit
        </VariableButton>
        <VariableButton variant="btn-500" onClick={openDialog}>
          Delete
        </VariableButton>
        <VariableButton
          variant="btn-200"
          onClick={onPaid}
          disabled={status === "paid"}
        >
          Mark as Paid
        </VariableButton>
      </FlexBox>
    </StyledInvoiceBtn>
  );
};

export default InvoiceBtn;
