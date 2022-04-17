import _ from 'lodash';

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

const makeTree = (data1, data2) => {
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
        return { name: key, condition: 'nested', value: makeTree(data1[key], data2[key]) };
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
export default makeTree;
