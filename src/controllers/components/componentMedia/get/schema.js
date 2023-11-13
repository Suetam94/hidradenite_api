const Joi = require('joi')

const schema = Joi.object({
  title: Joi.string(),
  media: Joi.string(),
  description: Joi.string(),
  identifier: Joi.string(),
  componentId: Joi.number()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
