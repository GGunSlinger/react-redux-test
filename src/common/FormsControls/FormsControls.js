import React from 'react'
import styles from './FormsControls.module.css'

export const Form = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {props.type === 'input' || props.type === 'password'
                ? <input  {...input} {...props} />
                : <textarea  {...input} {...props} />}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}