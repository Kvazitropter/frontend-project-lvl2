import _ from 'lodash';

const formatLine = (pathToKey, message) => `Property '${pathToKey.join('.')}' ${message}`;

const formatValue = (value) => {
  if (_.isObject(value)) { return '[complex value]'; }
  if (typeof value === 'string') { return `'${value}'`; }
  return value;
};

const formatMessage = ({
  value, oldValue, newValue, status,
}) => {
  switch (status) {
    case 'added':
      return `was added with value: ${formatValue(value)}`;
    case 'changed':
      return `was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
    case 'deleted':
      return 'was removed';
    default:
      throw new Error(`Invalid status: ${status}`);
  }
};

const plain = (data, path = []) => {
  const lines = data.flatMap((entry) => {
    const { key, status } = entry;
    const pathToKey = [...path, key];

    if (status === 'nested') {
      return plain(entry.children, pathToKey);
    }

    if (status === 'unchanged') { return []; }

    return formatLine(pathToKey, formatMessage(entry));
  });

  return lines.join('\n');
};

export default plain;
