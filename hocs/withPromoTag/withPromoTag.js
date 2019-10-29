import React from 'react'
import styles from './withPromoTag.scss'
import { getDisplayName } from '@utils/tool'
const withPromoTag = WrappedComponent =>
    class extends React.Component {
        displayName = `withPromoTag(${getDisplayName(WrappedComponent)})`
        static defaultProps = {
            promoMsg: ''
        }
        render() {
            const { promoMsg } = this.props
            return (
                <div className={styles.promoWrap}>
                    <WrappedComponent {...this.props} />
                    {promoMsg && <div className={styles.tag}>{promoMsg}</div>}
                </div>
            )
        }
    }
export default withPromoTag
