import getRoutes from '../utils/getRoutes';
import { Request, Response } from 'express';

const express = require('express');



const app = express();
const port = 3000;
let routes: undefined | string[];

(async () => {
  routes = await getRoutes();
})().then(() => {
  routes?.forEach((route) => {
    import(`../server/${route}.js`).then((handerModule) => {
      return app.use('/'.concat(route), handerModule.default());
    });
  });

  app.get('/', (req: Request, res: Response) => {
    res.send('hello');
  });

  app.listen(port, () => {
    console.log(`sever running on ${port}`);
  });
});
