import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const extension = path.extname(filepath);
  const file = readFileSync(path.resolve(filepath), 'utf-8');
  switch(extension) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
      return yaml.load(file);
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error('unsupported extension of file');
  };
};
