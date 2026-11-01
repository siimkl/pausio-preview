import { copyFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "out");

async function flattenRouteData(routeDirectory, dataDirectory) {
  const entries = await readdir(dataDirectory, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(dataDirectory, entry.name);
    if (entry.isDirectory()) {
      await flattenRouteData(routeDirectory, source);
      continue;
    }

    const flattenedName = path.relative(routeDirectory, source).split(path.sep).join(".");
    await copyFile(source, path.join(routeDirectory, flattenedName));
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const child = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flattenRouteData(directory, child);
    } else if (entry.name !== "_next") {
      await walk(child);
    }
  }
}

await walk(output);
await writeFile(path.join(output, ".nojekyll"), "");
console.log("Finalized static route data for GitHub Pages.");
