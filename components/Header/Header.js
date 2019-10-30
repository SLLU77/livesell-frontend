import React from 'react'
import styles from './Header.scss'

// import Link from 'next/link'
// import Head from 'next/head'
// import Nav from '../components/nav'

const Header = ({   disableBackBtn = false, disableCartBtn = false, handleBackClick }) => {
    
    const handleClick = e => {
        if (handleBackClick) {
            handleBackClick()
        } else {
            window.history.back()
        }
    }
    
    return (
    
    
        <header className={styles.header} > 
            {!disableBackBtn && 
            <div className={styles.iconBack}
                    onClick={handleClick} 
                    data-testid="backBtn" /> }
            <h1 className={styles.logo} data-testid="logo">
                <a href="/">
                    <strong>Obay</strong>
                    <span>Buy</span>
                </a>
            </h1>
        
        {!disableCartBtn && (
                <a href="/cart" className={`icon-shopping-cart ${styles.shoppingCart}`} data-testid="cartBtn" />)}
        </header>
    
    ) 
}

// List.getInitialProps =   context => {
//     //https://liveserverpy.herokuapp.com/api/v1/products/
// }

export default Header