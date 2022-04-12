export default (diff) => {
  const iter = (arr, path) => {
    const formattedResult = arr.reduce((acc, [sign, key, value]) => {
      const ifUpdated = arr.filter(([, sameKey, value2]) => sameKey === key && value2 !== value);
      const type1 = typeof value === 'string';
      const newValue1 = Array.isArray(value) ? '[complex value]' : value;
      const withBrackets1 = newValue1 !== '[complex value]' && type1 ? `'${value}'` : newValue1;
      switch (sign) {
        case '-':
          if (ifUpdated.length !== 0) {
            const [[, , diffValue]] = ifUpdated;
            const type2 = typeof diffValue === 'string';
            const newValue2 = Array.isArray(diffValue) ? '[ complex value ]' : diffValue;
            const withBrackets2 = newValue2 !== '[complex value]' && type2 ? `'${diffValue}'` : newValue2;
            acc.push(`Property '${path}${key}' was updated. From ${withBrackets1} to ${withBrackets2}`);
          } else {
            acc.push(`Property '${path}${key}' was removed`);
          }
          break;
        case '+':
          if (ifUpdated.length === 0) {
            acc.push(`Property '${path}${key}' was added with value: ${withBrackets1}`);
          }
          break;
        default:
          if (Array.isArray(value)) {
            acc.push(iter(value, `${path}${key}.`));
          }
      }
      return acc;
    }, []);
    return formattedResult.join('\n');
  };
  return iter(diff, '');
};
