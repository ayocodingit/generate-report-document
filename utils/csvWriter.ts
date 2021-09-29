import fs from 'fs'
import * as json2csv from 'json2csv'
import { item } from '../interface';

const writer = (data: item[], filePath: string): Promise<string> => {
  return new Promise(resolve => {
    fs.stat(filePath, (err, stat) => {
      let rows: string;
      if (!fs.existsSync(filePath)) rows = json2csv.parse(data, { header: true });
      else rows = json2csv.parse(data, { header: false });
      fs.appendFileSync(filePath, rows);
      fs.appendFileSync(filePath, "\r\n");
      resolve(filePath)
    })
  })
}

const destroy = (filePath: string): Promise<string> => {
  return new Promise(resolve => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(`${filePath}`)
        resolve("Succesfully deleted ...")
      } else {
        throw Error("File not found !")
      }
  })
}

export {
  writer,
  destroy
}