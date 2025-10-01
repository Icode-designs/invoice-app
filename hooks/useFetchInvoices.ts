import { InvoiceType } from "@/types/api/invoiceType";
import { getInvoices } from "@/utils/actions/getUserInvoices";
import { useEffect, useState, useRef } from "react";

const useFetchInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    setIsLoading(true);
    setFetchErr(null);

    async function fetchInvoices() {
      try {
        const { data, error } = await getInvoices();

        if (!isMountedRef.current) return;

        if (error) {
          throw error;
        }

        setInvoices(data || []);
      } catch (err) {
        if (!isMountedRef.current) return;

        if (err instanceof Error) {
          setFetchErr(err.message);
        } else {
          setFetchErr("An unknown error occurred");
        }
        setInvoices([]);
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }

    fetchInvoices();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return { invoices, isLoading, fetchErr };
};

export default useFetchInvoices;
