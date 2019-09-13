const fuzzyFilter = (options, matchable) => {
  if (!matchable) {
    return options;
  }

  const terms = matchable.toLowerCase().split(" ").filter(Boolean);

  return options.filter(
    ({ label }) => label.toLowerCase().split(" ").filter(Boolean).some(segment => (
      terms.some(term => segment.startsWith(term))
    ))
  );
};

export default fuzzyFilter;
