const Joi = require('joi')

const schema = Joi.object({
  component: Joi.string()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
