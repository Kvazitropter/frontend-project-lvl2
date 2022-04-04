import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilepath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare json files', () => {
  const filepath1 = getFilepath('file1.json');
  const filepath2 = getFilepath('file2.json');
  const expected1 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  const actual1 = genDiff(filepath1, filepath2);
  expect(actual1).toEqual(expected1);
  const expected2 = '{\n  + follow: false\n    host: hexlet.io\n  + proxy: 123.234.53.22\n  - timeout: 20\n  + timeout: 50\n  - verbose: true\n}';
  const actual2 = genDiff(filepath2, filepath1);
  expect(actual2).toEqual(expected2);
});
