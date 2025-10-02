"use client";
import {
  InputContainer,
  StyledForm,
  StyledFormContainer,
} from "@/styles/components/NewInvoiceForm.styles";
import { FlexBox, StyledTextInput } from "@/styles/components/UI.styles";
import { FaAngleLeft } from "react-icons/fa";
import TextInput from "./ui/TextInput";
import { MdDelete } from "react-icons/md";
import VariableButton from "./ui/Button";
import { useMediaQuery } from "@/hooks/useMedia";
import { InvoiceType } from "@/types/api/invoiceType";
import EditFormControl from "./ui/EditInvoiceControl";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "@/providers/FormProvider";
import { InvoicesContext } from "@/providers/invoicesProvider";

interface EditInvoiceType {
  isOpen: boolean;
  selectedInvoice: InvoiceType;
  setSelectedInvoice: React.Dispatch<
    React.SetStateAction<InvoiceType | undefined>
  >;
}

const EditInvoiceForm = ({
  isOpen,
  selectedInvoice,
  setSelectedInvoice,
}: EditInvoiceType) => {
  const [formData, setFormData] = useState(selectedInvoice);

  const isLargeScreen = useMediaQuery(768);
  const Wrapper = isLargeScreen ? "h2" : "h3";
  const formCtx = useContext(FormContext);

  // Sync selectedInvoice to latest local state from context

  if (!formCtx) {
    return;
  }

  const { toggleForm } = formCtx;

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
          <button onClick={toggleForm}>
            <FlexBox>
              <FaAngleLeft className="icon" />
              <span> Go Back</span>
            </FlexBox>
          </button>
        )}
        <Wrapper>Edit Form</Wrapper>
        <p>(fieds with * on their label are required)</p>

        <fieldset>
          <h3>bill form</h3>

          <InputContainer>
            <TextInput
              label="Street Address"
              name="senderAddress"
              type="text"
              value={formData.senderaddress.street}
            />
            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="senderCity"
                  type="text"
                  value={formData.senderaddress.city}
                />
                <TextInput
                  label="Post Code"
                  name="senderPostcode"
                  type="number"
                  value={formData.senderaddress.postCode}
                />
              </FlexBox>
              <TextInput
                label="country"
                name="senderCountry"
                type="text"
                value={formData.senderaddress.country}
              />
            </FlexBox>
          </InputContainer>
        </fieldset>
        <input type="hidden" name="status" value={formData.status || ""} />

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
              required
              value={formData.clientemail}
            />
            <TextInput
              label="street address"
              name="recieverAddress"
              type="text"
              required
              value={formData.clientaddress.street}
            />

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="recieverCity"
                  type="text"
                  required
                  value={formData.clientaddress.city}
                />
                <TextInput
                  label="Post Code"
                  name="recieverPostcode"
                  type="number"
                  required
                  value={formData.clientaddress.postCode}
                />
              </FlexBox>
              <TextInput
                label="recieverCountry"
                name="recieverCountry"
                type="text"
                required
                value={formData.clientaddress.country}
              />
            </FlexBox>

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  type="date"
                  label="invoice date"
                  name="createdate"
                  value={formData.createdate}
                  readOnly
                />
                <TextInput
                  type="date"
                  label="due date"
                  name="paymentdue"
                  required
                  value={formData.paymentdue}
                />
              </FlexBox>
              <TextInput
                type="number"
                label="payment terms"
                name="paymentterms"
                required
                value={formData.paymentterms}
              />
            </FlexBox>
            <TextInput
              type="text"
              label="project/decription"
              name="description"
              required
              value={formData.description}
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

        <EditFormControl
          invoiceId={formData.id}
          setSelectedInvoice={setSelectedInvoice}
        />
      </StyledForm>
    </StyledFormContainer>
  );
};

export default EditInvoiceForm;
