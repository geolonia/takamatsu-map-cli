#!/usr/bin/env node

import { build } from './command/build.js';
import { serve } from './command/serve.js';

console.log(process.argv);

serve();
// build('./hello.csv', './test');