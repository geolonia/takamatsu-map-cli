#!/usr/bin/env node

const { build } = require('./command/build.js');
const { serve } = require('./command/serve.js');

const command = process.argv[2];

if (command === 'build') {
  const input = process.argv[3];
  const output = process.argv[4];

  if (!input) {
    console.log('Please specify input file');
    process.exit(1);
  }

  if (!output) {
    console.log('Please specify output path');
    process.exit(1);
  }

  build(input, output);
} else if (command === 'serve') {

  const input = process.argv[3];

  if (!input) {
    console.log('Please specify input file');
    process.exit(1);
  }
  
  serve(input);
} else {
  console.log('Unknown command');
}