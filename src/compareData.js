import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeysSorted = _.sortBy(_.union(keys1, keys2));

  return allKeysSorted.reduce((result, key) => {
    if (!_.has(data1, key)) {
      result.push({ key, value: data2[key], status: 'added' });
    } else if (!_.has(data2, key)) {
      result.push({ key, value: data1[key], status: 'deleted' });
    } else if (data1[key] === data2[key]) {
      result.push({ key, value: data1[key], status: 'unchanged' });
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      result.push({
        key,
        children: compareData(data1[key], data2[key]),
        status: 'nested',
      });
    } else {
      result.push({
        key,
        oldValue: data1[key],
        newValue: data2[key],
        status: 'changed',
      });
    }
    return result;
  }, []);
};

export default compareData;
