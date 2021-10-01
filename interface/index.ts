export interface itemInterface {
  [key: string]: string | number | boolean | Date | object
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
