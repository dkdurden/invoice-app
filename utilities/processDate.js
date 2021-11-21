/**
 * Take in a date and convert it to the format 01 Jan 1999
 * @param {*} date A date to be passed to Date()
 * @returns A new date of the format: day month year
 */
export function processDate(date) {
  const [, month, day, year] = new Date(date).toDateString().split(" ");

  return `${day} ${month} ${year}`;
}
