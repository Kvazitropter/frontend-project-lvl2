import { fileURLToPath } from 'url';
import path from 'path';
import compareFiles from '../src/compareFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected1 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

// beforeAll(() => {
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
// });

describe('compareFiles test', () => {
  test('json files without nested values stylish format', () => {
    const actual1 = compareFiles(filepath1, filepath2);
    expect(actual1).toBe(expected1);
  });
});
