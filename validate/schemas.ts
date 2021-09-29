import Joi from 'joi'

const pattern = /^[a-zA-Z]{3,10}-[0-9]{3,10}-[@#$&]{1,3}$/

export const schemaWrite = Joi.object({
  data: Joi.array().items(
    Joi.object().pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date()])
      .keys()
      .min(1)
      .max(1000)
  ).required(),
  fileName: Joi.string().required().regex(pattern),
  project: Joi.string().required()
})

export const schemaParams = Joi.object({
  extension: Joi.string().valid('csv')
})

export const schemaFile = Joi.object({
  fileName: Joi.string().required().regex(pattern),
  project: Joi.string().required()
})
