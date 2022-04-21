import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilepath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFilepath(filename), 'utf-8');
const expected1 = readFile('stylishResult');
const expected2 = readFile('plainResult');
const expected3 = readFile('jsonResult');
const extension = ['yml', 'yaml', 'json'];

test.each(extension)('compare files', (ext) => {
  const filepath1 = getFilepath(`file1.${ext}`);
  const filepath2 = getFilepath(`file2.${ext}`);
  const actual1 = genDiff(filepath1, filepath2, 'stylish');
  const actual2 = genDiff(filepath1, filepath2, 'plain');
  const actual3 = genDiff(filepath1, filepath2, 'json');
  const actual4 = genDiff(filepath1, filepath2);
  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected3);
  expect(actual4).toEqual(expected1);
});
