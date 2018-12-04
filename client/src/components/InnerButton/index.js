import React from 'react'
import styles from './innerButton.module.scss'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
const InnerButton = props => (
  <div className={`${styles.innerButtonClass}`} onClick={props.onClick}>
    {props.name}
  </div>
)

export default InnerButton
