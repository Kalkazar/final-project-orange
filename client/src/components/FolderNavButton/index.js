import React from 'react'
import styles from './folderNavButton.module.scss'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
const FolderNavButton = props => (
  <div className={`${styles.folderNavButtonClass}`} onClick={props.onClick}>
    <div className={`${styles.buttonContent}`}>
      <span>Upload Folder</span>
      <div className={`${styles.buttonIcon}`}>{props.icon}</div>
    </div>
  </div>
)

export default FolderNavButton
