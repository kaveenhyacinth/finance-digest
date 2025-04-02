export function secondsToMillis(date) {
  return date * 1000;
}

export function formatToISODateString(date) {
  const dateObj = new Date(date);
  return dateObj.toISOString();
}