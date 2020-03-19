const Koa = require('./koa-mini')
const app = new Koa()

console.log('===========')
app.use(async (ctx, next) => {
  if (ctx.req.url === '/favicon.ico') {
    return ctx.body = 'favicon'
  } else {
    next()
  }
})


app.use(async (ctx, next) => {
  console.log('test1 start')
  ctx.body = 'test1'
  await next()
  console.log('test1 end')
})

app.use(async (ctx, next) => {
  console.log('test2 start')
  ctx.body = 'test2'
  await next()
  console.log('test2 end')
})

app.listen(3000)
