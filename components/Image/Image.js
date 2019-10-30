import React, { Fragment } from 'react'
import styles from './Image.scss'
class Image extends React.Component {
    constructor(props) {
        super(props)
        this.imageRef = React.createRef()
    }
    componentDidMount() {
        const observer = new IntersectionObserver(
            entries => {
                let entry = entries[0]
                if (entry.intersectionRatio <= 0) return
                entry.target.style.backgroundImage = `url("${entry.target.dataset.src}"`
                observer.unobserve(entry.target)
            },
            {
                rootMargin: '30px'
            }
        )
        observer.observe(this.imageRef.current)
    }
    render() {
        return (
            <Fragment>
                <div
                    className={`${this.props.className} ${styles.image}`}
                    data-src={this.props.src}
                    ref={this.imageRef}
                />
                {this.props.promoMsg && <div className={styles.tag}>{this.props.promoMsg}</div>}
            </Fragment>
        )
    }
}
export default Image
