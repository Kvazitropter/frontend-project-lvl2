import _ from 'lodash';
import parser from './parsers.js';

export default (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const arrOfEntries1 = Object.entries(file1);
  const arrOfKeys1 = Object.keys(file1);
  const arrOfEntries2 = Object.entries(file2);
  const signs = [' ', '-', '+'];
  const [without, minus, plus] = signs;
  const inBothFilesAndOnlyIn1 = arrOfEntries1.reduce((acc, [key1, value1]) => {
    const withoutSign = arrOfEntries2.filter(([key2]) => key2 === key1);
    const withSign = withoutSign.length === 0 ? undefined : [];
    if (withSign !== undefined) {
      const [[key2, value2]] = withoutSign;
      if (value2 === value1) {
        withSign.push([without, key1, value1]);
      } else {
        withSign.push([minus, key1, value1]);
        withSign.push([plus, key2, value2]);
      }
    }
    const result = withSign ?? [[minus, key1, value1]];
    return acc.concat(result);
  }, []);
  const allWithSign = inBothFilesAndOnlyIn1.concat(arrOfEntries2.reduce((acc, [key, value]) => {
    if (!arrOfKeys1.includes(key)) {
      acc.push([plus, key, value]);
    }
    return acc;
  }, []));
  const allWithSignSorted = _.sortBy(allWithSign, ([, key]) => key)
    .reduce((acc, [sign, key, value]) => {
      acc.push(`  ${sign} ${key}: ${value}`);
      return acc;
    }, []);
  return `{\n${allWithSignSorted.join('\n')}\n}`;
};
