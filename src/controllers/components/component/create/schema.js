const Joi = require('joi')

const schema = Joi.object({
  component: Joi.string().valid('header', 'footer', 'home', 'understand_hidradenitis', 'support_group', 'scientific_info', 'frequently_questions', 'about_us').required()
})

const validate = async (data) => {
  return schema.validateAsync(data)
}

module.exports = validate
