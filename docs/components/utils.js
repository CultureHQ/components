export const TEXT = `
  Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that
  they were perfectly normal, thank you very much. They were the last people
  you'd expect to be involved in anything strange or mysterious, because they
  just didn't hold with such nonsense.
`;

export const OPTIONS = [
  { label: "The Sorcerer's Stone", value: "The Sorcerer's Stone" },
  { label: "The Chamber of Secrets", value: "The Chamber of Secrets" },
  { label: "The Prisoner of Azkaban", value: "The Prisoner of Azkaban" },
  { label: "The Goblet of Fire", value: "The Goblet of Fire" },
  { label: "The Order of the Phoenix", value: "The Order of the Phoenix" },
  { label: "The Half-Blood Prince", value: "The Half-Blood Prince" },
  { label: "The Deathly Hallows", value: "The Deathly Hallows" }
];

// eslint-disable-next-line no-alert
export const onAccept = () => alert("Accepted!");

// eslint-disable-next-line no-alert
export const onClick = () => alert("Clicked!");

export const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000));
