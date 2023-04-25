#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { formatCsvHeader } from '../lib/formatCsvHeader.js';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  fs.writeFileSync(path.join(targetPath, 'data.csv'), Papa.unparse(newCSV));
  fs.copyFileSync(path.join(__dirname, '..', '..', 'docs', 'index.html'), path.join(targetPath, 'index.html'));

  console.log('Build complete');
}