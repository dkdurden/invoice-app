import { getValidDate } from "./getValidDate";

/**
 * Take in a date and convert it to the format 'DD MMM YYYY' or 'MMM YYYY'
 * @param {*} date A date to be passed to Date()
 * @param {*} includeDay A boolean to specify whether or not to include the day
 * @returns A new date of the format: (DD)? MMM YYYY
 */
export function processDate(date, includeDay = true) {
  const validDate = getValidDate(date);

  const [, month, day, year] = new Date(...validDate).toDateString().split(" ");

  const dateString = includeDay
    ? `${day} ${month} ${year}`
    : `${month} ${year}`;

  return dateString;
}
