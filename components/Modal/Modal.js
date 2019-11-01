import React from 'react'
import Portal from '@components/Portal/Portal'
import styles from './Modal.scss'
const Modal = ({
    title = '提示訊息',
    content = null,
    onClose,
    submitText = '確定',
    cancelText = '取消',
    submitClick,
    cancelClick,
    isLoading,
    ...props
}) => {
    const handleSubmitClick = e => {
        submitClick && submitClick(e)
        onClose()
    }
    const handleCancelClick = e => {
        cancelClick && cancelClick(e)
        onClose()
    }
    return (
        <Portal selector="#modal">
            <div
                className={`${styles.modal} ${isLoading || content ? '' : styles.hide}`}
            >
                <div className={styles.backdrop} onClick={onClose} />
                {isLoading ? (
                    <div className={styles.loading} />
                ) : (
                    <div className={styles.container}>
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.content}>{content}</div>
                        <div className={styles.footer}>
                            {cancelText && (
                                <button className={styles.cancelBtn} onClick={handleCancelClick}>
                                    {cancelText}
                                </button>
                            )}
                            {submitText && (
                                <button className={styles.submitBtn} onClick={handleSubmitClick}>
                                    {submitText}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Portal>
    )
}
export default Modal
