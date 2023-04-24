#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');


const build = async (dataPath, targetPath) => {

  if (!fs.existsSync(dataPath)) {
    console.error('入力ファイルがありません');
    process.exit(1);
  }

  if (path.extname(dataPath) !== '.csv') {
    console.error('CSV ファイルを指定してください');
    process.exit(1);
  }

  const csv = fs.readFileSync(dataPath, 'utf-8');
  const { data } = Papa.parse(csv);

  let header = data[0];
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
    ...data.slice(1),
  ]

  fs.writeFileSync(path.join(targetPath, 'data.csv'), Papa.unparse(newCSV));

  if (!fs.existsSync(targetPath)) {
    console.error('出力先がありません');
    process.exit(1);
  }

  fs.copyFileSync('./docs/index.html', path.join(targetPath, 'index.html'));
} 

build('./hello.csv', './test');














console.log(process.argv);
// start: csv を geojson に変換してライブリロード
// data.xls と data.csv があれば、data.xls を優先する

// build: html、css、js を docs に出力

// github actions で build + deploy する

// takamatsu-map-cli

// pwamap-cli

// まず出す日付を決める
// - 今日出すとか、2時間で出すとか。まず日付を決める。（その時までに、出来るものを頭の中で決めて決める）
// - 機能ベースで締切を決めない。
// - で、反応が良ければ、続きを開発する。
// もしかすると、数時間でやってると思わせるのが良い。


