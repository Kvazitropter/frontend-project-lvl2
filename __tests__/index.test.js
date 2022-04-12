import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import chooseFormat from '../src/formatters/index.js';

test('check choose output format', () => {
  const actual1 = chooseFormat('stylish');
  const actual2 = chooseFormat('plain');
  expect(actual1).toEqual(stylish);
  expect(actual2).toEqual(plain);
});
