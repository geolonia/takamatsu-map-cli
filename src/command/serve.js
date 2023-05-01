#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const http = require('http')
const opener = require('opener')
const { WebSocketServer } = require('ws')
const watch = require('node-watch')
const Papa = require('papaparse')
const { csv2geojson } = require('../lib/csv2geojson')
const { formatCsvHeader } = require('../lib/formatCsvHeader')
const { getFileContent } = require('../lib/getFileContent')

module.exports.serve = (source) => {
  const port = process.env.PORT || 8080

  let sourcePath = path.resolve(process.cwd(), source);

  if (!fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  const ext = path.extname(sourcePath);

  if (ext !== '.csv' && ext !== '.xlsx' && ext !== '.xls') {
    throw `${sourcePath}: Not a CSV or Excel file`
  }

  const server = http.createServer(async (req, res) => {
    const url = (req.url || '').replace(/\?.*/, '')

    switch (url) {
      case '/':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')

        let content = fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'serve.html'), 'utf-8')
        content = content.replace(/___PORT___/g, `${port}`)

        res.end(content)
        break;
      case '/data.csv':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/csv; charset=UTF-8')

        const data = await getFileContent(sourcePath)
        const formatted = formatCsvHeader(data)

        res.end(Papa.unparse(formatted))
        break;
    }
  })

  server.listen(port, () => {
    console.log(`Your map is running on http://localhost:${port}/\n`)
    opener(`http://localhost:${port}`)
  })

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    watch(path.dirname(sourcePath), { recursive: true, filter: /\.(csv|xlsx|xls)$/ }, async (event, file) => {

      try {
        
        const data = await getFileContent(sourcePath)

        
        
        console.log('File updated')
        // const geojson = csv2geojson(data)
  
        // ws.send(JSON.stringify(geojson))

      } catch (e) {
        // Nothing to do
      }
    })
  });
}