import React from 'react'
import styles from './innerButton.module.scss'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
const InnerButton = props => (
  <div className={`${styles.innerButtonClass}`} onClick={props.onClick}>
    <div className={`${styles.buttonContent}`}>
      <span>{props.name}</span>
      <div className={`${styles.buttonIcon}`}>{props.icon}</div>
    </div>
  </div>
)

export default InnerButton
