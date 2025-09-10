"use client";
import { FlexBox, StyledInvoiceBtn } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import { FilterContext } from "@/providers/invoicesProvider";
import { FormContext } from "@/providers/FormProvider";

interface InvoiceBtnTypes {
  id: string;
  openDialog: () => void;
  status: string;
}

const InvoiceBtn = ({ id, openDialog, status }: InvoiceBtnTypes) => {
  const filterCtx = useContext(FilterContext);
  const formCtx = useContext(FormContext);

  if (!filterCtx || !formCtx) {
    return null;
  }

  const { toggleForm } = formCtx;
  const { addPaidStatus } = filterCtx;
  // Todo: update status in realtime
  const onPaid = async () => {
    await addPaidStatus(id);
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
