export function getValidDate(date) {
  let validDate;

  // yyyy-mm-dd format causing issues in Safari
  const invalidFormatRX = /\d{4}-\d\d?-\d\d?/;

  if (invalidFormatRX.test(date)) {
    // convert to [yyyy, mm, dd] and adjust the month
    validDate = date.split("-");
    validDate[1] = parseInt(validDate[1]) - 1;
  } else {
    validDate = [date];
  }

  return validDate;
}
