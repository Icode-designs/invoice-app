import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import {
  handleSaveAndSend,
  handleSaveAsDraft,
} from "@/utils/actions/saveInvoice";
import { FormContext } from "@/providers/FormProvider";

interface ControlType {
  formType?: string;
  onDiscard?: () => void;
}

const FormControl = ({ formType = "", onDiscard }: ControlType) => {
  const formCtx = useContext(FormContext);

  if (!formCtx) {
    return;
  }

  const { toggleForm } = formCtx;

  function handleDiscard() {
    toggleForm();
  }
  return (
    <StyledFormControl $formVariant={formType}>
      <FlexBox>
        {!formType && (
          <VariableButton
            variant="btn-500"
            type="reset"
            onHandle={handleDiscard}
          >
            Discard
          </VariableButton>
        )}
        <FlexBox>
          <VariableButton
            variant="btn-400"
            type="submit"
            formAction={handleSaveAsDraft}
          >
            Save as Draft
          </VariableButton>
          <VariableButton
            variant="btn-200"
            type="submit"
            formAction={handleSaveAndSend}
          >
            Save & Send
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default FormControl;
