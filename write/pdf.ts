import fs from 'fs'
import carbone from 'carbone'

var options = {
  convertTo : 'pdf'
};

const pdf = (template: string, file: string, data: any) => {
  return new Promise((resolve) => {
    carbone.render(`./resources/pdf/${template}.odt`, data, options, function (err, result) {
      if (err) throw err;
      fs.writeFileSync(file, result);
      resolve(file)
    })
  })
}

export default pdf


