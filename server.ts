import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import dir from './utils/dir'
import verifyApiKey from './utils/verifyApiKey'
import './utils/schedule'
import { destroy, writer } from './utils/csv'
import { item } from './interface'
import { generateFilePath, filePath } from './utils/generateFilePath'
import validate from './validate'
import { schemaDestroy, schemaWrite } from "./validate/schemas";


const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/' + dir, express.static(dir))

app.post('/write', validate(schemaWrite), async (req: any, res: any) => {
  try {
    await verifyApiKey(req.query.api_key)
    const fileName: string = req.body.fileName
    const data: item[] = req.body.data
    const project: string = req.body.project
    const filePath: string = generateFilePath(fileName, project)
    await writer(data, filePath)
    return res.send(`${process.env.APP_URL}/${filePath}`)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

app.post('/destroy', validate(schemaDestroy), async (req: any, res: any) => {
  try {
    await verifyApiKey(req.query.api_key)
    const fileName: string = req.body.fileName
    const project: string = req.body.project
    return res.send(await destroy(generateFilePath(fileName, project)))
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})