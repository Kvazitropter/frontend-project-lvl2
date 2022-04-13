import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error('unsupported output format');
  }
};
