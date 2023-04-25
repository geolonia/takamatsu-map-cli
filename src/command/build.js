#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { formatCsvHeader } from '../lib/formatCsvHeader.js';

export const build = async (dataPath, targetPath) => {

  if (!fs.existsSync(dataPath)) {
    console.error('Please specify input file');
    process.exit(1);
  }

  if (path.extname(dataPath) !== '.csv') {
    console.error('Please specify csv file');
    process.exit(1);
  }

  const csv = fs.readFileSync(dataPath, 'utf-8');
  const { data } = Papa.parse(csv);
  const newCSV = formatCsvHeader(data);

  fs.writeFileSync(path.join(targetPath, 'data.csv'), Papa.unparse(newCSV));

  if (!fs.existsSync(targetPath)) {
    console.error('Please specify output path');
    process.exit(1);
  }

  fs.copyFileSync('./docs/index.html', path.join(targetPath, 'index.html'));

  console.log('Build complete');
}