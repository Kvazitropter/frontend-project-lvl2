import _ from 'lodash';
import getFormatter from './formatters/index.js';
import parser from './parsers.js';

const setChildren = (children) => {
  const keys = _.keys(children);
  const result = keys.map((key) => {
    if (_.isObject(children[key])) {
      return { name: key, condition: 'nested', value: setChildren(children[key]) };
    }
    return { name: key, condition: 'child', value: children[key] };
  });
  return result;
};

const hasChildren = (value) => (_.isObject(value) ? setChildren(value) : value);

const findDifference = (filepath1, filepath2, formatName) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const formatter = getFormatter(formatName);
  const iter = (data1, data2) => {
    const allKeys = _.union(_.keys(data1), _.keys(data2));
    const result = allKeys
      .map((key) => {
        if (!_.has(data1, key)) {
          const value = hasChildren(data2[key]);
          return { name: key, condition: 'added', value };
        }
        if (!_.has(data2, key)) {
          const value = hasChildren(data1[key]);
          return { name: key, condition: 'removed', value };
        }
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
          return { name: key, condition: 'nested', value: iter(data1[key], data2[key]) };
        }
        if (data1[key] === data2[key]) {
          return { name: key, condition: 'nothing changed', value: data1[key] };
        }
        const value1 = hasChildren(data1[key]);
        const value2 = hasChildren(data2[key]);
        return { name: key, condition: 'updated', value: [value1, value2] };
      });
    return _.sortBy(result, 'name');
  };
  return formatter(iter(file1, file2));
};
export default findDifference;
