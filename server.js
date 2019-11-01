'use strict'

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const fetch = require('node-fetch')
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    
    server.use(bodyParser())

    // 商品列表 (首頁)
    router.get(`/`, async ctx => {
        ctx.status = 200
        await app.render(ctx.req, ctx.res, '/list', ctx.request.body)
        ctx.respond = false
    })
    // 商品頁
    router.get(`/product/:productId`, async ctx => {
        ctx.status = 200
        const { productId } = ctx.params
        const query = { ...ctx.query, productId }
        await app.render(ctx.req, ctx.res, '/product', query)
        ctx.respond = false
    })

   
	// 送出結帳
    router.post(`/checkout`, async ctx => {
        try {
            const res = await fetch(
                `https://flask-shopping.herokuapp.com/api/v1/order`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ctx.request.body)
                }
            )
            console.log(JSON.stringify(ctx.request.body))
            
            const { orderId, isSuccess, message } = await res.json()
            console.log(message)
            ctx.status = 200
            ctx.body = {
                orderId,
                isSuccess,
                errorMsg: message === "order create success" ? '結帳完成' : '無法結帳，請稍後再試'
              //  errorMsg: ''
            }
        } catch (err) {
            console.log('error=', err)
        }
    })

    router.all('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
