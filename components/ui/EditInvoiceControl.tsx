"use client";
import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React, { useContext, useState } from "react";
import VariableButton from "./Button";
import { FormContext } from "@/providers/FormProvider";
import { updateInvoice } from "@/utils/actions/updateInvoice";

interface ControlType {
  invoiceId: string;
}

const EditFormControl = ({ invoiceId }: ControlType) => {
  const formCtx = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!formCtx) {
    return null; // ✅ Return null instead of undefined
  }

  const { toggleForm } = formCtx;

  function handleSaveUpdate(id: string) {
    return async (formData: FormData): Promise<void> => {
      setIsSubmitting(true);
      try {
        const result = await updateInvoice(formData, id);

        if (result.success) {
          toggleForm();
          window.location.reload();
        } else {
          // Handle error appropriately
          alert(`Update failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Update error:", error);
        alert("An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
    };
  }

  return (
    <StyledFormControl>
      <FlexBox>
        <FlexBox $justify="right">
          <VariableButton
            variant="btn-400"
            onClick={toggleForm}
            disabled={isSubmitting}
          >
            Cancel
          </VariableButton>
          <VariableButton
            variant="btn-200"
            type="submit"
            formAction={handleSaveUpdate(invoiceId)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default EditFormControl;
