import { Router } from 'express';
import { snakeCase } from 'lodash';
import fs from 'fs';

const router = Router();
const FILE_EXTENSION_REGEX = /^.*\.(js|ts)$/;

fs.readdirSync(__dirname).forEach(async file => {
  try {
    if (file === 'index.ts' || file === 'index.js') return;
    const path = '/' + (file !== 'root.ts' ? snakeCase(file.replace(FILE_EXTENSION_REGEX, '')) : '');

    const routePath = await (await import('path')).join(__dirname, file);
    const route = await import(`${routePath}`);

    router.use(path, route.default);
  } catch (err) {
    //TODO: add error logger
    console.log(err);
  }
});

export default router;
