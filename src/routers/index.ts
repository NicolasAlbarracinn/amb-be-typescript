import { Express } from 'express';
import { snakeCase } from 'lodash';
import fs from 'fs';

const routes = (app: Express): void => {
  fs.readdirSync(__dirname).forEach(async file => {
    try {
      if (file === 'index.ts') return;
      const path = '/' + (file !== 'root.ts' ? snakeCase(file.replace('.ts', '')) : '');

      const routePath = await (await import('path')).join(__dirname, file);
      const route = await import(`${routePath}`);

      app.use(path, route.default);
    } catch (err) {
      //TODO: add error logger
      console.log(err);
    }
  });
};

export default routes;
