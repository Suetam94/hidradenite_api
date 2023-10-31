const Joi = require('joi')

const schema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  category: Joi.string().valid('patient', 'doctor').required()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
