import path from 'path';
import { readFileSync } from 'fs';

export default (filepath) => {
  const fullFilepath = path.resolve(process.cwd(), filepath);
  return readFileSync(fullFilepath);
};
