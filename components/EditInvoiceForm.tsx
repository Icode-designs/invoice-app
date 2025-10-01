"use client";
import {
  InputContainer,
  StyledForm,
  StyledFormContainer,
} from "@/styles/components/NewInvoiceForm.styles";
import { FlexBox } from "@/styles/components/UI.styles";
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
  const [items, setItems] = useState(selectedInvoice.items);
  const isLargeScreen = useMediaQuery(768);
  const Wrapper = isLargeScreen ? "h2" : "h3";
  const formCtx = useContext(FormContext);
  const invoicesCtx = useContext(InvoicesContext);

  // Sync selectedInvoice to latest local state from context
  useEffect(() => {
    if (invoicesCtx) {
      const latestInvoice = invoicesCtx.getInvoice(
        selectedInvoice.id as string
      );
      if (latestInvoice) {
        setItems(latestInvoice.items);
      }
    }
  }, [invoicesCtx, selectedInvoice.id]);

  if (!formCtx) {
    return;
  }

  const { toggleForm } = formCtx;
  const createDate = new Date(selectedInvoice.createdate as string)
    .toISOString()
    .split("T")[0];

  function addItem() {
    setItems((prevItems) => [
      ...prevItems,
      { name: "", quantity: null, price: null, total: null },
    ]);
  }

  function removeItem(indexToRemove: number) {
    if (indexToRemove === 0) {
      return;
    }
    setItems(items.filter((_, index) => index !== indexToRemove));
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
              value={selectedInvoice.senderaddress.street}
            />
            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="senderCity"
                  type="text"
                  value={selectedInvoice.senderaddress.city}
                />
                <TextInput
                  label="Post Code"
                  name="senderPostcode"
                  type="number"
                  value={selectedInvoice.senderaddress.postCode}
                />
              </FlexBox>
              <TextInput
                label="country"
                name="senderCountry"
                type="text"
                value={selectedInvoice.senderaddress.country}
              />
            </FlexBox>
          </InputContainer>
        </fieldset>
        <input
          type="hidden"
          name="status"
          value={selectedInvoice.status || ""}
        />

        <fieldset>
          <h3>bill to</h3>
          <InputContainer>
            <TextInput
              label="client's name"
              name="clientname"
              type="text"
              value={selectedInvoice.clientname}
              required
            />
            <TextInput
              label="client's email"
              name="clientemail"
              type="email"
              required
              value={selectedInvoice.clientemail}
            />
            <TextInput
              label="street address"
              name="recieverAddress"
              type="text"
              required
              value={selectedInvoice.clientaddress.street}
            />

            <FlexBox $variant="secondary">
              <FlexBox>
                <TextInput
                  label="City"
                  name="recieverCity"
                  type="text"
                  required
                  value={selectedInvoice.clientaddress.city}
                />
                <TextInput
                  label="Post Code"
                  name="recieverPostcode"
                  type="number"
                  required
                  value={selectedInvoice.clientaddress.postCode}
                />
              </FlexBox>
              <TextInput
                label="recieverCountry"
                name="recieverCountry"
                type="text"
                required
                value={selectedInvoice.clientaddress.country}
              />
            </FlexBox>

            <TextInput
              type="date"
              label="invoice date"
              name="createdate"
              value={createDate}
              readOnly
            />
            <TextInput
              type="date"
              label="due date"
              name="paymentdue"
              required
              value={selectedInvoice.paymentdue}
            />
            <TextInput
              type="text"
              label="payment terms"
              name="paymentterms"
              required
              value={selectedInvoice.paymentterms}
            />
            <TextInput
              type="text"
              label="project/decription"
              name="description"
              required
              value={selectedInvoice.description}
            />
          </InputContainer>
        </fieldset>

        <fieldset className="itemList">
          <h2>Item List</h2>
          <InputContainer>
            {items.map((item, index) => (
              <FlexBox key={index} $variant="secondary" id="itemInput">
                <TextInput
                  name="itemname[]"
                  label="item name"
                  type="text"
                  required
                  value={item.name}
                />
                <FlexBox>
                  <TextInput
                    name="quantity[]"
                    label="QTY"
                    type="number"
                    step={1}
                    required
                    value={item.quantity}
                  />
                  <TextInput
                    name="price[]"
                    label="price"
                    type="number"
                    step={0.01}
                    required
                    value={item.price}
                  />
                  <TextInput
                    name="total[]"
                    label="total"
                    type="number"
                    step={0.01}
                    required
                    value={item.total}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
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

        <EditFormControl
          invoiceId={selectedInvoice.id}
          setSelectedInvoice={setSelectedInvoice}
        />
      </StyledForm>
    </StyledFormContainer>
  );
};

export default EditInvoiceForm;
