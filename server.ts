import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import dir from './utils/dir'
import './utils/schedule'
import writeCsv from './write/csv'
import { itemInterface } from './interface'
import { destroyFile, getFile, urlFile } from './utils/file'
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
    const file: string = getFile(req)
    const data: itemInterface[] = req.body.data
    if (req.params.extension === 'csv') await writeCsv(data, file)
    const url: string = urlFile(file)
    return res.send(url)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/destroy/:extension', validate(schemaFile, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    const file: string = getFile(req)
    const deletedFile: string = await destroyFile(file)
    return res.send(deletedFile)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/download/:extension', validate(schemaFile, 'body'), validate(schemaParams, 'params'), async (req: any, res: any) => {
  try {
    const file: string = getFile(req)
    const url: string = urlFile(file)
    return res.send(url)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
