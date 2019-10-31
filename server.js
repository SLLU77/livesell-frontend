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
 
     // 加入購物車
     router.post(`/addToCart`, async ctx => {
        try {
            console.log('post addtocart')
        //    const res = await fetch('https://liveserverpy.herokuapp.com/api/v1/basket', {
            const res = await fetch('https://flask-shopping.herokuapp.com/api/v1/product', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_token: ctx.cookies.get('access_token'),
                    ...ctx.request.body
                })
            })

            console.log('post addtocart 2')
            const { access_token, isSuccess } = await res.json()
            console.log('await addtocart')
            console.log(isSuccess)
            console.log(access_token)
            if (isSuccess && access_token) {
                // set cookie
                ctx.cookies.set('access_token', access_token, {
                    maxAge: 10 * 60 * 1000,
                    httpOnly: false
                })
            }
            ctx.status = 200
            ctx.body = {
                isSuccess,
                errorMsg: isSuccess ? '' : '系統異常，無法加入購物車！1'
            }
        } catch (err) {
            console.log('error=', err)
        }
    })

     // 購物車 Step1
     router.get(`/cart`, async ctx => {
        try {
            const res = await fetch(
                'https://flask-shopping.herokuapp.com/api/v1/product'
            //    `https://liveserverpy.herokuapp.com/api/v1/basket?access_token=${ctx.cookies.get('access_token')}`
            )
            const cartList = await res.json()
            console.log('cartList==>', cartList)
          //  const query = { ...ctx.query, cartList: Array.isArray(cartList) ? cartList : [] }
            const query = { ...ctx.query, cartList: cartList }
          
            console.log('server', query)
            
            ctx.status = 200
            await app.render(ctx.req, ctx.res, '/cart', query)
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
