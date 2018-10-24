const padLeft = number => `0${number}`.slice(-2);

const DateTimeFieldDisplay = ({ value }) => {
  if (!value) {
    return null;
  }

  const components = [
    value.getFullYear(),
    "-",
    padLeft(value.getMonth() + 1),
    "-",
    padLeft(value.getDate()),
    " ",
    value.getHours() % 12 || 12,
    ":",
    padLeft(value.getMinutes()),
    " ",
    value.getHours() < 12 ? "AM" : "PM"
  ];

  return components.join("");
};

export default DateTimeFieldDisplay;
