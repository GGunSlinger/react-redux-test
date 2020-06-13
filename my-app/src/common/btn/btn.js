import React from 'react'
import styles from './btn.module.css'

export const Button = ({ button, meta, ...props }) => {
    return <button {...props} className={styles.btn} ></button>  
}