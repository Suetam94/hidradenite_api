const Joi = require('joi')

const schema = Joi.object({
  title: Joi.string(),
  media: Joi.string(),
  description: Joi.string()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
