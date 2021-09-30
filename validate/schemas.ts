import Joi from 'joi'

const pattern = /^[a-zA-Z0-9-_]+$/

const schemaGlobal = {
  fileName: Joi.string().required().regex(pattern),
  project: Joi.string().required().regex(pattern)
}

export const schemaWrite = Joi.object({
  ...schemaGlobal,
  data: Joi.array().items(
    Joi.object().pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date(), Joi.allow(null)])
      .keys()
      .min(1)
      .max(1000)
  ).required(),
})

export const schemaParams = Joi.object({
  extension: Joi.string().valid('csv')
})

export const schemaFile = Joi.object({
  ...schemaGlobal
})
