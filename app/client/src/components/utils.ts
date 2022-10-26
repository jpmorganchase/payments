// Keeping this as any as any object can be checked
export function isEmptyObject(value: any) {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
}

export function formatDate(date: Date): string {
  var hours: number = date.getHours();
  var minutes: string | number = date.getMinutes();
  var ampm: string = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (
    date.getMonth() +
    1 +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    '  ' +
    strTime
  );
}

export function gatherCurrencySymbol(currencyCode: string): string {
  switch (currencyCode) {
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    default:
      return '*';
  }
}

