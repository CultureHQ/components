import { SelectOption } from "../typings";

const makeSegments = (value: string) => (
  value.toLowerCase().split(" ").filter(Boolean)
);

const fuzzyFilter = (
  options: SelectOption[], matchable: string, allMatch = false
): SelectOption[] => {
  if (!matchable) {
    return options;
  }

  const terms = makeSegments(matchable);

  return options.filter(
    ({ label }) => {
      if (allMatch) {
        return terms.every(term => (label.toLowerCase().includes(term)));
      }
      return makeSegments(label).some(segment => (
        terms.some(term => segment.startsWith(term) || segment.startsWith(`#${term}`))
      ));
    }
  );
};

export default fuzzyFilter;
