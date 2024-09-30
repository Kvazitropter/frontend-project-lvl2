const format1 = (data) => {
  const formatLine = (key, value, status) => {
    const signs = {
      added: '+',
      deleted: '-',
      unchanged: ' ',
    };

    return `${signs[status]} ${key}: ${value}`;
  };

  const lines = data.reduce((acc, { key, value, status }) => {
    switch (status) {
      case 'changed':
        acc.push(formatLine(key, value[0], 'added'));
        acc.push(formatLine(key, value[1], 'deleted'));
        break;
      case 'added':
      case 'deleted':
      case 'unchanged':
        acc.push(formatLine(key, value, status));
        break;
      default:
        throw new Error('unknown status of the file entry');
    }
    return acc;
  }, []);

  return `{\n  ${lines.join('\n  ')}\n}`;
};

export default (data, format) => {
  switch (format) {
    default:
      return format1(data);
  }
};
