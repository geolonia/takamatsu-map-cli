# takamatsu-map-cli

## インストール

```
$ git clone git@github.com:geolonia/takamatsu-map-cli.git
$ cd takamatsu-map-cli
$ npm install -g .
```

## 使い方サンプル

### ビルド

`target`ディレクトリに、 Takamatsu City SDK を使って `input.csv`を読み込んで表示するためのファイルを出力します。

```
$ takamatsumaps build input.csv target-dir
```

### サーブ

http://localhost:8080 で、input.csv をプレビューする環境が立ち上がります。ライブリロードに対応しています。

```
$ takamatsumaps serve input.csv
```
