import { Schema } from "joi";

const validate = (schema: Schema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({ error: message })
    } else {
      next()
    }
  }
}

export default validate