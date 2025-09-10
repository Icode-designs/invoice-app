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
import { Item } from "@/types/api/invoiceType";

const NewInvoiceForm = () => {
  const formCtx = useContext(FormContext);
  const isLargeScreen = useMediaQuery(768);
  const Wrapper = isLargeScreen ? "h2" : "h3";
  const [items, setItems] = useState<Item[]>([
    { name: "", quantity: 1, total: null, price: null },
  ]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5); // "HH:mm"
    setCurrentTime(timeString);
  }, []);

  // Set the current date on the client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
  }, []);

  if (!formCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { isOpen, toggleForm } = formCtx;

  function removeItem(i: number) {
    if (i === 0) {
      return;
    }

    setItems(items.filter((_, index) => index !== i));
  }

  function addItem() {
    setItems((prevItems) => [
      ...prevItems,
      { name: "", quantity: 1, total: null, price: null },
    ]);
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
        <p>(fieds with * on their label are required)</p>

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
            <TextInput
              label="client's name"
              name="clientname"
              type="text"
              required
            />
            <TextInput
              label="client's email"
              name="clientemail"
              type="email"
              required
            />
            <TextInput
              label="street address"
              name="recieverAddress"
              type="text"
              required
            />

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="recieverCity"
                  type="text"
                  required
                />
                <TextInput
                  label="Post Code"
                  name="recieverPostcode"
                  type="number"
                  required
                />
              </FlexBox>
              <TextInput
                label="recieverCountry"
                name="recieverCountry"
                type="text"
                required
              />
            </FlexBox>

            <TextInput
              type="date"
              label="due date"
              name="paymentdue"
              required
            />
            <TextInput
              type="text"
              label="payment terms"
              name="paymentterms"
              required
            />
            <TextInput
              type="text"
              label="project/decription"
              name="description"
              required
            />
          </InputContainer>
        </fieldset>

        <fieldset className="itemList">
          <h2>Item List</h2>
          <InputContainer>
            {items.map((item, i) => (
              <FlexBox key={i} $variant="secondary" id="itemInput">
                <TextInput name="name" label="item name" type="text" required />
                <FlexBox>
                  <TextInput
                    name="quantity"
                    label="QTY"
                    type="number"
                    value={item.quantity}
                    step={1}
                    required
                  />
                  <TextInput
                    name="price"
                    label="price"
                    type="number"
                    step={0.01}
                    required
                  />
                  <TextInput
                    name="total"
                    label="total"
                    type="number"
                    step={0.01}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="deleteBtn"
                  >
                    <MdDelete size={32} color="var(--col-600)" />
                  </button>
                </FlexBox>
              </FlexBox>
            ))}
          </InputContainer>

          <VariableButton variant="btn-600" type="button" onHandle={addItem}>
            Add Item
          </VariableButton>
        </fieldset>

        <FormControl />
      </StyledForm>
    </StyledFormContainer>
  );
};

export default NewInvoiceForm;
