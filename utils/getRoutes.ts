const fse = require('fs-extra');
import { lstat } from 'fs/promises';
import { readdir } from 'fs/promises';
import { join, dirname, resolve } from 'path';

async function getRoutes() {
  const dirSegmanets = resolve(__dirname).split('\\');
  const pagesDir = join(...dirSegmanets.slice(0, dirSegmanets.length - 1), 'pages');
  const serverDir = join(...dirSegmanets.slice(0, dirSegmanets.length - 1), 'server');
  const files = await generateFilename(pagesDir);

  for (const file of await readdir(serverDir)) {
    await fse.remove(join(serverDir, file));
  }

  return Promise.all(
    files.map(async (filename) => {
      const pathname = filename.replace(/\.[^/.]+$/, '');
      const splitPath = pathname.split('/');
      const segments = splitPath.map((route, i) =>
        i === splitPath.length - 1 ? route.concat('.js') : route
      );

      const route = await import(`../pages/${filename}`);
      const modules = [
        'const router = express.Router();',
        "const express = require('express');",
      ];

      let router = `module.exports = function handler(){router.get("/", ${route.default}); return router;}`;

      for (const module of modules) {
        router = module.concat(router);
      }

      await fse.outputFile(join(dirname(__dirname), 'server', ...segments), router);
      return pathname;
    })
  );
}

async function generateFilename(upperDir: string, arr: string[] = []): Promise<string[]> {
  let rDirt = upperDir;
  const files = await readdir(upperDir);
  for (var dir of files) {
    rDirt = join(upperDir, dir);
    let file = await lstat(rDirt);
    if (file.isDirectory()) {
      arr.push(...(await generateFilename(rDirt)));
    } else {
      const replaced = resolve(rDirt).split('\\');
      const dirs = replaced
        .slice(replaced.indexOf('pages') + 1, replaced.length)
        .join('/');

      arr.push(dirs);
    }
  }

  return arr;
}

export default getRoutes;
