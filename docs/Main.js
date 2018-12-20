const fs = require("fs");
const path = require("path");

const components = {};

const findComponents = dir => (
  fs.readdirSync(dir).forEach(file => {
    const absolute = path.join(dir, file);

    if (fs.lstatSync(absolute).isDirectory()) {
      findComponents(absolute);
    } else if (path.extname(file) === ".mdx") {
      const importPath = absolute.replace(__dirname.replace("/docs", ""), "..").replace(".mdx", "");
      components[path.basename(importPath)] = importPath;
    }
  })
);

findComponents(path.join(__dirname, "..", "src", "components"));

module.exports = `
  ${Object.keys(components).map(component => (
    `import ${component} from "${components[component]}";`
  )).join("\n")}

  const Main = () => (
    <main>
      ${Object.keys(components).sort().map(component => `<${component} />`).join("\n")}
    </main>
  );
`;
