const Joi = require('joi')

const schema = Joi.object({
  id: Joi.number().required(),
  component: Joi.string().valid('header', 'footer', 'home', 'understand_hidradenitis', 'support_group', 'scientific_info', 'frequently_questions', 'about_us')
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
