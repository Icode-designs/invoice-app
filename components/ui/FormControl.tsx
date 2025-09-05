import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import {
  handleSaveAndSend,
  handleSaveAsDraft,
} from "@/utils/actions/saveInvoice";
import { FormContext } from "@/providers/FormProvider";

const FormControl = () => {
  const formCtx = useContext(FormContext);

  if (!formCtx) {
    return;
  }

  const { toggleForm } = formCtx;

  function handleDiscard() {
    toggleForm();
  }

  function onSave(formData: FormData) {
    handleSaveAndSend(formData);
    window.location.reload();
  }
  function onSaveDraft(formData: FormData) {
    handleSaveAsDraft(formData);
    window.location.reload();
  }
  return (
    <StyledFormControl>
      <FlexBox $justify="space-between">
        <VariableButton variant="btn-500" type="reset" onHandle={handleDiscard}>
          Discard
        </VariableButton>

        <FlexBox $width="fit-content">
          <VariableButton
            variant="btn-400"
            type="submit"
            formAction={onSaveDraft}
          >
            Save as Draft
          </VariableButton>
          <VariableButton variant="btn-200" type="submit" formAction={onSave}>
            Save & Send
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default FormControl;
