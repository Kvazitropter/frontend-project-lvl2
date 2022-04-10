import stylish from '../src/stylish';

const diff1 = [
    [' ', 'key1', [
        ['-', 'cat', 'meow'],
        ['-', 'key2', [
            [' ', 'no', 'value'],
            [' ', 'somekey', 'somevalue']
        ]],
        [' ', 'something', 0]
    ]],
    ['+', 'setting', false]
];
const expected1 = '{\n    key1: {\n    - cat: meow\n    - key2: {\n        no: value\n        somekey: somevalue\n    }\n      something: 0\n  }\n  + setting: false\n}';
const diff2 = [];
const expected2 = '{}';

test('style test', () => {
  const actual1 = stylish(diff1);
  const actusl2 = stylish(diff2);
  expect(actual1).toBe(expected1);
  expect(actusl2).toBe(expected2);
})
