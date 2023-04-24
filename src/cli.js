#!/usr/bin/env node

const { build } = require('./command/build');
const { serve } = require('./command/serve');

console.log(process.argv);

serve();
// build();