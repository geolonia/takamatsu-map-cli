#!/usr/bin/env node

const Papa = require('papaparse')
const { formatCsvHeader } = require('./formatCsvHeader')

module.exports.csv2geojson = (csv) => {

  const { data } = Papa.parse(csv)
  const formatted =  formatCsvHeader(data)
  const header = formatted[0]

  const features = formatted.slice(1).map((d) => {

    const properties = {}
    header.forEach((h, i) => {
      properties[h] = d[i]
    })

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [properties.経度, properties.緯度]
      },
      properties
    }
  })

  const geojson = {
    type: 'FeatureCollection',
    features: features
  }

  return geojson
}