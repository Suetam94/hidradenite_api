const Joi = require('joi')

const schema = Joi.object({
  componentId: Joi.number().required(),
  text: Joi.string().required(),
  identifier: Joi.string().required()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
