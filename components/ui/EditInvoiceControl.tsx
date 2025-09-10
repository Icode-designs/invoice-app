"use client";
import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import { FilterContext } from "@/providers/invoicesProvider";
import { FormContext } from "@/providers/FormProvider";
import { useFormStatus } from "react-dom";

interface ControlType {
  invoiceId: string;
}

const EditFormControl = ({ invoiceId }: ControlType) => {
  const { pending } = useFormStatus();
  const filterCtx = useContext(FilterContext);
  const formCtx = useContext(FormContext);

  if (!filterCtx || !formCtx) {
    return;
  }

  const { updateExistingInvoice } = filterCtx;
  const { toggleForm } = formCtx;

  async function handleSaveUpdate(formData: FormData) {
    await updateExistingInvoice(formData, invoiceId);
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
