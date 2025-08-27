import InvoiceList from "@/components/InvoiceList";
import ListHeader from "@/components/ListHeader";
import { MainWrapper } from "@/styles/components/UI.styles";

export default function Home() {
  return (
    <MainWrapper>
      <ListHeader />
      <InvoiceList />
    </MainWrapper>
  );
}
