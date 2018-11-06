import fs from "fs";
import path from "path";

import readImage, { ROTATIONS } from "../../src/utils/read-image";

let imageOnload = null;

beforeAll(() => {
  Object.defineProperty(Image.prototype, "onload", {
    get() {
      return this.onloadCallback;
    },
    set(callback) {
      imageOnload = callback;
      this.onloadCallback = callback;
    },
  });
});

fs.readdirSync(path.join(__dirname, "images")).forEach(filename => {
  const [name] = filename.split(".");

  test(`rotation ${name}`, async () => {
    const filepath = path.join(__dirname, "images", filename);
    const buffer = fs.readFileSync(filepath);

    const file = new File([buffer], filename);
    const blob = new Blob([buffer]);

    const promise = readImage(file, blob, 200);
    imageOnload();

    const { styles } = await promise;
    const { transform, transformOrigin } = ROTATIONS[parseInt(name, 10)];

    expect(styles.transform).toEqual(transform);
    expect(styles.transformOrigin).toEqual(transformOrigin);
  });
});

test("rotation for a .png", async () => {
  const filepath = path.join(__dirname, "..", "..", "docs", "culture.png");
  const buffer = fs.readFileSync(filepath);

  const file = new File([buffer], "culturehq.png");
  const blob = new Blob([buffer]);

  const promise = readImage(file, blob, 200);
  imageOnload();

  const { styles } = await promise;
  expect(styles.transform).toBe(undefined);
});
