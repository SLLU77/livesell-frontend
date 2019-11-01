import React, { useState } from 'react'
import styles from './Form.scss'

export const Form = props => <form {...props}>{props.children}</form>
export const Field = ({ legend, ...props }) => {
    return (
        <fieldset {...props}>
            {legend && <legend>{legend}</legend>}
            {props.children}
        </fieldset>
    )
}
export const Label = ({ ...props }) => {
    return (
        <label className={styles.label} {...props}>
            {props.children}
        </label>
    )
}
export const Select = ({ handleChange, ...props }) => {
    const [value, setValue] = useState('')
    const handleOptionChange = e => {
        setValue(e.target.value)
        handleChange && handleChange(e)
    }
    return (
        <select className={styles.select} value={value} onChange={handleOptionChange} {...props}>
            {props.children}
        </select>
    )
}
export const Option = ({ value = '', text, ...props }) => {
    return (
        <option className={styles.option} value={value} {...props}>
            {text}
        </option>
    )
}
export const Input = ({ type = 'text', ...props }) => {
    return <input className={styles.input} type={type} {...props} />
}
