const Joi = require('joi')

const schema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string(),
  url: Joi.string().uri(),
  category: Joi.string().valid('patient', 'doctor'),
  resume: Joi.string().allow(null, '')
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
