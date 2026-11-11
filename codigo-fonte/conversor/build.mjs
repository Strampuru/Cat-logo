const esbuild = (await import((process.env.TOOLS || "/opt/npm-tools/node_modules") + "/esbuild/lib/main.js")).default;
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
const require = createRequire(import.meta.url);
const tw = require((process.env.TOOLS || "/opt/npm-tools/node_modules") + "/tailwindcss/dist/lib.js");

// Uso: node build.mjs <pasta src> <pasta public> <pasta de saída TEMPORÁRIA>
const SRC = path.resolve(process.argv[2]);
const PUB = path.resolve(process.argv[3]);
const OUT = path.resolve(process.argv[4]);
if (fs.existsSync(path.join(OUT, ".git")) || fs.existsSync(path.join(OUT, "codigo-fonte")))
  throw new Error("A pasta de saída é apagada antes do build: use uma pasta temporária, não o repositório.");
const HERE = path.dirname(new URL(import.meta.url).pathname);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const fixL5e = (code) => code.replace(/(["'`])(\/__l5e\/[^"'`]+)\1/g, (_, q, p) => `__IMG(${q}${p}${q})`);

const plugin = {
  name: "static",
  setup(b) {
    b.onResolve({ filter: /^@tanstack\/react-router$/ }, () => ({ path: path.join(HERE, "shims/router.tsx") }));
    b.onResolve({ filter: /^@tanstack\/react-query$/ }, () => ({ path: path.join(HERE, "shims/query.tsx") }));
    b.onResolve({ filter: /^@\// }, async (a) => {
      const r = await b.resolve("./" + a.path.slice(2), { resolveDir: SRC, kind: a.kind });
      return r;
    });
    b.onLoad({ filter: /\.asset\.json$/ }, (a) => {
      const j = JSON.parse(fs.readFileSync(a.path, "utf8"));
      return { contents: `export default { ...${JSON.stringify(j)}, url: __IMG(${JSON.stringify(j.url)}) };`, loader: "js" };
    });
    b.onLoad({ filter: /\.(ts|tsx)$/ }, (a) => {
      if (!a.path.startsWith(SRC)) return;
      return { contents: fixL5e(fs.readFileSync(a.path, "utf8")), loader: a.path.endsWith("x") ? "tsx" : "ts" };
    });
  },
};

await esbuild.build({
  entryPoints: [path.join(HERE, "main.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2019",
  jsx: "automatic",
  outdir: OUT,
  entryNames: "assets/app",
  assetNames: "assets/img/[name]-[hash]",
  publicPath: "./",
  nodePaths: [process.env.TOOLS || "/opt/npm-tools/node_modules"],
  loader: { ".png": "file", ".jpg": "file", ".jpeg": "file", ".webp": "file", ".svg": "file", ".gif": "file", ".avif": "file" },
  define: { "import.meta.env.BASE_URL": '"./"', "import.meta.env.DEV": "false", "import.meta.env.PROD": "true", "process.env.NODE_ENV": '"production"' },
  plugins: [plugin],
  logLevel: "warning",
});

// ---- CSS (Tailwind v4) ----
let css = fs.readFileSync(path.join(SRC, "styles.css"), "utf8")
  .replace(/@import\s+"tailwindcss"[^;]*;/, '@import "tailwindcss";')
  .replace(/@source[^;]*;/g, "")
  .replace(/@import\s+"tw-animate-css";/, "");
const twDir = (process.env.TOOLS || "/opt/npm-tools/node_modules") + "/tailwindcss";
const compiler = await tw.compile(css, {
  base: SRC,
  loadStylesheet: async (id, base) => {
    const map = { tailwindcss: "index.css", "tailwindcss/preflight": "preflight.css", "tailwindcss/theme": "theme.css", "tailwindcss/utilities": "utilities.css" };
    const f = map[id] ? path.join(twDir, map[id]) : path.resolve(base, id);
    return { path: f, base: path.dirname(f), content: fs.readFileSync(f, "utf8") };
  },
});
const cands = new Set();
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else if (/\.(tsx?|jsx?)$/.test(e.name) && !p.endsWith("routeTree.gen.ts")) {
    for (const t of fs.readFileSync(p, "utf8").split(/[\s"'`{}]+/)) if (t && t.length < 300) cands.add(t.replace(/[,;]+$/, ""));
  }
}};
walk(SRC); walk(HERE + "/shims"); for (const t of fs.readFileSync(HERE + "/main.tsx", "utf8").split(/[\s"'`{}]+/)) cands.add(t);
const outCss = compiler.build([...cands]);
fs.writeFileSync(path.join(OUT, "assets/app.css"), outCss);

// ---- public/ ----
fs.cpSync(PUB, OUT, { recursive: true });
fs.copyFileSync(path.join(HERE, "index.html"), path.join(OUT, "index.html"));
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log("CSS:", (outCss.length / 1024).toFixed(0) + "KB");

// ---- Pôr JS e CSS dentro do index.html (funciona mesmo aberto sozinho) ----
{
  const d = OUT;
  let html = fs.readFileSync(path.join(d, "index.html"), "utf8");
  const js = fs.readFileSync(path.join(d, "assets/app.js"), "utf8").replace(/<\/script/g, "<\\/script");
  const css = fs.readFileSync(path.join(d, "assets/app.css"), "utf8").replace(/<\/style/g, "<\\/style");
  html = html.replace('<link rel="stylesheet" href="./assets/app.css" />', () => "<style>\n" + css + "\n</style>");
  html = html.replace('<script src="./assets/app.js"></script>', () => "<script>\n" + js + "\n</script>");
  fs.writeFileSync(path.join(d, "index.html"), html);
  fs.rmSync(path.join(d, "assets/app.js")); fs.rmSync(path.join(d, "assets/app.css"));
}
