export const numberToCurrency = (number, currency) => {
  return new Intl.NumberFormat('de-DE').format(number) + '₫';
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('de-DE').format(number);
};

export function kFormatter(num) {
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k').replace(
        '.',
        ','
      )
    : Math.sign(num) * Math.abs(num);
}
