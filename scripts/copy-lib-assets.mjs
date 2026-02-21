import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve("src");
const distRoot = path.resolve("dist");
const cssDirectories = [
  path.join(sourceRoot, "components"),
  path.join(sourceRoot, "lib"),
];

async function copyCssModules(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const sourcePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await copyCssModules(sourcePath);
      continue;
    }

    if (!entry.name.endsWith(".module.css")) continue;

    const relativePath = path.relative(sourceRoot, sourcePath);
    const destinationPath = path.join(distRoot, relativePath);
    await mkdir(path.dirname(destinationPath), { recursive: true });
    await cp(sourcePath, destinationPath);
  }
}

for (const directory of cssDirectories) {
  await copyCssModules(directory);
}
