import _ from 'lodash';

export default (diff) => {
  const iter = (arr, path) => {
    const formattedResult = arr.reduce((acc, { name, condition, value }) => {
      const isComplexValue = (val) => (_.isArray(val) ? '[complex value]' : val);
      const addBrackets = (val) => (typeof val === 'string' && val !== '[complex value]' ? `'${val}'` : val);
      const newValue = addBrackets(isComplexValue(value));
      if (condition === 'updated') {
        const [value1, value2] = value;
        const itWas = addBrackets(isComplexValue(value1));
        const itBecame = addBrackets(isComplexValue(value2));
        acc.push(`Property '${path}${name}' was updated. From ${itWas} to ${itBecame}`);
      }
      switch (condition) {
        case 'removed':
          acc.push(`Property '${path}${name}' was removed`);
          break;
        case 'added':
          acc.push(`Property '${path}${name}' was added with value: ${newValue}`);
          break;
        case 'nested':
          acc.push(iter(value, `${path}${name}.`));
          break;
        default:
      }
      return acc;
    }, []);
    return formattedResult.join('\n');
  };
  return iter(diff, '');
};
