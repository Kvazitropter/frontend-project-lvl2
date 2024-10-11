import path from 'path';
import getData from './getData.js';
import parsers from './parsers.js';
import compareData from './compareData.js';
import formatOutput from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);

  return formatOutput(compareData(
    parsers(getData(filepath1), extension1),
    parsers(getData(filepath2), extension2),
  ), format);
};
