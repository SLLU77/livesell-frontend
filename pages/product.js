import React,{useState,useEffect} from 'react'
import 'isomorphic-fetch'
import Layout from '@components/Layout/Layout'
import Modal from '@components/Modal/Modal'
import { Form, Select, Option } from '@components/Form/Form'
import styles from './product.scss'



const Product = ({product, productId})=>{
    const [modalContent, setModalContent] = useState(null)
    const addToCart = async e => {
        setModalContent({
            content: '請選擇顏色數量',
            cancelText: null,
            onClose: () => setModalContent(null)
        })
        location.href = `/cart?productId=${productId}`
    }

    return (
        <Layout hasFooter={false}>
            <div className={styles.productDetail}>
                <div className={styles.imgWrapper}> 
                    <img src={product.product.image} />
                    <div className={styles.productInfo}> 
                        <p className={styles.productName}>
                            {product.product.name}
                        </p>
                        <p className={styles.productPrice}> 
                            {product.product.price}
                        </p>
                    </div>
                    
                </div>
                <p className={styles.productDescription}>
                            {product.product.description}
            </p>
            </div>

            <div className={styles.footerBar}>
                {/* <div className={`icon-heart ${styles.favoriteBtn}`} onClick={handleFavoriteClick} /> */}
                <div className={styles.checkoutBtn} onClick={addToCart}>
                    立即購買
                </div>
            </div>
        </Layout>
    )
}

Product.getInitialProps = async ({ req, query }) => {
    console.log('query: ', query);
    const res = await fetch(`https://flask-shopping.herokuapp.com/api/v1/product/${query.productId}`)
    const json = await res.json()
    const productId = query.productId;
    console.log('json: ', json);
    return { product: json, productId }
}
export default Product 