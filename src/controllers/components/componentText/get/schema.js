const Joi = require('joi')

const schema = Joi.object({
  componentId: Joi.number().required(),
  text: Joi.string(),
  identifier: Joi.string()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
