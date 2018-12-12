import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './uploadButton.module.scss'
import { fromEvent } from 'file-selector'
import JSZip from 'jszip'

import { uploadFiles, uploadFolders } from '../../ducks/library.duck'

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
    let topLevelFiles = files.filter(file =>
      this.getFilePath(file).length === 1
    )
    let filesInFolders = files.filter(file =>
      this.getFilePath(file).length > 1
    )

    if (topLevelFiles.length >= 1) {
      this.props.uploadFiles(topLevelFiles)
    }
    if (filesInFolders.length >= 1) {
      let folderName = this.getFilePath(filesInFolders[0])[0]
      this.props.uploadFolders(folderName, filesInFolders)
    }
  }

  getFilePath (file) {
    return file.path.includes('/') ? file.path.split('/').slice(1) : [file.path]
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
  uploadFolders: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  uploadFiles: files => dispatch(uploadFiles(files)),
  uploadFolders: (folderName, files) => dispatch(uploadFolders(folderName, files))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
