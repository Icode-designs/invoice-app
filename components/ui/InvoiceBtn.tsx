"use client";
import { FlexBox, StyledInvoiceBtn } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import { InvoicesContext } from "@/providers/invoicesProvider";
import { FormContext } from "@/providers/FormProvider";

import { InvoiceType } from "@/types/api/invoiceType";
import { getInvoice } from "@/utils/actions/getUserInvoices";
import { handlePaidStatus } from "@/utils/actions/updateInvoice";

interface InvoiceBtnTypes {
  id: string;
  openDialog: () => void;
  status: string | null;
  setSelectedInvoice: React.Dispatch<
    React.SetStateAction<InvoiceType | undefined>
  >;
}

const InvoiceBtn = ({
  id,
  openDialog,
  status,
  setSelectedInvoice,
}: InvoiceBtnTypes) => {
  const invoicesCtx = useContext(InvoicesContext);
  const formCtx = useContext(FormContext);

  if (!invoicesCtx || !formCtx) {
    return null;
  }

  const { toggleForm } = formCtx;
  const { addPaidStatus } = invoicesCtx;

  const onPaid = async () => {
    setSelectedInvoice((prev) => {
      if (!prev) return undefined;
      return { ...prev, status: "paid" };
    });

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
