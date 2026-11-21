// A tiny image server that pretends to be on a slow connection, so the blur placeholder can be seen.
//
//   npm run slow-images
//
// Then open the app with ?slow, for example http://localhost:4200/?slow
// - a request with ?w=64 or less gets "<name>-tiny.jpg" straight away (the placeholder)
// - every other image request waits DELAY milliseconds before the real file is sent
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const port = Number(process.env.PORT || 4420);
const delay = Number(process.env.DELAY || 3000);
const publicDir = join(import.meta.dirname, 'public');

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const name = basename(url.pathname);
    const width = Number(url.searchParams.get('w') || 0);
    const isPlaceholder = width > 0 && width <= 64;
    const file = isPlaceholder ? name.replace(/\.jpg$/, '-tiny.jpg') : name;

    if (!isPlaceholder) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      const body = await readFile(join(publicDir, file));
      res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-store' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  })
  .listen(port, () => {
    console.log(`Slow image server on http://localhost:${port} (full images take ${delay} ms)`);
  });
