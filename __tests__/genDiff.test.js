import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilepath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expected1 = '{\n    common: {\n    + follow: false\n      setting1: Value 1\n    - setting2: 200\n    - setting3: true\n    + setting3: null\n    + setting4: blah blah\n    + setting5: {\n        key5: value5\n    }\n      setting6: {\n        doge: {\n        - wow: \n        + wow: so much\n      }\n        key: value\n      + ops: vops\n    }\n  }\n    group1: {\n    - baz: bas\n    + baz: bars\n      foo: bar\n    - nest: {\n        key: value\n    }\n    + nest: str\n  }\n  - group2: {\n      abc: 12345\n      deep: {\n        id: 45\n    }\n  }\n  + group3: {\n      deep: {\n        id: {\n          number: 45\n      }\n    }\n      fee: 100500\n  }\n}';
const expected2 = '{\n    common: {\n    - follow: false\n      setting1: Value 1\n    + setting2: 200\n    - setting3: null\n    + setting3: true\n    - setting4: blah blah\n    - setting5: {\n        key5: value5\n    }\n      setting6: {\n        doge: {\n        - wow: so much\n        + wow: \n      }\n        key: value\n      - ops: vops\n    }\n  }\n    group1: {\n    - baz: bars\n    + baz: bas\n      foo: bar\n    - nest: str\n    + nest: {\n        key: value\n    }\n  }\n  + group2: {\n      abc: 12345\n      deep: {\n        id: 45\n    }\n  }\n  - group3: {\n      deep: {\n        id: {\n          number: 45\n      }\n    }\n      fee: 100500\n  }\n}';

test('compare json files', () => {
  const filepath1 = getFilepath('file1.json');
  const filepath2 = getFilepath('file2.json');
  const actual1 = genDiff(filepath1, filepath2);
  const actual2 = genDiff(filepath2, filepath1);
  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
});

test('compare yaml files', () => {
  const filepath1 = getFilepath('file1.yaml');
  const filepath2 = getFilepath('file2.yaml');
  const filepath3 = getFilepath('file1.yml');
  const filepath4 = getFilepath('file2.yml');
  const actual1 = genDiff(filepath1, filepath2);
  const actual2 = genDiff(filepath2, filepath1);
  const actual3 = genDiff(filepath3, filepath4);
  const actual4 = genDiff(filepath4, filepath3);
  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected1);
  expect(actual4).toEqual(expected2);
});
