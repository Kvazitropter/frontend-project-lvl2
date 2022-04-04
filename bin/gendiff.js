#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => {
    const absPath1 = path.join(process.cwd(), filepath1);
    const absPath2 = path.join(process.cwd(), filepath2);
    console.log(genDiff(absPath1, absPath2));
  });
program.parse();
