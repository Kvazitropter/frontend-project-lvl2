export default (diff) => {
  if (diff.length === 0) {
    return '{}';
  };
  const iter = (arr, depth) => {
    const whSpaceForKey = ' '.repeat(2 * depth);
    const whSpaceForBracket = depth > 1 ? ' '.repeat(2 * (depth - 1)) : '';
    const withSign = arr.reduce((acc, [sign, key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${whSpaceForKey}${sign} ${key}: ${iter(value, depth + 1)}`);
      } else {
        acc.push(`${whSpaceForKey}${sign} ${key}: ${value}`);
      }
      return acc;
    }, []);
    return `{\n${withSign.join('\n')}\n${whSpaceForBracket}}`;
  };
  return iter(diff, 1);
};
