import { StyledInvoiceList } from "@/styles/components/List.style";
import ListCard from "./ui/ListCard";
import { LoaderBox } from "@/styles/components/UI.styles";
import EmptyInvoiceList from "./ui/EmptyInvoiceList";
import { InvoiceType } from "@/types/api/invoiceType";

const InvoiceList = ({
  displayInvoices,
  isLoading,
}: {
  displayInvoices: InvoiceType[];
  isLoading: boolean;
}) => {
  if (!isLoading && displayInvoices.length === 0) {
    return <EmptyInvoiceList />;
  }

  displayInvoices = [...displayInvoices].sort((a, b) => {
    return (
      new Date(b.createdate as string).getTime() -
      new Date(a.createdate as string).getTime()
    );
  });

  return (
    <StyledInvoiceList>
      {isLoading ? (
        <LoaderBox />
      ) : (
        displayInvoices.map((invoice) => (
          <ListCard invoice={invoice} key={invoice.id} />
        ))
      )}
    </StyledInvoiceList>
  );
};

export default InvoiceList;
