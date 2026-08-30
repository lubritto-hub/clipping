import { build } from 'esbuild';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

// 1) JS bundle (ESM, react external)
await build({
  entryPoints: [path.join(root, 'src/index.ts')],
  outfile: path.join(dist, 'index.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  sourcemap: false,
});

// 2) Type declarations
execFileSync('npx', ['tsc', '-p', 'tsconfig.json'], { cwd: root, stdio: 'inherit' });

// 3) Stylesheets: tokens.css standalone + styles.css (tokens + components, flattened)
const tokens = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');
const components = await readFile(path.join(root, 'src/styles/components.css'), 'utf8');
await writeFile(path.join(dist, 'tokens.css'), tokens);
await writeFile(
  path.join(dist, 'styles.css'),
  `/* Biochar Design System - complete stylesheet (design tokens + component styles). */\n\n${tokens}\n\n${components}\n`
);

console.log('build ok -> dist/index.js, dist/index.d.ts, dist/styles.css, dist/tokens.css');
