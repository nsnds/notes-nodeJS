const Koa = require('koa')
const app = new Koa()

console.log(1)
app.use(async (ctx, next) => {
  if (ctx.req.url === '/favicon.ico') {
    return ctx.body = 'favicon'
  } else {
    next()
  }
})

app.use(async (ctx, next) => {
  console.log('Middleware 1 Start')
  await next()
  console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
  console.log('Middleware 2 Start')
  await next()
  console.log('Middleware 2 End')

  ctx.body = 'hello, world'
})
console.log(2)

app.listen(3000)
