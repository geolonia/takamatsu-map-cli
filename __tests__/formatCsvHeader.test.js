const { formatCsvHeader } = require('../src/lib/formatCsvHeader.js');

describe('formatCsvHeader', () => {
  it('should convert latitude and lat to 緯度', () => {
    const csv = [
      ['lat', 'longitude', 'name'],
      ['12.345', '67.890', 'test'],
    ];
    const expected = [
      ['緯度', '経度', 'name'],
      ['12.345', '67.890', 'test'],
    ];
    const result = formatCsvHeader(csv);
    expect(result).toEqual(expected);
  });

  it('should convert longitude, lon, and lng to 経度', () => {
    const csv = [
      ['latitude', 'lon', 'name'],
      ['12.345', '67.890', 'test'],
    ];
    const expected = [
      ['緯度', '経度', 'name'],
      ['12.345', '67.890', 'test'],
    ];
    const result = formatCsvHeader(csv);
    expect(result).toEqual(expected);
  });

  it('should not modify other headers', () => {
    const csv = [
      ['name', 'age', 'gender'],
      ['test', '20', 'female'],
    ];
    const expected = [
      ['name', 'age', 'gender'],
      ['test', '20', 'female'],
    ];
    const result = formatCsvHeader(csv);
    expect(result).toEqual(expected);
  });
});
