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
const Cart = ({ cartList, ...props }) => {
    console.log('##############################################################')
    console.log(cartList)
    const { CART, CHECKOUT } = ENUM_STEP
 /*   
    const totalPrice = cartList.products.reduce((total, currentItem) => {
        const { price, quantity } = currentItem
        return price * Number(quantity) + total
    }, 0)
    console.log('totalprice ---', totalPrice)
*/
    const [step, setStep] = useState(ENUM_STEP.CART)
    // Modal
    const [modalContent, setModalContent] = useState(null)
    const onClose = () => setModalContent(null)
   
    // Cart
    //const [amount, setAmount] = useState(1)
   // const [amount, setAmount] = useState(totalPrice)
    //const [products, setProducts] = useState([...cartList])
    //const [products, setProducts] = useState([cartList.products])
    const handleItemChange = ({ styleInfo, totalAmount, count }) => {
        setProducts(
            products.map(prod => (styleInfo.value === prod.styleInfo.value ? { ...prod, quantity: count } : prod))
        )
        setAmount(totalAmount)
    }

    // Checkout
  
    const [amount, setAmount] = useState(1)
	const [product_id, setProduct_id] = useState(10)
	const [receiver_product_type, setReceiver_product_type] = useState('100G')
    const [recode, setRecode] = useState('333')


    const [payment, setPayment] = useState(0)
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
        /*
        	console.log(payment)
			console.log(invoice)
			console.log(receiverName)
			console.log(receiverPhone)
			console.log(receiverCity)
			console.log(receiverArea)
			console.log(receiverAddr2)
		*/
			console.log(amount)
			console.log(payment)
			console.log(product_id)
			console.log(receiverCity)
			console.log(receiverArea)
			console.log(receiverAddr2)
			console.log(receiverName)
			console.log(receiverPhone)
			console.log(receiver_product_type)
			console.log(recode)
            submit()
        }
    }
/*
	 "amount": 0,
    "payment_id": 0,
    "product_id": 0,
    "receiver_addr1": "string",
    "receiver_addr2": "string",
    "receiver_name": "string",
    "receiver_phone": "string",
    "receiver_product_type": "string",
    "recode": "string"
  */  
    const submit = async () => {
        const res = await fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            /*
                products: products.map(item => {
                    return {
                        goodId: item.goodId,
                        quantity: item.quantity
                    }
                }),
             */

			/*
                payment,
                invoice,
                receiver: {
                    name: receiverName,
                    phone: receiverPhone,
                    addr1: `${receiverCity}${receiverArea}`,
                    addr2: receiverAddr2
                }
			*/
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
/*
    useEffect(() => {
        if (cartList.length === 0) {
            setModalContent({
                content: '購物車沒有商品',
                submitClick: () => (location.href = '/'),
                submitText: '返回首頁',
                cancelText: null,
                onClose
            })
        }
    }, [])
*/
    return (
        <Layout
            disableCartBtn={true}
            hasFooter={false}
            handleBackClick={step === CHECKOUT ? () => setStep(ENUM_STEP.CART) : null}
        >
            <CartStep currentStep={step} />
            
            {/* Cart */}
            {/*
                step === CART &&
                cartList.length > 0 &&
                cartList.map(product => (
                    <CartProductItem
                        {...product}
                        amount={amount}
                        handleItemChange={handleItemChange}
                        key={product.goodId}
                    />
                ))}
            {step === CART && (
                <ul className={styles.sectionBox}>
                    <li className={styles.sectionContent}>
                        <div className={styles.sectionName}>Subtotal</div>
                        <div className={`ehsPrice ${styles.sectionText}`}>{toCurrency(amount)}</div>
                    </li>
                </ul>
            )
          */}

            {/* Checkout */}
            {step === CHECKOUT && (
                <Fragment>
                    <div className={`${styles.totalAmount}`}>
                        總金額<strong>{toCurrency(amount)}</strong>
                    </div>
                    <h2 className={styles.sectionTitle}>Payment</h2>
                    <ul className={styles.sectionBox}>
                        <li className={styles.sectionContent}>
                            <Input
                                type="radio"
                                id="atm"
                                name="payment"
                                onChange={e => setPayment(0)}
                                checked={payment === 0}
                            />
                            <Label htmlFor="atm">ATM</Label>
                        </li>
                        <li className={styles.sectionContent}>
                            <Input
                                type="radio"
                                id="doa"
                                name="payment"
                                onChange={e => setPayment(1)}
                                checked={payment === 1}
                            />
                            <Label htmlFor="doa">貨到付款</Label>
                        </li>
                        <li className={styles.sectionContent}>
                            <Input type="radio" id="creditCard" name="payment" disabled />
                            <Label htmlFor="creditCard">
                                信用卡 <span>coming soon</span>
                            </Label>
                        </li>
                    </ul>
                    <h2 className={styles.sectionTitle}>Invoice</h2>
                    <ul className={styles.sectionBox}>
                        <li className={styles.sectionContent}>
                            <Input
                                type="radio"
                                id="invoice1"
                                name="invoice"
                                onChange={e => setInvoice(0)}
                                checked={invoice === 0}
                            />
                            <Label htmlFor="invoice1">捐贈發票</Label>
                        </li>
                        <li className={styles.sectionContent}>
                            <Input
                                type="radio"
                                id="invoice2"
                                name="invoice"
                                onChange={e => setInvoice(1)}
                                checked={invoice === 1}
                            />
                            <Label htmlFor="invoice2">二聯式發票</Label>
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

Cart.getInitialProps = async ({ query: { cartList } }) => {
    console.log('-----------------------------')
    console.log(cartList)
    return { cartList }
}

export default Cart
