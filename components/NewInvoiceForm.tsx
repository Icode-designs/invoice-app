"use client";
import {
  InputContainer,
  StyledForm,
  StyledFormContainer,
} from "@/styles/components/NewInvoiceForm.styles";
import React, { useContext, useEffect, useState } from "react";
import TextInput from "./ui/TextInput";
import { FlexBox } from "@/styles/components/UI.styles";
import { FormContext } from "@/providers/FormProvider";
import { FaAngleLeft } from "react-icons/fa";
import { useMediaQuery } from "@/hooks/useMedia";
import VariableButton from "./ui/Button";
import { MdDelete } from "react-icons/md";
import FormControl from "./ui/FormControl";

const NewInvoiceForm = () => {
  const formCtx = useContext(FormContext);
  const isLargeScreen = useMediaQuery(768);
  const Wrapper = isLargeScreen ? "h2" : "h3";

  const [currentDate, setCurrentDate] = useState("");

  // Set the current date on the client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
  }, []);

  if (!formCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { isOpen, toggleForm } = formCtx;

  function handleClick() {
    const itemInput = document.getElementById("itemInput");
    if (itemInput) {
      const newItemInput = itemInput.cloneNode(true) as HTMLElement;

      // Give it a new unique id
      newItemInput.id = Date.now().toString();
      newItemInput.removeAttribute("data-template");

      // Fix: re-attach delete button handler
      const deleteBtn = newItemInput.querySelector(".deleteBtn");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
          newItemInput.remove();
        });
      }

      // Insert after the original
      itemInput.parentNode?.insertBefore(newItemInput, itemInput.nextSibling);
    }
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const delBtn = event.currentTarget;
    const parent = delBtn.parentElement;
    const grandparent = parent?.parentElement;

    // Don't remove the template row
    if (grandparent?.id === "itemInput") {
      return;
    }

    grandparent?.remove();
  }

  return (
    <StyledFormContainer $isOpen={isOpen}>
      <StyledForm>
        {!isLargeScreen && (
          <button onClick={toggleForm}>
            <FlexBox>
              <FaAngleLeft className="icon" />
              <span> Go Back</span>
            </FlexBox>
          </button>
        )}
        <Wrapper>New Form</Wrapper>

        <fieldset>
          <h3>bill form</h3>

          <InputContainer>
            <TextInput
              label="Street Address"
              name="senderAddress"
              type="text"
            />
            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput label="City" name="senderCity" type="text" />
                <TextInput
                  label="Post Code"
                  name="senderPostcode"
                  type="number"
                />
              </FlexBox>
              <TextInput label="country" name="senderCountry" type="text" />
            </FlexBox>
          </InputContainer>
        </fieldset>

        <fieldset>
          <h3>bill to</h3>
          <InputContainer>
            <TextInput label="client's name" name="clientname" type="text" />
            <TextInput label="client's email" name="clientemail" type="email" />
            <TextInput
              label="street address"
              name="recieverAddress"
              type="text"
            />

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput label="City" name="recieverCity" type="text" />
                <TextInput
                  label="Post Code"
                  name="recieverPostcode"
                  type="number"
                />
              </FlexBox>
              <TextInput label="recieverCountry" name="country" type="text" />
            </FlexBox>

            <TextInput
              type="date"
              label="invoice date"
              name="createdate"
              readOnly
              value={currentDate}
            />
            <TextInput type="date" label="due date" name="paymentdue" />
            <TextInput type="text" label="payment terms" name="paymentterms" />
            <TextInput
              type="text"
              label="project/decription"
              name="description"
            />
          </InputContainer>
        </fieldset>

        <fieldset className="itemList">
          <h2>Item List</h2>
          <InputContainer>
            <FlexBox $variant="secondary" id="itemInput">
              <TextInput name="name" label="item name" type="text" />
              <FlexBox>
                <TextInput name="quantity" label="QTY" type="number" />
                <TextInput name="price" label="price" type="number" />
                <TextInput name="total" label="total" type="number" />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="deleteBtn"
                >
                  <MdDelete size={32} color="var(--col-600)" />
                </button>
              </FlexBox>
            </FlexBox>
          </InputContainer>

          <VariableButton
            variant="btn-600"
            type="button"
            onHandle={handleClick}
          >
            Add Item
          </VariableButton>
        </fieldset>

        <FormControl />
      </StyledForm>
    </StyledFormContainer>
  );
};

export default NewInvoiceForm;
