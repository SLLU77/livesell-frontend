import React from 'react'
import styles from './ProductItem.scss'
import Image from '@components/Image/Image'
import withPromoTag from '@hocs/withPromoTag/withPromoTag'
const ImageWithPromoTag = withPromoTag(Image)
const ProductItem = ({ product }) => {
    const handleClick = goodId => {
        // location.href = `/detail/${goodId}`
    }
    return 
}

export default ProductItem
