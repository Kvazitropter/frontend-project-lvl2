import _ from 'lodash';

const getSign = (status = 'none') => {
  switch (status) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    case 'unchanged':
    case 'nested':
      return '  ';
    case 'changed':
    case 'none':
      return '';
    default:
      throw new Error(`Invalid status: ${status}`);
  }
};

const formatLine = (key, value, sign = '', indentChar = ' ', indentSize = 2, backIndentSize = 0, depth = 1) => {
  if (_.isObject(value)) {
    const lines = Object.entries(value).map(
      ([nKey, nValue]) => formatLine(nKey, nValue, getSign(), indentChar, indentSize, 0, depth + 1),
    );
    const formattedValue = ['{', ...lines, `${indentChar.repeat(indentSize * depth)}}`].join('\n');

    return `${indentChar.repeat(indentSize * depth - backIndentSize)}${sign}${key}: ${formattedValue}`;
  }

  return `${indentChar.repeat(indentSize * depth - backIndentSize)}${sign}${key}: ${value}`;
};

const stylish = (data, indentChar = ' ', indentSize = 4, backIndentSize = 2, depth = 1) => {
  const lines = data.flatMap(({
    key, status, oldValue, newValue, value, children,
  }) => {
    const sign = getSign(status);

    if (status === 'nested') {
      const nestedValue = stylish(children, indentChar, indentSize, backIndentSize, depth + 1);
      return formatLine(key, nestedValue, sign, indentChar, indentSize, backIndentSize, depth);
    }

    if (status === 'changed') {
      return [
        formatLine(key, oldValue, getSign('deleted'), indentChar, indentSize, backIndentSize, depth),
        formatLine(key, newValue, getSign('added'), indentChar, indentSize, backIndentSize, depth),
      ];
    }

    return formatLine(key, value, sign, indentChar, indentSize, backIndentSize, depth);
  });

  return ['{', ...lines, `${indentChar.repeat(indentSize * (depth - 1))}}`].join('\n');
};

export default stylish;
