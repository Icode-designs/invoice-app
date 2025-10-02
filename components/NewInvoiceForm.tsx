"use client";
import {
  InputContainer,
  StyledForm,
  StyledFormContainer,
} from "@/styles/components/NewInvoiceForm.styles";
import React, { useContext, useState, useEffect } from "react";
import TextInput from "./ui/TextInput";
import { FlexBox, StyledTextInput } from "@/styles/components/UI.styles";
import { FormContext } from "@/providers/FormProvider";
import { FaAngleLeft } from "react-icons/fa";
import { useMediaQuery } from "@/hooks/useMedia";
import VariableButton from "./ui/Button";
import { MdDelete } from "react-icons/md";
import FormControl from "./ui/FormControl";
import { UserContext } from "@/providers/UserProvider";
import Link from "next/link";
import { Item } from "@/types/api/invoiceType";

const NewInvoiceForm = () => {
  const userCtx = useContext(UserContext);
  const formCtx = useContext(FormContext);
  const isLargeScreen = useMediaQuery(768);
  const Wrapper = isLargeScreen ? "h2" : "h3";

  const [formData, setFormData] = useState({
    senderAddress: "",
    senderCity: "",
    senderPostcode: "",
    senderCountry: "",
    clientname: "",
    clientemail: "",
    recieverAddress: "",
    recieverCity: "",
    recieverPostcode: "",
    recieverCountry: "",
    paymentdue: "",
    paymentterms: "",
    description: "",
    items: [{ name: "", quantity: "", total: "", price: "" }] as Item[],
  });

  useEffect(() => {
    if (userCtx?.userProfile) {
      setFormData((prev) => ({
        ...prev,
        senderAddress: userCtx.userProfile?.address.street || "",
        senderCity: userCtx.userProfile?.address.city || "",
        senderPostcode: userCtx.userProfile?.address.postCode || "",
        senderCountry: userCtx.userProfile?.address.country || "",
      }));
    }
  }, [userCtx?.userProfile]);

  if (!formCtx || !userCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { isOpen, toggleForm } = formCtx;

  function removeItem(i: number) {
    if (formData.items.length > 1) {
      const items = formData.items.filter((_, index) => index !== i);
      setFormData((prev) => ({ ...prev, items }));
    }
  }

  function addItem() {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: "", total: "", price: "" }],
    }));
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "quantity" | "price" | "name"
  ) {
    const rawValue = event.target.value;
    const value =
      field === "name" ? rawValue : rawValue === "" ? "" : parseFloat(rawValue);

    setFormData((prev) => {
      const updatedItems = [...prev.items];
      const currentItem = { ...updatedItems[index], [field]: value };

      if (field === "quantity" || field === "price") {
        const qty = Number(currentItem.quantity) || 0;
        const price = Number(currentItem.price) || 0;
        currentItem.total = qty * price;
      }

      updatedItems[index] = currentItem;
      return { ...prev, items: updatedItems };
    });
  }

  return (
    <StyledFormContainer $isOpen={isOpen}>
      <StyledForm>
        {!isLargeScreen && (
          <Link href="/" onClick={toggleForm}>
            <FlexBox>
              <FaAngleLeft className="icon" />
              <span> Go Back</span>
            </FlexBox>
          </Link>
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
              value={formData.senderAddress}
            />
            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="senderCity"
                  type="text"
                  value={formData.senderCity}
                />
                <TextInput
                  label="Post Code"
                  name="senderPostcode"
                  type="number"
                  value={formData.senderPostcode}
                />
              </FlexBox>
              <TextInput
                label="country"
                name="senderCountry"
                type="text"
                value={formData.senderCountry}
              />
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
              value={formData.clientname}
              required
            />
            <TextInput
              label="client's email"
              name="clientemail"
              type="email"
              value={formData.clientemail}
              required
            />
            <TextInput
              label="street address"
              name="recieverAddress"
              type="text"
              value={formData.recieverAddress}
              required
            />

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="recieverCity"
                  type="text"
                  value={formData.recieverCity}
                  required
                />
                <TextInput
                  label="Post Code"
                  name="recieverPostcode"
                  type="number"
                  value={formData.recieverPostcode}
                  required
                />
              </FlexBox>
              <TextInput
                label="recieverCountry"
                name="recieverCountry"
                type="text"
                value={formData.recieverCountry}
                required
              />
            </FlexBox>

            <TextInput
              type="date"
              label="due date"
              name="paymentdue"
              value={formData.paymentdue}
              required
            />
            <TextInput
              type="text"
              label="payment terms"
              name="paymentterms"
              value={formData.paymentterms}
              required
            />
            <TextInput
              type="text"
              label="project/decription"
              name="description"
              value={formData.description}
              required
            />
          </InputContainer>
        </fieldset>

        <fieldset className="itemList">
          <h2>Item List</h2>
          <InputContainer>
            {formData.items.map((item, i) => (
              <FlexBox key={i} $variant="secondary" id="itemInput">
                <StyledTextInput>
                  <label htmlFor="name">
                    <p>Item Name</p>
                  </label>
                  <input
                    type="text"
                    name="itemname[]"
                    step={1}
                    value={item.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event, i, "name")
                    }
                    required
                  />
                </StyledTextInput>

                <FlexBox>
                  <StyledTextInput>
                    <label htmlFor="quantity">
                      <p>QTY</p>
                    </label>
                    <input
                      type="number"
                      name="quantity[]"
                      step={1}
                      value={item.quantity as string}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event, i, "quantity")
                      }
                      required
                    />
                  </StyledTextInput>

                  <StyledTextInput>
                    <label htmlFor="price">
                      <p>Price</p>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price[]"
                      required
                      step={0.01}
                      value={item.price as string}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event, i, "price")
                      }
                    />
                  </StyledTextInput>

                  <TextInput
                    name="total[]"
                    label="total"
                    type="number"
                    value={item.total}
                    step={0.01}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="deleteBtn"
                    aria-label="Delete item"
                    disabled={formData.items.length === 1}
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
