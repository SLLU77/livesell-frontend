import 'isomorphic-fetch'
import React, { useState } from 'react'
import Layout from '@components/Layout/Layout'
import Modal from '@components/Modal/Modal'
import Swiper from 'react-id-swiper'
import styles from './detail.scss'
import ProductList from '@components/ProductList/ProductList'
import { Form, Select, Option } from '@components/Form/Form'

const productListData = Array(6)
    .fill(1)
    .map((num, i) => {
        return {
            name: 'FRANKIE GOES TO Design 純棉T恤',
            image: `/static/images/470x600-0${i + 1}.jpg`,
            price: 699,
            goodId: i
        }
    })
const Detail = ({ product, ...props }) => {
    const [modalContent, setModalContent] = useState(null)
    const [styleId, setStyleId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [instock, setInstock] = useState(0)
    const styleInfoChange = ({ target: { value } }) => {
        setStyleId(value)
        setQuantity('')
        value ? setInstock(product.styleInfo.filter(item => item.value === value)[0]['quantity']) : setInstock(0)
    }
    const addToCart = async e => {
        if (!styleId || !quantity) {
            setModalContent({
                content: '請選擇顏色數量',
                cancelText: null,
                onClose: () => setModalContent(null)
            })
            return
        }
        const result = await fetch('/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goodId: product.goodId,
                styleId,
                quantity: Number(quantity)
            })
        })
        const { isSuccess, errorMsg } = await result.json()
        if (isSuccess) {
            location.href = '/cart'
        } else {
            setModalContent({
                content: errorMsg,
                cancelText: null
            })
        }
    }
    const handleFavoriteClick = e => {
        console.log('加入收藏')
    }
    return (
        <Layout hasFooter={false}>
            <Swiper>
                {product.image && (
                    <div className={styles.productImg}>
                        <img src={product.image} alt={product.name} />
                    </div>
                )}
            </Swiper>
            <div className={styles.productInfo}>
                {product.name && <h2 className={styles.productName}>{product.name}</h2>}
                {product.promoMsg && <h3 className={styles.productSubTitle}>{product.promoMsg}</h3>}
                {product.description && <div className={styles.productDesc}>{product.description}</div>}
                {product.styleInfo && product.styleInfo.length > 0 && (
                    <Form autoComplete="off">
                        <Select id="styleInfo" name="styleInfo" value={styleId} onChange={styleInfoChange}>
                            <Option text="請選擇" />
                            {product.styleInfo.map(item => (
                                <Option key={item.value} text={item.title} value={item.value} />
                            ))}
                        </Select>
                        <Select
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        >
                            <Option text="請選擇" />
                            {Array(instock)
                                .fill(1)
                                .map((num, i) => {
                                    let value = num + i
                                    return <Option key={value} text={value} value={value} />
                                })}
                        </Select>
                    </Form>
                )}
            </div>
            {/* <div className={styles.youMayAlsoLike}>
                <h3>猜你會喜歡</h3>
                <ProductList data={productListData} />
            </div> */}
            <div className={styles.footerBar}>
                <div className={`icon-heart ${styles.favoriteBtn}`} onClick={handleFavoriteClick} />
                <button className={styles.checkoutBtn} onClick={addToCart}>
                    立即購買
                </button>
            </div>
            <Modal {...modalContent} />
        </Layout>
    )
}

Detail.getInitialProps = async ({ req, query }) => {
 //   const res = await fetch(`https://liveserverpy.herokuapp.com/api/v1/products/${query.goodId}`)
    const res = await fetch(`https://flask-shopping.herokuapp.com/api/v1/product/2`)
    const json = await res.json()
    console.log(json)
    return { product: json }
}
export default Detail
