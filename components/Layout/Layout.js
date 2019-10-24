import React, { Fragment } from 'react'
import Meta from '@components/Meta/Meta'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import styles from './Layout.scss'
const Layout = ({
    children,
    disableCartBtn = false,
    disableBackBtn = false,
    hasFooter = true,
    meta,
    handleBackClick,
    ...props
}) => {
    return (
        <Fragment>
            <div className={`${styles.layout} ${!hasFooter ? styles.layoutCart : ''}`}>
                <Meta {...meta} />
                <Header
                    disableCartBtn={disableCartBtn}
                    disableBackBtn={disableBackBtn}
                    handleBackClick={handleBackClick}
                />
                {children}
                {hasFooter && <Footer />}
            </div>
            <div id="modal" />
        </Fragment>
    )
}
export default Layout
