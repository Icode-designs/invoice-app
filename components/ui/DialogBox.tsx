"use client";
import { FlexBox, StyledDialogBox } from "@/styles/components/UI.styles";
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
  useState,
} from "react";
import VariableButton from "./Button";
import { InvoicesContext } from "@/providers/invoicesProvider";

// Define the shape of the exposed methods
export interface DialogBoxHandle {
  open: () => void;
}

const DialogBox = forwardRef<DialogBoxHandle, { id: string }>(({ id }, ref) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const invoicesCtx = useContext(InvoicesContext);
  const [deleting, setDeleting] = useState(false);

  // Expose the open method to parent
  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        dialogRef.current?.showModal(); // or .show() if not modal
      },
    }),
    []
  );

  if (!invoicesCtx) {
    return null;
  }

  const { deleteInvoiceData } = invoicesCtx;

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  const onDelete = async () => {
    setDeleting(true);
    await deleteInvoiceData(id);
    setDeleting(false);
    handleCloseDialog();
  };

  return (
    <StyledDialogBox ref={dialogRef}>
      <h1>Confirm Deletion</h1>
      <p>
        Are you sure you want to delete invoice #{id}? This action cannot be
        undone.
      </p>
      <FlexBox $justify="right">
        <VariableButton variant="btn-300" onClick={handleCloseDialog}>
          Cancel
        </VariableButton>
        <VariableButton
          variant="btn-500"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </VariableButton>
      </FlexBox>
    </StyledDialogBox>
  );
});

DialogBox.displayName = "DialogBox";

export default DialogBox;
