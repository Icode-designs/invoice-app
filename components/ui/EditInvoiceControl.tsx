"use client";
import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import { InvoicesContext } from "@/providers/invoicesProvider";
import { FormContext } from "@/providers/FormProvider";
import { useFormStatus } from "react-dom";
import { parseInvoiceForm } from "@/utils/helpers/parseInvoice";
import { InvoiceType } from "@/types/api/invoiceType";

interface ControlType {
  invoiceId: string | null;
  setSelectedInvoice: React.Dispatch<
    React.SetStateAction<InvoiceType | undefined>
  >;
}

const EditFormControl = ({ invoiceId, setSelectedInvoice }: ControlType) => {
  const { pending } = useFormStatus();
  const formCtx = useContext(FormContext);
  const invoicesCtx = useContext(InvoicesContext);

  if (!formCtx || !invoicesCtx) {
    return;
  }

  const { toggleForm } = formCtx;
  const { updateExistingInvoice } = invoicesCtx;

  async function handleSaveUpdate(formData: FormData) {
    const updatedInvoice = await parseInvoiceForm(
      formData,
      invoiceId as string
    );
    setSelectedInvoice(updatedInvoice);
    await updateExistingInvoice(updatedInvoice);
    toggleForm();
  }

  return (
    <StyledFormControl>
      <FlexBox>
        <FlexBox $justify="right">
          <VariableButton
            variant="btn-400"
            onClick={toggleForm}
            disabled={pending}
          >
            Cancel
          </VariableButton>
          <VariableButton
            variant="btn-200"
            type="submit"
            formAction={handleSaveUpdate}
            disabled={pending}
          >
            {pending ? "Saving Changes..." : "Save Changes"}
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default EditFormControl;
