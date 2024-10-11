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
let expectedStylish;
let expectedPlain;

beforeAll(() => {
  expectedStylish = readFixtureFile('resultStylish.txt', 'utf8');
  expectedPlain = readFixtureFile('resultPlain.txt', 'utf8');
});

describe('genDiff test', () => {
  test.each(extensions)('supported extensions files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    const actual1 = genDiff(filepath1, filepath2, 'stylish');
    const actual2 = genDiff(filepath1, filepath2, 'plain');
    expect(actual1).toBe(expectedStylish);
    expect(actual2).toBe(expectedPlain);
  });
});
