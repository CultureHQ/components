import * as fs from "fs";
import * as path from "path";

const FILEPATH = path.join(__dirname, "image.jpg");
const base64 = fs.readFileSync(FILEPATH).toString("base64");

export default `data:image/jpeg;base64,${base64}`;
