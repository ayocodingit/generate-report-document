import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import dir from './utils/dir'
import './utils/schedule'
import writeCsv from './write/csv'
import writeXlsx from './write/xlsx'
import { itemInterface } from './interface'
import { destroyFile, fileReplace, getFile } from './utils/file'
import validate from './validate'
import { schemaFile, schemaWrite, schemaParams } from './validate/schemas'
import verifyApiKey from './utils/verifyApiKey'
import response from './response'
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use('/' + dir, express.static(dir))

app.post('/report/write', validate(schemaWrite, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    verifyApiKey(req.query.api_key)
    const file: string = getFile(req)
    const data: itemInterface[] = req.body.data
    await writeCsv(data, file)
    writeXlsx(file)
    return res.json(response(file))
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/report/destroy', validate(schemaFile, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    verifyApiKey(req.query.api_key)
    const file: string = getFile(req)
    const fileXlsx: string = fileReplace(file, 'csv', 'xlsx')
    destroyFile(file)
    return res.send(destroyFile(fileXlsx))
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/report/download', validate(schemaFile, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    verifyApiKey(req.query.api_key)
    const file: string = getFile(req)
    return res.json(response(file))
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
