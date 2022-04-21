import _ from 'lodash';

export default (diff) => {
  if (diff.length === 0) {
    return '{}';
  }
  const iter = (arr, depth) => {
    const whSpaceForKey = ' '.repeat(2 * depth);
    const whSpaceForBracket = depth > 1 ? ' '.repeat(2 * (depth - 1)) : '';
    const allWithSign = arr.map(({ name, condition, value }) => {
      if (_.isArray(value) && condition === 'updated') {
        const [value1, value2] = value;
        const itWas = _.isArray(value1) ? iter(value1, depth + 2) : value1;
        const itBecame = _.isArray(value2) ? iter(value2, depth + 2) : value2;
        return `${whSpaceForKey}- ${name}: ${itWas}\n${whSpaceForKey}+ ${name}: ${itBecame}`;
      }
      const newValue = _.isArray(value) ? iter(value, depth + 2) : value;
      switch (condition) {
        case 'removed':
          return `${whSpaceForKey}- ${name}: ${newValue}`;
        case 'added':
          return `${whSpaceForKey}+ ${name}: ${newValue}`;
        default:
          return `${whSpaceForKey}  ${name}: ${newValue}`;
      }
    });
    return `{\n${allWithSign.join('\n')}\n${whSpaceForBracket}}`;
  };
  return iter(diff, 1);
};
