const formatDate = date => {
  const selectedDate = new Date(date);
  const dateStr = selectedDate.toISOString().split("T")[0];
  const hour = selectedDate.getHours();
  const min = selectedDate.getMinutes();

  return `${dateStr} at ${hour}:${min}`;
};

export default formatDate;
