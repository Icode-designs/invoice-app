import { FlexBox, StyledFormControl } from "@/styles/components/UI.styles";
import React from "react";
import VariableButton from "./Button";

interface ControlType {
  formType?: string;
  onDiscard?: () => void;
}

const FormControl = ({ formType = "", onDiscard }: ControlType) => {
  return (
    <StyledFormControl $formVariant={formType}>
      <FlexBox>
        {!formType && (
          <VariableButton variant="btn-500" type="reset" onHandle={onDiscard}>
            Discard
          </VariableButton>
        )}
        <FlexBox>
          <VariableButton variant="btn-400" type="submit">
            Save as Draft
          </VariableButton>
          <VariableButton variant="btn-200" type="submit">
            Save & Send
          </VariableButton>
        </FlexBox>
      </FlexBox>
    </StyledFormControl>
  );
};

export default FormControl;
