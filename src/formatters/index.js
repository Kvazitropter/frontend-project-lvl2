import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    case 'stylish':
      return stylish;
    default:
      throw new Error('unsupported output format');
  }
};
