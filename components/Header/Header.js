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
    
    
        <div className={styles.header} > 
            {!disableBackBtn && 
            <div className={styles.iconBack}
                    onClick={handleClick} 
                    data-testid="backBtn" /> }
        
        

        </div>
    
    ) 
}

// List.getInitialProps =   context => {
//     //https://liveserverpy.herokuapp.com/api/v1/products/
// }

export default Header