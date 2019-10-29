import React, { useState, Fragment } from 'react'
import Image from '@components/Image/Image'
import Counter from '@components/Counter/Counter'
import Modal from '@components/Modal/Modal'
import { toCurrency } from '@utils/tool'
import styles from './CartProductItem.scss'

const CartProductItem = ({ goodId, image, name, price, styleInfo, quantity, amount, handleItemChange, isSimple }) => {
    const handleCounterChange = ({ count, setValue }) => {
        let totalAmount = amount - count * price + setValue * price
        handleItemChange({ styleInfo, count, totalAmount })
    }
    const [modalContent, setModalContent] = useState(null)
    const onClose = () => setModalContent(null)
    const handleProductRemove = e => {
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
    }
    return (
        <div className={styles.cartProductItem}>
            <Image src={image} className={`${isSimple ? styles.simpleProductImg : styles.productImg}`} />
            <dl className={styles.productInfo}>
                <dt>
                    <div className={styles.productName}>{name}</div>
                    <div className={`ehsPrice ${styles.productPrice}`}>{toCurrency(price)}</div>
                    <div className={styles.styleInfo}>{styleInfo.title}</div>
                </dt>
                {!isSimple && (
                    <dd className={styles.counter}>
                        <Counter quantity={quantity} handleCounterChange={handleCounterChange} />
                        <div className={`icon-bin ${styles.productRemove}`} onClick={handleProductRemove} />
                    </dd>
                )}
            </dl>
            <Modal {...modalContent} />
        </div>
    )
}
export default CartProductItem
