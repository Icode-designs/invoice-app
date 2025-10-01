"use client";
import {
  InputContainer,
  StyledForm,
  StyledFormContainer,
} from "@/styles/components/NewInvoiceForm.styles";
import React, { useContext, useState, useEffect } from "react";
import TextInput from "./ui/TextInput";
import { FlexBox } from "@/styles/components/UI.styles";
import { FormContext } from "@/providers/FormProvider";
import { FaAngleLeft } from "react-icons/fa";
import { useMediaQuery } from "@/hooks/useMedia";
import VariableButton from "./ui/Button";
import { MdDelete } from "react-icons/md";
import FormControl from "./ui/FormControl";
import { UserContext } from "@/providers/UserProvider";
import Link from "next/link";

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
    items: [{ name: "", quantity: 1, total: null, price: null }],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index] = { ...items[index], [name]: value };
    setFormData((prev) => ({ ...prev, items }));
  };

  function removeItem(i: number) {
    if (formData.items.length > 1) {
      const items = formData.items.filter((_, index) => index !== i);
      setFormData((prev) => ({ ...prev, items }));
    }
  }

  function addItem() {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", quantity: 1, total: null, price: null },
      ],
    }));
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
              onChange={handleChange}
            />
            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="senderCity"
                  type="text"
                  value={formData.senderCity}
                  onChange={handleChange}
                />
                <TextInput
                  label="Post Code"
                  name="senderPostcode"
                  type="number"
                  value={formData.senderPostcode}
                  onChange={handleChange}
                />
              </FlexBox>
              <TextInput
                label="country"
                name="senderCountry"
                type="text"
                value={formData.senderCountry}
                onChange={handleChange}
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
              onChange={handleChange}
              required
            />
            <TextInput
              label="client's email"
              name="clientemail"
              type="email"
              value={formData.clientemail}
              onChange={handleChange}
              required
            />
            <TextInput
              label="street address"
              name="recieverAddress"
              type="text"
              value={formData.recieverAddress}
              onChange={handleChange}
              required
            />

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="recieverCity"
                  type="text"
                  value={formData.recieverCity}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Post Code"
                  name="recieverPostcode"
                  type="number"
                  value={formData.recieverPostcode}
                  onChange={handleChange}
                  required
                />
              </FlexBox>
              <TextInput
                label="recieverCountry"
                name="recieverCountry"
                type="text"
                value={formData.recieverCountry}
                onChange={handleChange}
                required
              />
            </FlexBox>

            <TextInput
              type="date"
              label="due date"
              name="paymentdue"
              value={formData.paymentdue}
              onChange={handleChange}
              required
            />
            <TextInput
              type="text"
              label="payment terms"
              name="paymentterms"
              value={formData.paymentterms}
              onChange={handleChange}
              required
            />
            <TextInput
              type="text"
              label="project/decription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </InputContainer>
        </fieldset>

        <fieldset className="itemList">
          <h2>Item List</h2>
          <InputContainer>
            {formData.items.map((item, i) => (
              <FlexBox key={i} $variant="secondary" id="itemInput">
                <TextInput
                  name="name"
                  label="item name"
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(i, e)}
                  required
                />
                <FlexBox>
                  <TextInput
                    name="quantity"
                    label="QTY"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(i, e)}
                    step={1}
                    required
                  />
                  <TextInput
                    name="price"
                    label="price"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(i, e)}
                    step={0.01}
                    required
                  />
                  <TextInput
                    name="total"
                    label="total"
                    type="number"
                    value={item.total}
                    onChange={(e) => handleItemChange(i, e)}
                    step={0.01}
                    required
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
