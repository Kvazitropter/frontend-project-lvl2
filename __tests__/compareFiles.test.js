import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import compareFiles from '../src/compareFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename, ...options) => fs.readFileSync(
  getFixturePath(filename),
  ...options,
);

let expectedStylish;
const extensions = ['json', 'yml'];

beforeAll(() => {
  expectedStylish = readFixtureFile('resultStylish.txt', 'utf8');
});

describe('compareFiles test', () => {
  test.each(extensions)('supported extensions files stylish format', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    const actual = compareFiles(filepath1, filepath2, 'stylish');
    expect(actual).toBe(expectedStylish);
  });
});
