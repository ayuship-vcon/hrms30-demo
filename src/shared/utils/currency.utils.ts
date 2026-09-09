export const formatCurrency = (
  amount: number | string | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '$0.00';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(Number(amount));
};
