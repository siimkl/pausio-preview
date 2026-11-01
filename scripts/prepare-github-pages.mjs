import { copyFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await copyFile(path.join(root, "deploy", "github-pages", "layout.tsx"), path.join(root, "app", "layout.tsx"));
await copyFile(path.join(root, "deploy", "github-pages", "page.tsx"), path.join(root, "app", "page.tsx"));

for (const target of ["proxy.ts", "app/api", "app/admin", "app/launch"]) {
  await rm(path.join(root, target), { recursive: true, force: true });
}

console.log("Prepared the static GitHub Pages source tree.");
