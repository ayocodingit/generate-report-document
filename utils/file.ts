import dir from './dir'
import fs from 'fs'
import { payloadInterface } from '../interface'

const filePath = (project: string): string => {
  const path: string = `${dir}/${project}`
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
  return `${filePath(payload.project)}/${payload.fileName}.${payload.extension}`
}

const destroyFile = (file: string): Promise<string> => {
  checkFileDoesntExist(file)
  return new Promise(resolve => {
    fs.unlinkSync(file)
    resolve('Succesfully deleted ...')
  })
}

const urlFile = (file: string): string => {
  checkFileDoesntExist(file)
  return `${process.env.APP_URL}/${file}`
}

export {
  makeFile,
  destroyFile,
  urlFile
}
