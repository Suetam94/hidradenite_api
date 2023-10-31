const errorHandler = (err, req, res, next) => {
  const { details } = err

  if (details && details.length > 0) {
    const errors = err.details.map(detail => detail.message)
    return res.status(400).json({
      message: errors.join('; '),
      status: 400,
      type: 'validation error'
    }).send()
  } else if (err.type === 'not exist') {
    return res.status(400).json({
      message: err.message,
      status: 400,
      type: err.type
    })
  }

  return res.status(500).json(err).send()
}

module.exports = errorHandler
