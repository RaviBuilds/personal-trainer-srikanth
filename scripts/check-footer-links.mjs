// Verifies that every internal footer link points at a real route under app/ and, for "/#id" links, that the
// id exists in the source. Run with `npm run check:footer`; exits non-zero on any broken link.
// Needs Node 22.6+ (loads the TypeScript link list directly; footer-nav.ts has no imports on purpose).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { buildFooterNavGroups } from "../src/lib/footer-nav.ts";

const root = fileURLToPath(new URL("..", import.meta.url));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// Every app/**/page.tsx becomes a list of path segments; "[slug]" segments are dynamic.
const routes = walk(join(root, "app"))
  .filter((file) => file.endsWith(`${sep}page.tsx`))
  .map((file) => ({ file, segments: relative(join(root, "app"), join(file, "..")).split(sep).filter(Boolean) }));

const sourceFiles = ["app", "components", "src"].flatMap((dir) => walk(join(root, dir))).filter((f) => /\.(tsx?|css)$/.test(f));
const sources = sourceFiles.map((f) => readFileSync(f, "utf8")).join("\n");

function matchRoute(pathname) {
  const wanted = pathname.split("/").filter(Boolean);
  return routes.find(({ segments }) => segments.length === wanted.length && segments.every((seg, i) => /^\[.+\]$/.test(seg) || seg === wanted[i]));
}

const failures = [];
let checked = 0;

for (const group of buildFooterNavGroups("Srikanth")) {
  for (const { label, href } of group.links) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    checked += 1;
    const [pathname, hash] = href.split("#");
    const route = matchRoute(pathname || "/");
    if (!route) {
      failures.push(`${group.title} > "${label}": no page for ${pathname || "/"}`);
      continue;
    }
    // A dynamic route matches any segment, so also require the slug to be defined in that page.
    const dynamic = route.segments.map((seg, i) => (/^\[.+\]$/.test(seg) ? pathname.split("/").filter(Boolean)[i] : null)).filter(Boolean);
    // Dynamic slugs may be defined in the page itself or in the guides content file it reads.
    const pageSource = readFileSync(route.file, "utf8") + "\n" + readFileSync(join(root, "src", "lib", "guides-content.ts"), "utf8");
    for (const slug of dynamic) {
      if (!pageSource.includes(`slug: "${slug}"`)) failures.push(`${group.title} > "${label}": ${slug} is not defined in ${relative(root, route.file)}`);
    }
    if (hash && (pathname || "/") === "/") {
      const idPattern = new RegExp(`(?:\\bid|anchorId)\\s*[=:]\\s*\\{?["']${hash}["']`);
      if (!idPattern.test(sources)) failures.push(`${group.title} > "${label}": no element with id "${hash}" found`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Footer link check failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Footer link check passed: ${checked} internal links resolve to routes or section ids (${routes.length} page files).`);
