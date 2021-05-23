require('colors')
require('dotenv').config()
const fs = require('fs').promises
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
// const Cookies = require('js-cookie')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = 4000

app
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use('/images', express.static(path.join(__dirname, 'storage')))

const getJson = async (filename, ext) => {
  const data = await fs.readFile(path.join(__dirname, 'data', filename + '.json'))
  return JSON.parse(data.toString())
}

const writeJson = async (filename, write) => {
  await fs.writeFile(path.join(__dirname, 'data', filename + '.json'), JSON.stringify(write))
  return 'OK'
}

fs.readdir(path.join(__dirname, 'data')).then((files) => {
  files.forEach((file) => {
    if (/\.json$/.test(file)) {
      const arrFilename = file.split('.')
      const ext = arrFilename.splice(arrFilename.length - 1, 1)[0]
      const name = arrFilename.join('')

      app.get(`/api/${name}`, async (req, res) => {
        const data = await getJson(name, ext)
        console.log(`get name:${name}`.blue)
        res.send(data)
      })

      app.get(`/api/${name}/:id?`, async (req, res) => {
        const { id } = req.params
        const data = await getJson(name, id)
        console.log(`get name:${name}, id:${id}`.blue)
        res.send(data.find((p) => Number(p.id) === Number(id)))
      })

      app.get(`/api/${name}/search`, async (req, res) => {
        const { type, keyword } = req.query
        const data = await getJson(name)
        res.send(data.filter((p) => p[type] === keyword))
      })

      app.post(`/api/${name}`, async (req, res) => {
        const body = req.body
        const data = await getJson(name)
        const createId = data.length ? Math.max(...data.map((p) => Number(p.id))) + 1 : 1
        body.id = createId
        data.push(body)
        await writeJson(name, data)
        console.log(`post name:${name}, createId:${createId}, length:${data.length}`.green)
        res.send(body)
      })

      app.put(`/api/${name}/:id?`, async (req, res) => {
        const body = req.body
        const { id } = req.params
        const data = await getJson(name)
        const target = data.find((p) => Number(p.id) === Number(id))
        Object.keys(body).forEach((key) => {
          target[key] = body[key]
        })
        await writeJson(name, data)
        console.log(`put name:${name}, id:${id}`.yellow)
        res.send()
      })

      app.delete(`/api/${name}/:id?`, async (req, res) => {
        const { id } = req.params
        const data = await getJson(name)
        const index = data.map((p) => Number(p.id)).indexOf(Number(id))
        data.splice(index, 1)
        await writeJson(name, data)
        console.log(`delete name:${name}, id:${id}, index:${index}, length:${data.length}`.red)
        res.send()
      })
    }
  })
})

app.post('/api/login', (req, res) => {
  res.send({
    accountToken: 'token account',
    refreshToken: 'refresh token',
  })
})

app.listen(port)
console.log(`http://localhost:${port}/`)
