import { Router } from 'express';
import { snakeCase } from 'lodash';
import fs from 'fs';

const router = Router();

fs.readdirSync(__dirname).forEach(async file => {
  try {
    if (file === 'index.ts') return;
    const path = '/' + (file !== 'root.ts' ? snakeCase(file.replace('.ts', '')) : '');

    const routePath = await (await import('path')).join(__dirname, file);
    const route = await import(`${routePath}`);

    router.use(path, route.default);
  } catch (err) {
    //TODO: add error logger
    console.log('errorrrrrrrrrrr');
    console.log(err);
  }
});

export default router;
