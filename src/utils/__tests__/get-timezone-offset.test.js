import getTimezoneOffset from "../get-timezone-offset";

test("works for timezones that are valid", async () => {
  expect(await getTimezoneOffset("America/New_York")).toEqual(-300);
});

test("does not work for timezones that are not valid", async () => {
  try {
    await getTimezoneOffset("America/Foo_Bar");
    expect(true).toBe(false); // should not get here
  } catch (error) {
    expect(error).not.toBe(null);
  }
});
