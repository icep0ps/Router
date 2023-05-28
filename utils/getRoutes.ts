import { appendFile, readdir, unlink } from 'fs/promises';
import { basename, join, dirname, resolve } from 'path';

async function getRoutes() {
  const arr = resolve(__dirname).split('\\');
  const pagesDir = join(...arr.slice(0, arr.length - 1), 'pages');
  const serverDir = join(...arr.slice(0, arr.length - 1), 'server');
  const files = await readdir(pagesDir);

  for (const file of await readdir(serverDir)) {
    await unlink(join(serverDir, file));
  }

  return Promise.all(
    files.map(async (filename) => {
      const pagesDir = basename(filename, '.js');
      const route = await import(`../pages/${filename}`);
      const modules = [
        "const express = require('express');",
        'const router = express.Router();',
      ];
      const router = `module.exports = function handler(){router.get("/", ${route.default}); return router;}`;

      await new Promise(async (resolve, reject) => {
        for (const module of modules) {
          await appendFile(join(dirname(__dirname), 'server', `${pagesDir}.js`), module);
        }
        resolve('sucess');
      });

      await appendFile(join(dirname(__dirname), 'server', `${pagesDir}.js`), router);
      return pagesDir;
    })
  );
}

export default getRoutes;
