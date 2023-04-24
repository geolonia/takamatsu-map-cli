#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const build = async (dataPath, targetPath) => {

  if (!fs.existsSync(dataPath)) {
    console.error('入力ファイルがありません');
    process.exit(1);
  }

  if (!fs.existsSync(targetPath)) {
    console.error('出力先がありません');
    process.exit(1);
  }

  fs.copyFileSync(dataPath, path.join(targetPath, 'data.csv'));
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


