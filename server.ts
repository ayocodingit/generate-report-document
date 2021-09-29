import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import dir from './utils/dir'
import verifyApiKey from './utils/verifyApiKey'
import './utils/schedule'
import writeCsv from './write/csv'
import { item } from './interface'
import { destroyFile, makeFile } from './utils/file'
import validate from './validate'
import { schemaFile, schemaWrite, schemaParams } from './validate/schemas'
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/' + dir, express.static(dir))

app.post('/write/:extension', validate(schemaWrite, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    await verifyApiKey(req.query.api_key)
    const fileName: string = req.body.fileName
    const project: string = req.body.project
    const data: item[] = req.body.data
    const extention: string = req.params.extension
    const file: string = makeFile(fileName, project, extention)
    if (extention === 'csv') await writeCsv(data, file)
    return res.send(`${process.env.APP_URL}/${file}`)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/destroy/:extension', validate(schemaFile, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    await verifyApiKey(req.query.api_key)
    const fileName: string = req.body.fileName
    const project: string = req.body.project
    const extention: string = req.params.extension
    return res.send(await destroyFile(makeFile(fileName, project, extention)))
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/download/:extension', validate(schemaFile, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    await verifyApiKey(req.query.api_key)
    const fileName: string = req.body.fileName
    const project: string = req.body.project
    const extention: string = req.params.extension
    const file: string = makeFile(fileName, project, extention)
    return res.send(`${process.env.APP_URL}/${file}`)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
