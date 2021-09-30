import convertCsvToXlsx from '@aternus/csv-to-xlsx'
import { destroyFile, filePath, fileReplace } from '../utils/file'
import fs from 'fs'

const extension = 'xlsx'

const xlsx = (file: string) => {
  try {
    const sourceSplit: string[] = fileReplace(file, 'csv', extension).split('/')
    const project:string = sourceSplit[1]
    const fileName:string = sourceSplit[3]
    const path = filePath(project, extension)
    const destination = `${path}/${fileName}`
    if (fs.existsSync(destination)) destroyFile(destination)
    convertCsvToXlsx(file, destination)
    return destination
  } catch (e) {
    console.error(e.toString())
    throw e
  }
}

export default xlsx
