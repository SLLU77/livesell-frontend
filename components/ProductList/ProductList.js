import React from 'react'
import ProductItem from '@components/ProductItem/ProductItem'
import styles from './ProductList.scss'
const ProductList = ({ data = [] }) => {
    return (
        <div className={styles.productList}>
            {data.length > 0 && data.map(product => <ProductItem {...product} key={product.goodId} />)}
        </div>
    )
}
export default ProductList
