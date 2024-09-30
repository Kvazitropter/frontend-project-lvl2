import path from 'path';
import getData from './getData.js';
import parseData from './parseData.js';
import compareData from './compareData.js';
import formatOutput from './formatOutput.js';

export default (filepath1, filepath2, format) => {
  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);

  return formatOutput(compareData(
    parseData(getData(filepath1), extension1),
    parseData(getData(filepath2), extension2),
  ), format);
};
