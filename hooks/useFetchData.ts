import { supabase } from "@/backend/supaBase";
import { InvoiceType } from "@/types/api/invoiceType";
import { useEffect, useState } from "react";

const useFetch = (location: string) => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from("invoices").select("*");
        if (error) throw error;
        setInvoices(data || []);
      } catch (err) {
        if (err instanceof Error) {
          setFetchErr(err.message);
        } else {
          setFetchErr("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvoices();
  }, [location]);

  return { invoices, isLoading, fetchErr };
};

export default useFetch;
