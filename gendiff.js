#!/usr/bin/env node
import { program } from 'commander';
import compareFiles from './src/genDiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V --version', 'show program\'s version number')
  .helpOption('-h --help', 'show usage information')
  .option('-f --format [type]', 'choose output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(compareFiles(filepath1, filepath2, options.format));
  })
  .parse();
