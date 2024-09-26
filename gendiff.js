#!/usr/bin/env node
import { program } from "commander";
import compareData from "./src/compareData.js";

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V --version', 'output the version number')
  .helpOption('-h --help', 'output usage information')
  .option('-f --format [type]', 'output format', 'default')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(compareData(filepath1, filepath2, options.format));
  })
  .parse();
