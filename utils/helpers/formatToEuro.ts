function formatToEuro(amount: number) {
  const formatted = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

  return formatted;
}

export default formatToEuro;
