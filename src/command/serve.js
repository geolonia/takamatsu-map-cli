#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import http from 'http'
import open from 'open'
import Papa from 'papaparse'
import { WebSocketServer } from 'ws'
import watch from 'node-watch'
const __dirname = path.resolve();

export const serve = (source) => {
  const port = process.env.PORT || 8080

  let sourcePath = path.resolve(process.cwd(), source);

  if (!fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  if (path.extname(sourcePath) !== '.csv') {
    throw `${sourcePath}: Not a CSV file`
  }

  const server = http.createServer((req, res) => {
    const url = (req.url || '').replace(/\?.*/, '')

    switch (url) {
      case '/':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')

        let content = fs.readFileSync(path.join(__dirname, 'docs', 'serve.html'), 'utf-8')
        content = content.replace('___PORT___', `${port}`)

        res.end(content)
        break;
    }
  })

  server.listen(port, () => {
    // console.log(`Your map is running on http://localhost:${port}/\n`)
    open(`http://localhost:${port}`)
  })

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    watch(path.dirname(sourcePath), { recursive: true, filter: /\.csv$/ }, (event, file) => {

      try {
        const csv = fs.readFileSync(file, 'utf-8')
        const data = Papa.parse(csv, { header: true }).data

        const geojson = {
          type: 'FeatureCollection',
          features: data.map((d) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [d.経度, d.緯度]
            },
            properties: d
          }))
        }

        ws.send(JSON.stringify(geojson))

      } catch (e) {
        // Nothing to do
      }
    })
  });

}