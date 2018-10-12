import fs from "fs";
import path from "path";

const FILEPATH = path.join(__dirname, "image.jpg");

const type = path.extname(FILEPATH).slice(1);
const base64 = fs.readFileSync(FILEPATH).toString("base64");

export default `data:image/${type};base64,${base64}`;
