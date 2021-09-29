import dir from './dir'
import fs from 'fs'

const filePath = (project: string): string => {
  return `${dir}/${project}`;
}

const generateFilePath = (fileName: string, project: string): string => {
  const path: string = filePath(project)
  if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      })
  }
  return `${path}/${fileName}.csv`
}

export {
  generateFilePath,
  filePath
}