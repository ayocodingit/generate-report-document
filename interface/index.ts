export interface itemInterface {
  [key: string]: string | number | boolean | Date
}

export interface payloadInterface {
  fileName: string,
  project: string,
  extension: string
}

export interface responseInterface {
  csv: string,
  xlsx: string
}
