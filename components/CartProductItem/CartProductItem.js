import React, { useState, Fragment } from 'react'
import Image from '@components/Image/Image'
import Counter from '@components/Counter/Counter'
import Modal from '@components/Modal/Modal'
import { toCurrency } from '@utils/tool'
import styles from './CartProductItem.scss'

const CartProductItem = ({description, image, name, price, ...product }) => {
   // const CartProductItem = ({ ...product }) => {
 
    console.log(product)
    /*
    console.log(product.description)
    console.log(product.image)
    console.log(product.name)
    console.log(product.price)
    console.log(product.amount)
    */

   const [amount, setAmount] = useState(1)
   console.log(amount)
    console.log(image)

    const handleCounterChange = ({ count, setValue }) => {
      /*  
        let totalAmount = amount - count * price + setValue * price
        handleItemChange({ styleInfo, count, totalAmount })
    */
   console.log(setValue)
    }

    const [modalContent, setModalContent] = useState(null)
    const onClose = () => setModalContent(null)
    const handleProductRemove = e => {
        /*
        setModalContent({
            content: '是否確定刪除商品？',
            submitClick: async () => {
                const result = await fetch('/removeCart', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        goodId: goodId
                    })
                })
                const { isSuccess, message } = await result.json()
                setModalContent({
                    content: isSuccess ? '成功刪除' : message,
                    cancelText: null,
                    onClose: () => {
                        onClose()
                        location.reload()
                    }
                })
            },
            onClose
        })
        */
    }
    return (
        <div className={styles.cartProductItem}>
            <Image src={image} className={styles.productImg} />
            <dl className={styles.productInfo}>
                <dt>
                    <div className={styles.productName}>{name}</div>
                    <div className={`ehsPrice ${styles.productPrice}`}>{toCurrency(price)}</div>
                    <div className={styles.styleInfo}>{description}</div>
                </dt>
            </dl>
            
            
        </div>
    )
}
export default CartProductItem
