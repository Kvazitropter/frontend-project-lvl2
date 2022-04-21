import path from 'path';
import { readFileSync } from 'fs';
import getFormatter from './formatters/index.js';
import parser from './parsers.js';
import makeTree from './makeTree.js';

const getAbsPath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (filepath) => readFileSync(filepath, 'utf-8');

const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getData(getAbsPath(filepath1));
  const file2 = getData(getAbsPath(filepath2));
  const ext1 = getExtension(filepath1);
  const ext2 = getExtension(filepath2);
  const parsedData1 = parser(file1, ext1);
  const parsedData2 = parser(file2, ext2);
  const formatter = getFormatter(formatName);

  return formatter(makeTree(parsedData1, parsedData2));
};
export default genDiff;
