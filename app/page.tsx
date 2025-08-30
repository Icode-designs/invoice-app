import InvoiceList from "@/components/InvoiceList";
import ListHeader from "@/components/ListHeader";
import NewInvoiceForm from "@/components/NewInvoiceForm";
import FormContextProvider from "@/providers/FormProvider";
import { FilterContextProvider } from "@/providers/invoicesProvider";
import { MainWrapper } from "@/styles/components/UI.styles";

export default function Home() {
  return (
    <FormContextProvider>
      <NewInvoiceForm />
      <MainWrapper>
        <FilterContextProvider>
          <ListHeader />
          <InvoiceList />
        </FilterContextProvider>
      </MainWrapper>
    </FormContextProvider>
  );
}
