export function isEmptyObject(value) {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
}

export function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
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

