import React from 'react'
import styles from './uploadButton.module.scss'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
const UploadButton = props => (
  <div className={`${styles.uploadButtonClass}`} onClick={props.onClick}>
    <div className={`${styles.buttonContent}`}>
      {props.name}
      <div className={`${styles.buttonIcon}`}>{props.icon}</div>
    </div>
  </div>
)

export default UploadButton
