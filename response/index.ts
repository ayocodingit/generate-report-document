import { fileReplace, urlFile } from "../utils/file"

const response = (file: string) => {
  const response: any = {}
  response.csv = urlFile(file)
  response.xlsx = urlFile(fileReplace(file, 'csv', 'xlsx'))
  return response
}

export default response