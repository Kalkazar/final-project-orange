import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './uploadButton.module.scss'
import { fromEvent } from 'file-selector'

import { uploadFiles, addFolder, uploadFolderZip } from '../../ducks/library.duck'

/**
 *
 * @param {Any} props Takes a name which will give the button text, and an onClick
 * method in order to add functionality.
 */
class UploadButton extends Component {
  constructor () {
    super()

    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload (files) {
    // Need to update to handle folders. Back-end will need to be updated as well.
    // Likely the best way is to create a zip in the api and send that.
    console.log(files)
    let topLevelFiles = []
    // let folders = []

    files.forEach(file => {
      console.log(file)
      const filePath = file.path.includes('/') ? file.path.split('/').slice(1) : [file.path]
      console.log(filePath)
      if (filePath.length === 1) {
        topLevelFiles = [...topLevelFiles, file]
      } else {

      }
    })
    if (topLevelFiles.length >= 1) {
      this.props.uploadFiles(topLevelFiles)
    }
  }

  render () {
    return (
      <Dropzone
        className={`${styles.dropzoneClass}`}
        getDataTransferItems={evt => fromEvent(evt)}
        onDrop={this.handleUpload}

      >
        <div className={`${styles.uploadButtonClass}`}>
          <div className={`${styles.buttonContent}`}>
            <span>Drop Files and/or Folders Here</span>
            <div className={`${styles.buttonIcon}`}>{this.props.icon}</div>
          </div>
        </div>
      </Dropzone>
    )
  }
}

UploadButton.propTypes = {
  uploadFiles: PropTypes.func.isRequired,
  // addFolder: PropTypes.func.isRequired,
  // uploadFolderZip: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  uploadFiles: files => dispatch(uploadFiles(files)),
  // addFolder: folder => dispatch(addFolder(folder)),
  // uploadFolderZip: blob => dispatch(uploadFolderZip(blob))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
