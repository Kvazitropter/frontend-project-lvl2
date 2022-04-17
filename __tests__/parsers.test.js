import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilepath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getData = (filepath) => readFileSync(filepath, 'utf-8');
const file1 = getData(getFilepath('file1.json'));
const file2 = getData(getFilepath('file1.yaml'));
const file3 = getData(getFilepath('file1.yml'));

const expected = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

test('parser test', () => {
  const actual1 = parser(file1, 'json');
  const actual2 = parser(file2, 'yaml');
  const actual3 = parser(file3, 'yml');
  expect(actual1).toEqual(expected);
  expect(actual2).toEqual(expected);
  expect(actual3).toEqual(expected);
});
