"use client";
import EditInvoiceForm from "@/components/EditInvoiceForm";
import DialogBox, { DialogBoxHandle } from "@/components/ui/DialogBox";
import InvoiceBtn from "@/components/ui/InvoiceBtn";
import { useMediaQuery } from "@/hooks/useMedia";
import { FormContext } from "@/providers/FormProvider";
import { InvoicesContext } from "@/providers/invoicesProvider";
import { StatusBox } from "@/styles/components/List.style";
import {
  FlexBox,
  GridBox,
  LoaderBox,
  StyledAddressBox,
  StyledCard,
  StyledTable,
  TotalBox,
} from "@/styles/components/UI.styles";
import { InvoiceType } from "@/types/api/invoiceType";
import { getInvoice } from "@/utils/actions/getUserInvoices";
import formatToEuro from "@/utils/helpers/formatToEuro";
import { useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { LuHash } from "react-icons/lu";

const InvoiceInfo = ({ params }: { params: Promise<{ id: string }> }) => {
  const dialogRef = useRef<DialogBoxHandle>(null);
  const formCtx = useContext(FormContext);
  const [selectedInvoice, setSelectedInvoice] = useState<
    InvoiceType | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const { id } = use(params);
  const router = useRouter();
  const isLargeScreen = useMediaQuery(768);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const { data } = await getInvoice(id);
        setSelectedInvoice(data);
        setIsLoading(false);
      } catch (error) {
        setFetchErr(true);
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (!formCtx) {
    // Safety check if component is ever used outside provider
    return null;
  }

  const { isOpen } = formCtx;

  function handleBack() {
    router.back();
  }

  const openDialog = () => {
    dialogRef.current?.open();
  };

  if (isLoading) {
    return (
      <main>
        <LoaderBox />
      </main>
    );
  }

  if (fetchErr && !isLoading) {
    return (
      <main>
        <h3>Error getting invoice</h3>
      </main>
    );
  }

  if (!selectedInvoice) {
    return (
      <main>
        <h3>Invoice not found</h3>
        <p>No invoice found with ID: {id}</p>
      </main>
    );
  }

  const createDate = new Date(selectedInvoice.createdate as string)
    .toISOString()
    .split("T")[0];

  return (
    <>
      <EditInvoiceForm
        isOpen={isOpen}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
      />
      <DialogBox id={selectedInvoice.id as string} ref={dialogRef} />
      <main>
        <button onClick={handleBack}>
          <FlexBox>
            <FaAngleLeft className="icon" />
            <p>{isLargeScreen && "Go"} Back</p>
          </FlexBox>
        </button>
        <StyledCard>
          <FlexBox $justify={isLargeScreen ? "space-between" : undefined}>
            <FlexBox $justify={!isLargeScreen ? "space-between" : undefined}>
              <p>Status</p>

              {/* Todo: Display Updated status Imediately it is updated */}
              <StatusBox className={selectedInvoice.status || ""}>
                <GoDotFill size={12} />
                {selectedInvoice.status}
              </StatusBox>
            </FlexBox>
            {isLargeScreen && (
              <InvoiceBtn
                id={selectedInvoice.id as string}
                openDialog={openDialog}
                status={selectedInvoice.status}
                setSelectedInvoice={setSelectedInvoice}
              />
            )}
          </FlexBox>
        </StyledCard>
        <StyledCard $display="grid">
          <FlexBox
            $variant="secondary"
            $justify={isLargeScreen ? "space-between" : undefined}
            $align="start"
          >
            <FlexBox $noGap>
              <p>
                <LuHash />
              </p>
              <h3>{selectedInvoice.id}</h3>
            </FlexBox>
            <StyledAddressBox $textAlign={isLargeScreen ? "right" : undefined}>
              <p>{selectedInvoice.senderaddress.street}</p>
              <p>{selectedInvoice.senderaddress.city}</p>
              <p>{selectedInvoice.senderaddress.postCode}</p>
              <p>{selectedInvoice.senderaddress.country}</p>
            </StyledAddressBox>
          </FlexBox>

          <GridBox $gap={32}>
            <GridBox $gap={32}>
              <GridBox>
                <p>invoice Date</p>
                <h3>{createDate}</h3>
              </GridBox>
              <GridBox>
                <p>Payment Date</p>
                <h3>{selectedInvoice.paymentdue}</h3>
              </GridBox>
            </GridBox>

            <StyledAddressBox>
              <GridBox>
                <p>Bill To</p>
                <div>
                  <h3>{selectedInvoice.clientname}</h3>
                  <p>{selectedInvoice.clientaddress.street}</p>
                  <p>{selectedInvoice.clientaddress.city}</p>
                  <p>{selectedInvoice.clientaddress.postCode}</p>
                  <p>{selectedInvoice.clientaddress.country}</p>
                </div>
              </GridBox>
            </StyledAddressBox>

            <GridBox>
              <p>Sent to</p>
              <h3>{selectedInvoice.clientemail}</h3>
            </GridBox>
          </GridBox>
          <div>
            <StyledTable>
              {isLargeScreen && (
                <thead>
                  <tr>
                    <th>
                      <p>Item Name</p>
                    </th>
                    <th>
                      <p>QTY.</p>
                    </th>
                    <th>
                      <p>Price</p>
                    </th>
                    <th>
                      <p>Total</p>
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {selectedInvoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <h3>{item.name}</h3>
                      {!isLargeScreen && (
                        <p>
                          {item.quantity}X{item.price}
                        </p>
                      )}
                    </td>
                    {isLargeScreen && (
                      <td>
                        <h3>{item.quantity}</h3>
                      </td>
                    )}
                    {isLargeScreen && (
                      <td>
                        <h3>{item.price}</h3>
                      </td>
                    )}
                    <td>
                      <h3>{item.total}</h3>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
            <TotalBox>
              <FlexBox $justify="space-between">
                <p>Amount Due</p>

                <h2>{formatToEuro(selectedInvoice.total)}</h2>
              </FlexBox>
            </TotalBox>
          </div>
        </StyledCard>
        {!isLargeScreen && (
          <InvoiceBtn
            id={selectedInvoice.id as string}
            openDialog={openDialog}
            status={selectedInvoice.status}
            setSelectedInvoice={setSelectedInvoice}
          />
        )}
      </main>
    </>
  );
};

export default InvoiceInfo;
