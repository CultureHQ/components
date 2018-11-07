import getHumanSize from "../get-human-size";

const SIZES = [
  [512, "512 bytes"],
  [524288, "512 KB"],
  [536870912, "512 MB"],
  [549755813888, "512 GB"],
  [562949953421312, "562949953421312 bytes"]
];

test.each(SIZES)("sizes shrink appropriately at %i", (size, expected) => {
  expect(getHumanSize(size)).toEqual(expected);
});
