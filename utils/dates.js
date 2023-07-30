/*
 Changes format data: DD/MM/YYYY to "Month DD,YYYY"
*/
export function changeDateFormat(date) {
  const [day, month, year] = date
    .split("/")
    .map((dateElement) => Number(dateElement));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[month - 1]} ${day}, ${year}`;
}

/* Extract dates format 
    DD/MM/YYYY or 
    D/MM/YYYY  or 
    D/M/YYYY   or 
    DD/M/YYY
*/
export function extractDates(inputString) {
  const regex = /(\d{1,2})\/\d{1,2}\/\d{4}/g;
  return inputString.match(regex)?.join(", ") ?? "";
}
