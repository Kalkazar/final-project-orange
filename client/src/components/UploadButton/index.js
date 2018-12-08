import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './uploadButton.module.scss'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
const UploadButton = props => (
  <div className={`${styles.uploadButtonClass}`}>
    <Dropzone
      onDrop={onDrop}
    >
      <div className={`${styles.buttonContent}`}>
        <span>{props.name}</span>
        <div className={`${styles.buttonIcon}`}>{props.icon}</div>
      </div>
    </Dropzone>
  </div>

)

function onDrop (files) {
  console.log(files)
}

export default UploadButton
