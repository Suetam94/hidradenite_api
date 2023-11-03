const Joi = require('joi')

const schema = Joi.object({
  id: Joi.string().required()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
