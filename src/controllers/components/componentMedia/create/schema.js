const Joi = require('joi')

const schema = Joi.object({
  title: Joi.string().required(),
  files: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().required()
    }).required()
  ).required(),
  description: Joi.string(),
  identifier: Joi.string().required(),
  componentId: Joi.number().required()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
