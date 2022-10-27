// Keeping this as any as any object can be checked
export function isEmptyObject(value: any) {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
}

export function formatDate(date: Date): string {
  let hours: number = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm: string = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return (
    `${date.getMonth()
    + 1
    }/${
      date.getDate()
    }/${
      date.getFullYear()
    }  ${
      strTime}`
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
