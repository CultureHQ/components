export const TEXT = `
  Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that
  they were perfectly normal, thank you very much. They were the last people
  you'd expect to be involved in anything strange or mysterious, because they
  just didn't hold with such nonsense.
`;

// eslint-disable-next-line no-alert
export const onAccept = () => alert("Accepted!");

// eslint-disable-next-line no-alert
export const onClick = () => alert("Clicked!");

export const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000));
