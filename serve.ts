// A tiny static server for app/ (Node 22, standard library only), so the
// site can be run locally without a build step:
//
//   node serve.ts                 serves app/ on http://127.0.0.1:8080
//   node serve.ts --port 3000     serves on port 3000 instead
//   node serve.ts --host 0.0.0.0  listens on every interface (LAN demos)
//
// It sends the MIME types a browser needs, answers HEAD as well as GET,
// refuses any path outside app/, logs each request to stdout, and
// otherwise does nothing clever: this is a development convenience, not a
// web server for the internet.
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./app', import.meta.url)));
const args = process.argv.slice(2);

function flagValue(flag, fallback) {
  const i = args.indexOf(flag);
  return i === -1 || i + 1 >= args.length ? fallback : args[i + 1];
}

const requestedPort = Number(flagValue('--port', '8080'));
const port = Number.isInteger(requestedPort) && requestedPort > 0 && requestedPort < 65536
  ? requestedPort
  : 8080;
const host = flagValue('--host', '127.0.0.1');

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

createServer((request, response) => {
  const started = Date.now();
  const method = request.method ?? 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    response.writeHead(405, { 'allow': 'GET, HEAD' }).end('method not allowed');
    console.log(`${method} ${request.url} -> 405 (${Date.now() - started}ms)`);
    return;
  }
  const url = new URL(request.url ?? '/', 'http://localhost');
  let pathname: string;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400).end('bad request');
    console.log(`${method} ${request.url} -> 400 (${Date.now() - started}ms)`);
    return;
  }
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = resolve(join(root, normalize(pathname)));
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end('forbidden');
    console.log(`${method} ${request.url} -> 403 (${Date.now() - started}ms)`);
    return;
  }
  let size: number;
  try {
    const stats = statSync(file);
    if (!stats.isFile()) throw new Error('not a file');
    size = stats.size;
  } catch {
    response.writeHead(404).end('not found');
    console.log(`${method} ${request.url} -> 404 (${Date.now() - started}ms)`);
    return;
  }
  response.writeHead(200, {
    'content-type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream',
    'content-length': size,
    'cache-control': 'no-store',
  });
  console.log(`${method} ${request.url} -> 200 (${Date.now() - started}ms)`);
  if (method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(file).pipe(response);
}).listen(port, host, () => {
  console.log(`app/ is on http://${host}:${port}`);
});
