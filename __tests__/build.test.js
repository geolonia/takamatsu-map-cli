const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const { build } = require('../src/command/build.js');

const testDataPath = path.join(__dirname, 'test_data.csv');
const testOutputPath = path.join(__dirname, 'output');

describe('build', () => {

  beforeEach(() => {
    const testData = 'latitude,longitude,header3\r\nvalue1,value2,value3';
    fs.writeFileSync(testDataPath, testData);

    process.exit = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    fs.rmSync(testDataPath);
    fs.rmSync(testOutputPath, { recursive: true, force: true });
  });

  it('correctly processes the CSV and creates the output directory and files', async () => {
    await build(testDataPath, testOutputPath);

    expect(fs.existsSync(path.join(testOutputPath, 'data.csv'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputPath, 'index.html'))).toBe(true);

    const outputCsv = fs.readFileSync(path.join(testOutputPath, 'data.csv'), 'utf-8');
    expect(outputCsv).toEqual(expect.stringContaining('緯度,経度,header3\r\nvalue1,value2,value3'));
  });

  it('should throw an error if the input file does not exist', async () => {

    try {
      await build('nonexistent.csv', testOutputPath);
    } catch (error) {
    }

    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Please specify input file');
  });

  it('should throw an error if the file extension is not .csv', async () => {

    try {
      await build('data.txt', testOutputPath);
    } catch (error) {
    }

    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Please specify csv file');
  });
});
