import React from 'react'
import styles from './ProductItem.scss'
import Image from '@components/Image/Image'
import withPromoTag from '@hocs/withPromoTag/withPromoTag'
const ImageWithPromoTag = withPromoTag(Image)
const ProductItem = ({ goodId, image, name, price, promoMsg, ...props }) => {
    const handleClick = e => {
        location.href = `/detail/${goodId}`
    }
    return (
        <div className={styles.productItem} onClick={handleClick}>
            <ImageWithPromoTag src={image} className={styles.productImg} promoMsg={promoMsg} />
            <ul className={styles.productInfo}>
                <li className={styles.productName}>{name}</li>
                <li className={`ehsPrice ${styles.productPrice}`}>{price}</li>
            </ul>
        </div>
    )
}
export default ProductItem
