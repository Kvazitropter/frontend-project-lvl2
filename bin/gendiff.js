#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    console.log(genDiff(filepath1, filepath2, formatName));
  });

program.parse();
