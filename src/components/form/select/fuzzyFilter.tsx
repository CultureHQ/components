import { SelectOption } from "../typings";

const makeSegments = (value: string) => (
  value.toLowerCase().split(" ").filter(Boolean)
);

const fuzzyFilter = (options: SelectOption[], matchable: string): SelectOption[] => {
  if (!matchable) {
    return options;
  }

  const terms = makeSegments(matchable);

  return options.filter(
    ({ label }) => makeSegments(label).some(segment => (
      terms.some(term => segment.startsWith(term))
    ))
  );
};

export default fuzzyFilter;
