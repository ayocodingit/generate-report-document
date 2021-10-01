import { responseInterface } from '../interface'
import { fileReplace, urlFile } from '../utils/file'

const response = (file: string, extension: string): responseInterface => {
  const response: any = {}
  response.csv = urlFile(fileReplace(file, extension, 'csv'))
  response.xlsx = urlFile(fileReplace(file, extension, 'xlsx'))
  response.pdf = urlFile(fileReplace(file, extension, 'pdf'))
  return response
}

export default response
