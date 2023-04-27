#!/usr/bin/env node

module.exports.formatCsvHeader = (csv) => {
  
  let header = csv[0];
  header = header.map((label) => {
    if (
      label === 'latitude' ||
      label === 'lat'
    ) {
      return '緯度';
    }
    if (
      label === 'longitude' ||
      label === 'lon' ||
      label === 'lng'
    ) {
      return '経度';
    }
    return label;
  });

  const newCSV = [
    header,
    ...csv.slice(1),
  ]

  return newCSV;
}
