import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

interface IImageConfig {
  type: string;
  name: string;
  content: string;
}

const readFile = promisify(fs.readFile);

const TEMPLATES_FOLDER = './templates';
const IMAGES_FOLDER = './templates/images';

export const base64Encode = (filePath: string): string => {
  return fs.readFileSync(filePath, 'base64');
};

const images = {
  logoAmebo: {
    type: 'image/jpg',
    name: 'logo-amebo', //same cid value as in the html img src,
    content: base64Encode(path.join(__dirname, IMAGES_FOLDER, 'ameboLogo.jpg')),
  },
};

// TODO: change to enum and type everything
export const templateNames = {
  FILE_NINE_MAY: 'legajo-9-de-mayo',
};

const templatePaths = {
  [templateNames.FILE_NINE_MAY]: TEMPLATES_FOLDER + '/legajo-9-de-mayo.html',
};

const templateImages = {
  [templateNames.FILE_NINE_MAY]: [images.logoAmebo],
};

export const getTemplatePath = (template: string): string => path.join(__dirname, templatePaths[template]);

export const loadTemplate = async (template: string, read = readFile): Promise<Buffer> => {
  if (!Object.keys(templatePaths).includes(template)) {
    throw new Error('El template no existe');
  }
  const filePath = getTemplatePath(template);
  const file = read(filePath);
  return file;
};

export const getTemplateImages = (template: string): Array<IImageConfig> => templateImages[template];
