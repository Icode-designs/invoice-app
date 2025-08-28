import InvoiceList from "@/components/InvoiceList";
import ListHeader from "@/components/ListHeader";
import { FilterContextProvider } from "@/providers/invoicesProvider";
import { MainWrapper } from "@/styles/components/UI.styles";
export default function Home() {
  return (
    <MainWrapper>
      <FilterContextProvider>
        <ListHeader />
        <InvoiceList />
      </FilterContextProvider>
    </MainWrapper>
  );
}
