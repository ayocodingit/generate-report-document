import { payloadInterface } from '../interface'

const properties = {
  fileName: ['body', 'fileName'],
  project: ['body', 'project']
}

export default (req: any): payloadInterface => {
  const item: any = {}
  for (const key in properties) {
    let payload = req
    for (const path of properties[key]) {
      payload = payload[path]
    }
    item[key] = payload
  }
  item.extension = 'csv'
  return item
}
