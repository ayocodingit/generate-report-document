import dir from './dir'
import fs from 'fs'
import { payloadInterface } from '../interface'
import payload from './payload'

const filePath = (project: string, extension: string): string => {
  const path: string = `${dir}/${project}/${extension}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {
      recursive: true
    })
  }
  return path
}

const checkFileDoesntExist = (file: string): void => {
  if (!fs.existsSync(file)) throw Error('File not found !')
}

const makeFile = (payload: payloadInterface): string => {
  return `${filePath(payload.project, payload.extension)}/${payload.fileName}.${payload.extension}`
}

const destroyFile = (file: string): string => {
  checkFileDoesntExist(file)
  fs.unlinkSync(file)
  return 'Succesfully deleted ...'
}

const urlFile = (file: string): string => {
  return fs.existsSync(file) ? `${process.env.APP_URL}/${file}` : null
}

const getFile = (req: any): string => {
  const items: payloadInterface = payload(req)
  return makeFile(items)
}

const fileReplace = (file: string, source: string, destination: string): string => {
  return file.split('/').map(item => {
    if (item === source) return destination
    return item.replace(source, destination)
  }).join('/')
}

export {
  makeFile,
  destroyFile,
  urlFile,
  getFile,
  filePath,
  fileReplace

}
