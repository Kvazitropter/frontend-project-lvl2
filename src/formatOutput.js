import _ from 'lodash';

const stylish = (data, depth = 1) => {
  const signs = {
    added: '+',
    deleted: '-',
    unchanged: ' ',
  };

  const formatLine = (key, value, status = 'unchanged') => {
    const sign = signs[status] ?? ' ';
    return `${'  '.repeat(depth)}${sign} ${key}: ${value}`;
  };

  const formatValue = (val) => {
    if (_.isObject(val)) {
      return stylish(
        Object.entries(val)
          .map(([key, value]) => ({ key, value, status: 'unchanged' })),
        depth + 2,
      );
    }
    return val;
  };

  const lines = data.reduce((acc, entry) => {
    const { key, status } = entry;

    switch (status) {
      case 'changed':
        return [
          ...acc,
          formatLine(key, formatValue(entry.oldValue), 'deleted'),
          formatLine(key, formatValue(entry.newValue), 'added'),
        ];
      case 'added':
      case 'deleted':
      case 'unchanged':
        return [
          ...acc,
          formatLine(key, formatValue(entry.value), status),
        ];
      case 'nested':
        return [
          ...acc,
          formatLine(key, stylish(entry.children, depth + 2), status),
        ];
      default:
        throw new Error('invalid status of the file entry');
    }
  }, []);

  lines.unshift('{');
  lines.push(`${'  '.repeat(depth - 1)}}`);

  return lines.join('\n');
};

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error('invalid format');
  }
};
