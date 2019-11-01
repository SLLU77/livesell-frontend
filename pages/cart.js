import 'isomorphic-fetch'
import Link from 'next/link'
import React, { useState, useEffect, Fragment } from 'react'
import Layout from '@components/Layout/Layout'
import CartProductItem from '@components/CartProductItem/CartProductItem'
import CartStep from '@components/CartStep/CartStep'
import Modal from '@components/Modal/Modal'
import { Label, Input, Select, Option } from '@components/Form/Form'
import { addressData } from '@utils/address'
import { toCurrency } from '@utils/tool'
import styles from './cart.scss'
const ENUM_STEP = {
    CART: 0,
    CHECKOUT: 1
}
const Cart = ({ product, productId, ...props }) => {

    const { CART, CHECKOUT } = ENUM_STEP
     const [step, setStep] = useState(ENUM_STEP.CART)
    // Modal
    const [modalContent, setModalContent] = useState(null)
    const onClose = () => setModalContent(null)
    const handleItemChange = ({ styleInfo, totalAmount, count }) => {
        setProducts(
            products.map(prod => (styleInfo.value === prod.styleInfo.value ? { ...prod, quantity: count } : prod))
        )
        setAmount(totalAmount)
    }
    // Checkout
    const [amount, setAmount] = useState(1)
	const [product_id, setProduct_id] = useState(3)
	const [receiver_product_type, setReceiver_product_type] = useState('64G')
    const [recode, setRecode] = useState('123')
    const [payment, setPayment] = useState(1)
    const [invoice, setInvoice] = useState(0)
    const [receiverCity, setReceiverCity] = useState('')
    const [receiverArea, setReceiverArea] = useState('')
    const [receiverAddr2, setReceiverAddr2] = useState('')
    const [receiverName, setReceiverName] = useState('')
    const [receiverPhone, setReceiverPhone] = useState('')
  
    
 
    const handleStepChange = () => {
        if (step === CART) {
            setStep(CHECKOUT)
        } else {
            submit()
        }
    }

    const submit = async () => {
        const res = await fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				amount,
				payment_id: payment,
				product_id,
				receiver_addr1: `${receiverCity}${receiverArea}`,
			    receiver_addr2: receiverAddr2,
			    receiver_name: receiverName,
			    receiver_phone: receiverPhone,
			    receiver_product_type,
                recode,
            })
        })
        const { orderId, isSuccess, errorMsg } = await res.json()
        if (isSuccess) {
            location.href = `/complete?orderId=${orderId}`
        } else {
            setModalContent({
                content: errorMsg,
                cancelText: null,
                onClose
            })
        }
    }
    return (
        <Layout
            disableCartBtn={true}
            hasFooter={false}
            handleBackClick={step === CHECKOUT ? () => setStep(ENUM_STEP.CART) : null}
        >
            <CartStep currentStep={step} />
            
            {/* Cart */}
            {
                    <CartProductItem
                        {...product.product }
                        key={productId}
                    />
            }

            {/* Checkout */}
            {step === CHECKOUT && (
                <Fragment>
                    <div className={`${styles.totalAmount}`}>
                        總金額<strong>{product.product.price}</strong>
                    </div>
                    <h2 className={styles.sectionTitle}>Payment</h2>
                    <ul className={styles.sectionBox}>
                        <li className={styles.sectionContent}>
                            <Input
                                type="radio"
                                id="atm"
                                name="payment"
                                onChange={e => setPayment(1)}
                                checked={payment === 1}
                            />
                            <Label htmlFor="atm">ATM</Label>
                        </li>
                        <li className={styles.sectionContent}>
                            <Input
                                type="radio"
                                id="doa"
                                name="payment"
                                onChange={e => setPayment(2)}
                                checked={payment === 2}
                            />
                            <Label htmlFor="doa">貨到付款</Label>
                        </li>
                    </ul>
                   
                    <h2 className={styles.sectionTitle}>Delivery</h2>
                    <ul className={styles.sectionBox}>
                        <li className={styles.sectionContent}>
                            <div className={styles.sectionLabel}>
                                <Label htmlFor="cardName">收件人</Label>
                            </div>
                            <div className={styles.sectionInput}>
                                <Input
                                    type="text"
                                    id="receiverName"
                                    name="receiverName"
                                    placeholder="收件人姓名"
                                    size="25"
                                    value={receiverName}
                                    onChange={e => setReceiverName(e.target.value)}
                                />
                            </div>
                        </li>
                        <li className={styles.sectionContent}>
                            <div className={styles.sectionLabel}>
                                <Label htmlFor="cardName">電話</Label>
                            </div>
                            <div className={styles.sectionInput}>
                                <Input
                                    type="text"
                                    id="receiverMobile"
                                    name="receiverMobile"
                                    placeholder="收件人電話"
                                    size="25"
                                    value={receiverPhone}
                                    onChange={e => setReceiverPhone(e.target.value)}
                                />
                            </div>
                        </li>
                        <li className={styles.sectionContent}>
                            <div className={styles.sectionLabel}>
                                <Label htmlFor="cardNumber">收貨地址</Label>
                            </div>
                            <div className={styles.sectionInput}>
                                <Select value={receiverCity} handleChange={e => setReceiverCity(e.target.value)}>
                                    <Option text="縣市" />
                                    {Object.keys(addressData).map((city, index) => (
                                        <Option text={city} value={city} key={index} />
                                    ))}
                                </Select>
                                <Select value={receiverArea} handleChange={e => setReceiverArea(e.target.value)}>
                                    <Option text="區域" value="" />
                                    {receiverCity != '' &&
                                        Object.keys(addressData[receiverCity]).map((area, index) => (
                                            <Option text={area} value={area} key={index} />
                                        ))}
                                </Select>
                                <Input type="hidden" id="addr1" name="addr1" value={`${receiverCity}${receiverArea}`} />
                                <Input
                                    type="text"
                                    id="addr2"
                                    name="addr2"
                                    size="30"
                                    placeholder="收貨地址"
                                    value={receiverAddr2}
                                    onChange={e => setReceiverAddr2(e.target.value)}
                                />
                            </div>
                        </li>
                    </ul>
                </Fragment>
            )}
            <button className={styles.checkoutBtn} onClick={handleStepChange}>
                {step === ENUM_STEP.CART ? '結帳' : '確認付款'}
            </button>
            <Modal {...modalContent} />
        </Layout>
    )
}

Cart.getInitialProps = async ({ req, query }) => {
    console.log('query: ', query);
    const res = await fetch(`https://flask-shopping.herokuapp.com/api/v1/product/${query.productId}`)
    const json = await res.json()
    console.log('json: ', json)
    const productId =  query.productId
    
    return { product: json, productId}
}

export default Cart
