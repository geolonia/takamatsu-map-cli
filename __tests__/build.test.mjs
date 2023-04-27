import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { build } from '../src/command/build';

jest.mock('fs');

describe('build', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fail if data file does not exist', async () => {
    const dataPath = 'non-existing-file.csv';
    const targetPath = 'target';
    fs.existsSync.mockReturnValue(false);

    await build(dataPath, targetPath);

    expect(fs.existsSync).toHaveBeenCalledWith(dataPath);
    expect(console.error).toHaveBeenCalledWith('Please specify input file');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should fail if data file is not csv', async () => {
    const dataPath = 'data.txt';
    const targetPath = 'target';
    fs.existsSync.mockReturnValue(true);
    path.extname.mockReturnValue('.txt');

    await build(dataPath, targetPath);

    expect(fs.existsSync).toHaveBeenCalledWith(dataPath);
    expect(path.extname).toHaveBeenCalledWith(dataPath);
    expect(console.error).toHaveBeenCalledWith('Please specify csv file');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should build successfully if csv file is provided', async () => {
    const dataPath = 'data.csv';
    const targetPath = 'target';
    const csv = `header1,header2\nvalue1,value2\nvalue3,value4\n`;
    const formattedCSV = [['HEADER1', 'HEADER2'], ['value1', 'value2'], ['value3', 'value4']];
    fs.existsSync.mockReturnValue(true);
    path.extname.mockReturnValue('.csv');
    fs.readFileSync.mockReturnValue(csv);
    Papa.parse.mockReturnValue({ data: formattedCSV });

    await build(dataPath, targetPath);

    expect(fs.existsSync).toHaveBeenCalledWith(targetPath);
    expect(fs.mkdirSync).toHaveBeenCalledWith(targetPath, { recursive: true });
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(targetPath, 'data.csv'),
      Papa.unparse(formattedCSV),
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(__dirname, '..', '..', 'docs', 'index.html'),
      path.join(targetPath, 'index.html'),
    );
    expect(console.log).toHaveBeenCalledWith('Build complete');
  });
});
