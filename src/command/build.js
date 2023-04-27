#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const XLSX = require('xlsx');
const { formatCsvHeader } = require('../lib/formatCsvHeader.js');

module.exports.build = async (dataPath, targetPath) => {

  if (!fs.existsSync(dataPath)) {
    console.error('Please specify input file');
    process.exit(1);
  }

  const ext = path.extname(dataPath);

  if (ext !== '.csv' && ext !== '.xlsx' && ext !== '.xls') {
    console.error('Please specify CSV or Excel file');
    process.exit(1);
  }

  let csv;

  if (ext === '.csv') {

    csv = fs.readFileSync(dataPath, 'utf-8');

  } else if(ext === '.xlsx' || ext === '.xls') {

    const workbook = XLSX.readFile(dataPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    csv = XLSX.utils.sheet_to_csv(sheet);
  }

  const { data } = Papa.parse(csv);
  const newCSV = formatCsvHeader(data);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  fs.writeFileSync(path.join(targetPath, 'data.csv'), Papa.unparse(newCSV));
  fs.copyFileSync(path.join(__dirname, '..', '..', 'docs', 'index.html'), path.join(targetPath, 'index.html'));

  console.log('Build complete');
}