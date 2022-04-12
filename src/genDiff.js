import _ from 'lodash';
import parser from './parsers.js';
import chooseFormat from './formatters/index.js';

const signs = [' ', '-', '+'];
const [space, minus, plus] = signs;

const objToArr = (obj) => {
  const level1 = Object.entries(obj);
  const result = level1.map(([key, value]) => {
    const newValue = typeof value === 'object' && value !== null ? objToArr(value) : value;
    return [key, newValue];
  });
  return result;
};

const addSpace = (arr) => {
  const withAddedSpace = arr.map(([key, value]) => {
    if (Array.isArray(value)) {
      return [space, key, addSpace(value)];
    }
    return [space, key, value];
  });
  return withAddedSpace;
};

export default (filepath1, filepath2, format) => {
  const formatter = chooseFormat(format);
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const arrOfEntries1 = objToArr(file1);
  const arrOfEntries2 = objToArr(file2);

  const callback = (arr1, arr2) => {
    const arrOfKeys1 = arr1.map(([key]) => key);
    const arrOfKeys2 = arr2.map(([key]) => key);

    const onlyIn1 = arr1.filter(([key]) => !arrOfKeys2.includes(key))
      .map(([key, value]) => {
        const newValue = Array.isArray(value) ? addSpace(value) : value;
        return [minus, key, newValue];
      });

    const onlyIn2 = arr2.filter(([key]) => !arrOfKeys1.includes(key))
      .map(([key, value]) => {
        const newValue = Array.isArray(value) ? addSpace(value) : value;
        return [plus, key, newValue];
      });

    const inBoth = arr1.reduce((acc, [key1, value1]) => {
      const theSameKey = arr2.filter(([key2]) => key2 === key1);
      if (theSameKey.length === 0) {
        return acc;
      }
      const [[key2, value2]] = theSameKey;
      if (Array.isArray(value1) && Array.isArray(value2)) {
        const newValue = callback(value1, value2);
        acc.push([space, key1, newValue]);
        return acc;
      }

      if (value1 === value2) {
        acc.push([space, key1, value1]);
      } else {
        const newValue1 = Array.isArray(value1) ? addSpace(value1) : value1;
        const newValue2 = Array.isArray(value2) ? addSpace(value2) : value2;
        acc.push([minus, key1, newValue1]);
        acc.push([plus, key2, newValue2]);
      }

      return acc;
    }, []);

    const allWithSign = inBoth.concat(onlyIn1).concat(onlyIn2);

    return _.sortBy(allWithSign, ([, key]) => key);
  };

  const allWithSignSorted = callback(arrOfEntries1, arrOfEntries2);

  return formatter(allWithSignSorted);
};
