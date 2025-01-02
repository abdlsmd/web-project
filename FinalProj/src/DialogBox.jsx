
import React from 'react'
import styles from './dialogBox.module.css'

/**
 *
 */
export default function DialogBox({show , message , onClose})
{
    if (!show) return null;

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.DialogBox}>
              <p>{message}</p>
              <button onClick={onClose}> Close</button>
            </div>
        </div>
    )
}