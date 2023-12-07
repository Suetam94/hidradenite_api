const routeLog = (req, res, next) => {
  const info = {
    method: req.method,
    path: req.baseUrl
  }
  console.info(info)
  next()
}

module.exports = routeLog
