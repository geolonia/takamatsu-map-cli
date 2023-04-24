#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import http from 'http'
import open from 'open'
const __dirname = path.resolve();

export const serve = (source) => {
  const port = process.env.PORT || 8080

  // let sourcePath = path.resolve(process.cwd(), source);

  // if (! fs.existsSync(sourcePath)) {
  //   throw `${sourcePath}: No such file or directory`
  // }

  const server = http.createServer((req, res) => {
    const url = (req.url || '').replace(/\?.*/, '')

    switch (url) {
      case '/':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')

        const content = fs.readFileSync(path.join(__dirname, 'docs', 'serve.html'), 'utf-8')
        res.end(content)
        break;
    }
  })

  server.listen(port, () => {
    console.log(`Your map is running on http://localhost:${port}/\n`)
    open(`http://localhost:${port}`)
  })

  console.log('serve');
}