const Joi = require('joi')

const schema = Joi.object({
  id: Joi.string().required(),
  componentId: Joi.number(),
  text: Joi.string(),
  identifier: Joi.string()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
