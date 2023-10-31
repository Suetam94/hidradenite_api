const Joi = require('joi')

const schema = Joi.object({
  title: Joi.string(),
  url: Joi.string(),
  category: Joi.string().allow('patient', 'doctor')
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
