import parseData from '../src/parseData';

describe('parseData borderline case', () => {
  test('unsupported extension', () => {
    const actual = () => parseData('placeholder', 'txt');
    expect(actual).toThrow('unsupported extension');
  });
});
