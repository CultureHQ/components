const getTimezoneOffset = name => import("../timezones.json").then(module => {
  const match = module.default.find(timezone => name === timezone.value);

  if (!match) {
    throw new Error(`Could not find timezone named ${name}`);
  }

  return match.offset;
});

export default getTimezoneOffset;
