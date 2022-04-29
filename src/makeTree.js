import _ from 'lodash';

const makeTree = (data1, data2) => {
  const allKeys = _.union(_.keys(data1), _.keys(data2));
  const result = allKeys
    .map((key) => {
      if (!_.has(data1, key)) {
        const value = data2[key];
        return { name: key, condition: 'added', value };
      }
      if (!_.has(data2, key)) {
        const value = data1[key];
        return { name: key, condition: 'removed', value };
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { name: key, condition: 'nested', children: makeTree(data1[key], data2[key]) };
      }
      if (data1[key] === data2[key]) {
        return { name: key, condition: 'nothing changed', value: data1[key] };
      }
      const value1 = data1[key];
      const value2 = data2[key];
      return { name: key, condition: 'updated', value: [value1, value2] };
    });
  return _.sortBy(result, 'name');
};
export default makeTree;
