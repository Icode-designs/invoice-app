import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext } from "react";
import VariableButton from "./Button";
import { FormContext } from "@/providers/FormProvider";
import { FilterContext } from "@/providers/invoicesProvider";
import { useFormStatus } from "react-dom";

const FormControl = () => {
  const formCtx = useContext(FormContext);
  const { pending } = useFormStatus();
  const filterCtx = useContext(FilterContext);

  if (!formCtx || !filterCtx) {
    return;
  }

  const { saveNewPendingInvoice, saveNewDraftInvoice } = filterCtx;

  const { toggleForm } = formCtx;

  function handleDiscard() {
    toggleForm();
  }

  async function handleSavePending(formData: FormData) {
    await saveNewPendingInvoice(formData);
  }

  async function handleSaveDraft(formData: FormData) {
    await saveNewDraftInvoice(formData);
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
            formAction={handleSaveDraft}
            disabled={pending}
          >
            {pending ? "Saving draft..." : "Save as Draft"}
          </VariableButton>
          <VariableButton
            variant="btn-200"
            type="submit"
            formAction={handleSavePending}
            disabled={pending}
          >
            {pending ? "Saving..." : "Save & Send"}
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default FormControl;
