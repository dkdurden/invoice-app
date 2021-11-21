/**
 * Take in a currency amount and format it with NumberFormat
 * @param {*} total A total currency amount
 * @returns A formatted currency amount
 */
export function processCurrency(total) {
  const newTotal = new Intl.NumberFormat("en-EN", {
    minimumFractionDigits: 2,
  }).format(total);

  return newTotal;
}
