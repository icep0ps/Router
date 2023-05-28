import { readFile } from 'fs';

function getRoutes() {
  readFile('/pages/index.js', 'utf-8', (err, data) => {
    console.log(data);
  });
}

getRoutes();

export default getRoutes;
