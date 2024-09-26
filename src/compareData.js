import path from 'path';
import getData from './getData.js';
import parseData from './parseData.js';

export default (filepath1, filepath2, format) => {
  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);
  const data1 = parseData(getData(filepath1), extension1);
  const data2 = parseData(getData(filepath2), extension2);
};
