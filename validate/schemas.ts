import Joi from 'joi'

const schemaGlobal = {
  fileName: Joi.string().required().alphanum(),
  project: Joi.string().required().alphanum()
}

export const schemaWrite = Joi.object({
  ...schemaGlobal,
  data: Joi.array().items(
    Joi.object().pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date()])
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
