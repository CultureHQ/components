import fs from "fs";
import path from "path";

import getRotation from "../../src/utils/get-rotation";

fs.readdirSync(path.join(__dirname, "images")).forEach(filename => {
  const [name] = filename.split(".");

  test(`rotation ${name}`, async () => {
    const file = fs.readFileSync(path.join(__dirname, "images", filename));
    const rotation = await getRotation(new Blob([file]));

    expect(rotation).toEqual(parseInt(name, 10));
  });
});
