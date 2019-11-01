import React,{useState,useEffect} from 'react'
import 'isomorphic-fetch'
import Layout from '@components/Layout/Layout'
import styles from './product.scss'

const Product = ({product})=>{
    return (
        <Layout>
            <div className={styles.productDetail}>
            <img src={product.product.image} />
            </div>
        </Layout>
    )
}

Product.getInitialProps = async ({ req, query }) => {
    console.log('query: ', query);
    const res = await fetch(`https://flask-shopping.herokuapp.com/api/v1/product/${query.productId}`)
    const json = await res.json()
    console.log('json: ', json);
    return { product: json }
}
export default Product 