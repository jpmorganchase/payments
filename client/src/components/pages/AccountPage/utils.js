export function gatherCurrencySymbol(currencyCode) {
  switch (currencyCode) {
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    default:
      return '*';
  }
}
