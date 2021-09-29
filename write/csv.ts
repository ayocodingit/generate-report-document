import fs from 'fs'
import * as json2csv from 'json2csv'
import { itemInterface } from '../interface'

const csv = (data: itemInterface[], file: string): Promise<string> => {
  return new Promise(resolve => {
    fs.stat(file, () => {
      let rows: string
      if (!fs.existsSync(file)) rows = json2csv.parse(data, { header: true })
      else rows = json2csv.parse(data, { header: false })
      fs.appendFileSync(file, rows)
      fs.appendFileSync(file, '\r\n')
      resolve(file)
    })
  })
}

export default csv
