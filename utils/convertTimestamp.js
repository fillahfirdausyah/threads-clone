export const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const oneHourAgo = new Date(date.getTime() - 3600000);

  const formattedDate = oneHourAgo.toLocaleString('en-US', {
    hour12: false,
  });

  return formattedDate;
};
