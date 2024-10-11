import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename, ...options) => fs.readFileSync(
  getFixturePath(filename),
  ...options,
);

const extensions = ['json', 'yml'];
const expectedResults = ['stylish', 'plain', 'json'].map((format) => {
  const filename = `result${format[0].toUpperCase()}${format.slice(1)}.txt`;
  const expected = readFixtureFile(filename, 'utf8');
  return { format, expected };
});

describe.each(expectedResults)('genDiff $format format', ({ format, expected }) => {
  test.each(extensions)('compare %s files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    const actual = genDiff(filepath1, filepath2, format);
    expect(actual).toBe(expected);
  });
});
