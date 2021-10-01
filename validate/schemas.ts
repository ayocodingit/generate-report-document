import Joi from 'joi'

const pattern = /^[a-zA-Z0-9-_]+$/

const schemaGlobal = {
  fileName: Joi.string().required().regex(pattern),
  project: Joi.string().required().regex(pattern),
  extension: Joi.string().valid('csv', 'pdf')
}

export const schemaWrite = Joi.object({
  ...schemaGlobal,
  template: Joi.any().when('extension', { is: 'pdf', then: Joi.string().required() }),
  data: Joi.array().items(
    Joi.object().pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date(), Joi.allow(null), Joi.array(), Joi.object()])
      .keys()
      .min(1)
  )
    .required()
    .max(1000)
})

export const schemaFile = Joi.object({
  ...schemaGlobal
})
