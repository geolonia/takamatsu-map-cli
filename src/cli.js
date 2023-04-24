#!/usr/bin/env node

import { build } from './command/build.js';
import { serve } from './command/serve.js';

serve('./hello.csv');
// build('./hello.csv', './test');