import _ from 'lodash';

const isObj = (value) => _.isObject(value) && !_.isArray(value);

const normalizeNodes = (children) => {
  const entries = _.entries(children);
  return entries.map(([key, value]) => ({ name: key, value }));
};

export default (diff) => {
  if (diff.length === 0) {
    return '{}';
  }
  const iter = (arr, depth) => {
    const whSpaceForKey = ' '.repeat(2 * depth);
    const whSpaceForBracket = depth > 1 ? ' '.repeat(2 * (depth - 1)) : '';
    const allWithSign = arr.map(({
      name, condition = 'nothing changed', value, children,
    }) => {
      const newValue = isObj(value) ? iter(normalizeNodes(value), depth + 2) : value;
      const [value1, value2] = _.isArray(value) ? value : [];
      const itWas = isObj(value1) ? iter(normalizeNodes(value1), depth + 2) : value1;
      const itBecame = isObj(value2) ? iter(normalizeNodes(value2), depth + 2) : value2;
      switch (condition) {
        case 'removed':
          return `${whSpaceForKey}- ${name}: ${newValue}`;
        case 'added':
          return `${whSpaceForKey}+ ${name}: ${newValue}`;
        case 'nothing changed':
          return `${whSpaceForKey}  ${name}: ${newValue}`;
        case 'updated':
          return `${whSpaceForKey}- ${name}: ${itWas}\n${whSpaceForKey}+ ${name}: ${itBecame}`;
        case 'nested':
          return `${whSpaceForKey}  ${name}: ${iter(children, depth + 2)}`;
        default:
          throw new Error('erorr');
      }
    });
    return `{\n${allWithSign.join('\n')}\n${whSpaceForBracket}}`;
  };
  return iter(diff, 1);
};
