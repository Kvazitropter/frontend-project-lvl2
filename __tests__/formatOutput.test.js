import formatOutput from '../src/formatOutput';

let data;
let dataWithWrongStatus;
let format;
let invalidFormat;

beforeAll(() => {
  data = [{ key: 'key', value: 'value', status: 'deleted' }];
  dataWithWrongStatus = [{ key: 'key', value: 'value', status: 'status' }];
  format = 'stylish';
  invalidFormat = 'some format';
});

describe('formatOutput borderline cases', () => {
  test('invalid format', () => {
    const actual = () => formatOutput(data, invalidFormat);
    expect(actual).toThrow('invalid format');
  });

  test('invalid status of the file entry', () => {
    const actual = () => formatOutput(dataWithWrongStatus, format);
    expect(actual).toThrow('invalid status of the file entry');
  });
});
