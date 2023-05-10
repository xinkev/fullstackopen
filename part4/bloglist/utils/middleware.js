const logger = require("./logger")

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  const errorName = error.name
  if (errorName === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (errorName === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (errorName === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
