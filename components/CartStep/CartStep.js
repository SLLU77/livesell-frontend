import React from 'react'
import styles from './CartStep.scss'
const ENUM_STEP = {
    ORDER: 'SHOPPING',
    CHECKOUT: 'CHECKOUT',
    COMPLETE: 'COMPLETE'
}
const CartStep = ({ currentStep }) => {
    return (
        <ul className={styles.cartStep}>
            {Object.values(ENUM_STEP).map((step, index) => {
                let done = currentStep > index
                let current = currentStep === index
                return (
                    <li
                        className={`${styles.step} ${done ? styles.done : ''} ${current ? styles.current : ''}`}
                        key={index}
                    >
                        {step}
                        {done && <i className="icon-checkmark" />}
                    </li>
                )
            })}
        </ul>
    )
}
export default CartStep
