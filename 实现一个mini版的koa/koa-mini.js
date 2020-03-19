const http = require('http')

class Application {
  constructor () {
    this.middleware = []
  }

  listen (...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res)

      const fn = compose(this.middleware)
      await fn(ctx)

      ctx.res.end(ctx.body)
    })

    server.listen(...args)
  }

  use (middleware) {
    this.middleware.push(middleware)
  }
}

class Context {
  constructor (req, res) {
    this.req = req
    this.res = res
  }
}

function compose (middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      const middleware = middlewares[i]
      if (i === middlewares.length) return
      return middleware(ctx, () => dispatch(i + 1))
    }
    return dispatch(0)
  }
}

module.exports = exports = Application
