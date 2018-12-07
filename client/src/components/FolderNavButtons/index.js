import React from 'react'
import styles from './folderNavButtons.module.scss'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
const FolderNavButtons = props => (
  <div className={`${styles.folderButtonClass}`} onClick={props.onClick}>
    <div className={`${styles.buttonContent}`}>
      <span>{props.name}</span>
      <div className={`${styles.buttonIcon}`}>{props.icon}</div>
    </div>
  </div>
)

export default FolderNavButtons
