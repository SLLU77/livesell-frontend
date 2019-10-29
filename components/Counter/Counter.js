import React, { useState } from 'react'
import styles from './Counter.scss'
const Counter = ({ quantity, handleCounterChange, MAX = 10 }) => {
    const [count, setCount] = useState(Number(quantity))
    const checkCount = setValue => {
        if (setValue <= 0 || setValue > MAX) return
        handleCounterChange({ count, setValue })
        setCount(setValue)
    }
    return (
        <div className={styles.counter}>
            <div className={`icon-minus ${styles.decrement}`} onClick={() => checkCount(count - 1)} />
            <input type="input" value={count} className={styles.number} readOnly />
            <div className={`icon-plus ${styles.increment}`} onClick={() => checkCount(count + 1)} />
        </div>
    )
}
export default Counter
