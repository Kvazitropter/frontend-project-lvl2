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
        return [
          ...acc,
          formatLine(key, value[0], 'deleted'),
          formatLine(key, value[1], 'added'),
        ];
      case 'added':
      case 'deleted':
      case 'unchanged':
        return [
          ...acc,
          formatLine(key, value, status),
        ];
      default:
        throw new Error('unknown status of the file entry');
    }
  }, []);

  return `{\n  ${lines.join('\n  ')}\n}`;
};

export default (data, format) => {
  switch (format) {
    default:
      return format1(data);
  }
};
