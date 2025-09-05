"use client";
import { FlexBox, StyledDialogBox } from "@/styles/components/UI.styles";
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import VariableButton from "./Button";
import { handleDelete } from "@/utils/actions/updateInvoice";
import { redirect, useRouter } from "next/navigation";

// Define the shape of the exposed methods
export interface DialogBoxHandle {
  open: () => void;
}

const DialogBox = forwardRef<DialogBoxHandle, { id: string }>(({ id }, ref) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

  const onDelete = async () => {
    const result = await handleDelete(id);
    if (result) {
      redirect("/");
    }
  };

  const handleCloseDialog = () => {
    dialogRef.current?.close();
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
        <VariableButton variant="btn-500" onClick={onDelete}>
          Delete
        </VariableButton>
      </FlexBox>
    </StyledDialogBox>
  );
});

DialogBox.displayName = "DialogBox";

export default DialogBox;
