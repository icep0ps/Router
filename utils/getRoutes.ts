import route from '../pages/index';
import { appendFile } from 'fs/promises';
import { basename, join, dirname } from 'path';

async function getRoutes() {
  const filename = basename(join(__dirname, 'pages', 'index'), '.js');
  const modules = [
    "const express = require('express');",
    'const router = express.Router();',
  ];
  const router = `module.exports = function handler(){console.log("handling!"); router.get("/", ${route}); return router;}`;

  await new Promise((resolve, reject) => {
    modules.forEach(async (module) => {
      await appendFile(join(dirname(__dirname), 'server', `${filename}.js`), module);
    });
    resolve('sucess');
  });
  await appendFile(join(dirname(__dirname), 'server', `${filename}.js`), router);

  return [filename];
}

export default getRoutes;
