import _ from 'lodash';

export default (diff) => {
  if (diff.length === 0) {
    return '{}';
  }
  const iter = (arr, depth) => {
    const hasChildren = (value) => (_.isArray(value) ? iter(value, depth + 1) : value);
    const whSpaceForKey = ' '.repeat(2 * depth);
    const whSpaceForBracket = depth > 1 ? ' '.repeat(2 * (depth - 1)) : '';
    const allWithSign = arr.reduce((acc, { name, condition, value }) => {
      if (_.isArray(value) && condition === 'updated') {
        const [value1, value2] = value;
        const itWas = hasChildren(value1);
        const itBecame = hasChildren(value2);
        acc.push(`${whSpaceForKey}- ${name}: ${itWas}`);
        acc.push(`${whSpaceForKey}+ ${name}: ${itBecame}`);
        return acc;
      }
      switch (condition) {
        case 'removed':
          acc.push(`${whSpaceForKey}- ${name}: ${hasChildren(value)}`);
          break;
        case 'added':
          acc.push(`${whSpaceForKey}+ ${name}: ${hasChildren(value)}`);
          break;
        default:
          acc.push(`${whSpaceForKey}  ${name}: ${hasChildren(value)}`);
      }
      return acc;
    }, []);
    return `{\n${allWithSign.join('\n')}\n${whSpaceForBracket}}`;
  };
  return iter(diff, 1);
};
