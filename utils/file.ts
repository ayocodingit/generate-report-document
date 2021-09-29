import dir from './dir'
import fs from 'fs'

const filePath = (project: string): string => {
  const path: string = `${dir}/${project}`
  if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      })
  }
  return path;
}

const makeFile = (fileName: string, project: string, extension: string): string => {
  return `${filePath(project)}/${fileName}.${extension}`
}

const destroyFile = (file: string): Promise<string> => {
  return new Promise(resolve => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(`${file}`)
        resolve("Succesfully deleted ...")
      } else {
        throw Error("File not found !")
      }
  })
}

export {
  makeFile,
  destroyFile
}