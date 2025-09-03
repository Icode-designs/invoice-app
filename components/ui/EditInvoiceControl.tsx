"use client";
import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import { FormContext } from "@/providers/FormProvider";
import { saveUpdate } from "@/utils/actions/updateInvoice";

interface ControlType {
  invoiceId: string;
}

const EditFormControl = ({ invoiceId }: ControlType) => {
  const formCtx = useContext(FormContext);

  if (!formCtx) {
    return;
  }

  const { toggleForm } = formCtx;
  return (
    <StyledFormControl>
      <FlexBox>
        <FlexBox $justify="right">
          <VariableButton variant="btn-400" onClick={toggleForm}>
            Cancel
          </VariableButton>
          <VariableButton
            variant="btn-200"
            type="submit"
            formAction={saveUpdate(invoiceId)}
          >
            Save Changes
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default EditFormControl;
