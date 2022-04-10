#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    gendiff(filepath1, filepath2, options.format);
    // console.log(gendiff(filepath1, filepath2, options.format));
  })
  .parse(process.argv);
