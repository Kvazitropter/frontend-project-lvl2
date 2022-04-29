import _ from 'lodash';

export default (diff) => {
  const iter = (arr, path) => {
    const formattedResult = arr.map(({
      name, condition, value, children,
    }) => {
      const isComplexValue = (val) => (_.isObject(val) ? '[complex value]' : val);
      const addBrackets = (val) => (typeof val === 'string' && val !== '[complex value]' ? `'${val}'` : val);
      const newValue = addBrackets(isComplexValue(value));
      const [value1, value2] = _.isArray(value) ? value : [];
      const itWas = addBrackets(isComplexValue(value1));
      const itBecame = addBrackets(isComplexValue(value2));
      switch (condition) {
        case 'removed':
          return `Property '${path}${name}' was removed`;
        case 'added':
          return `Property '${path}${name}' was added with value: ${newValue}`;
        case 'updated':
          return `Property '${path}${name}' was updated. From ${itWas} to ${itBecame}`;
        case 'nested':
          return iter(children, `${path}${name}.`);
        case 'nothing changed':
          return [];
        default:
          throw new Error('unknown condition');
      }
    });
    return formattedResult.flat().join('\n');
  };
  return iter(diff, '');
};
