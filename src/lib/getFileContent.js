const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const Papa = require('papaparse');

module.exports.getFileContent = (filePath) => {

  const ext = path.extname(filePath);
  let csv;

  if (ext === '.csv') {

    csv = fs.readFileSync(filePath, 'utf-8');

  } else if(ext === '.xlsx' || ext === '.xls') {

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    csv = XLSX.utils.sheet_to_csv(sheet);
  }

  const { data } = Papa.parse(csv);

  return data;
}