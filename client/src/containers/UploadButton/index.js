import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './uploadButton.module.scss'
import { fromEvent } from 'file-selector'
import JSZip from 'jszip'

import { addFile, addFolder } from '../../ducks/library.duck'

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
    // let zip = new JSZip();
    // files.forEach(file => {
    // const filePath = file.path.split('/').slice(1)
    // if (filePath.length === 1) {
    //   zip.file(file.name, file)
    // }
    // else {
    // const nestedPath = filePath.slice(1, filePath.length - 1)
    // let bottomFolder
    // nestedPath.forEach((folder, index) => {
    //   if (index === 0) {
    //     bottomFolder = zip.folder(folder)
    //   } else {
    //     bottomFolder = bottomFolder.folder(nestedPath[index - 1])
    //   }
    // })

    // bottomFolder.file(file.name, file)
    // const [folderName] = filePath
    // console.log(folderName)
    // console.log(file)
    // zip.folder(folderName).file(file.name, file)
    // }
    //   zip.file(file.path, file)
    // })
    // zip.generateAsync({ type: "blob" })
    //   .then(folder => {
    //     this.props.addFolder(folder)
    //   })
    this.props.addFile(files[0])
  }

  render () {
    return (
      <div className={`${styles.uploadButtonClass}`}>
        <Dropzone
          getDataTransferItems={evt => fromEvent(evt)}
          onDrop={this.handleUpload}
        >
          <div className={`${styles.buttonContent}`}>
            <span>{this.props.name}</span>
            <div className={`${styles.buttonIcon}`}>{this.props.icon}</div>
          </div>
        </Dropzone>
      </div>
    )
  }
}

UploadButton.propTypes = {
  addFile: PropTypes.func.isRequired,
  addFolder: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addFile: file => dispatch(addFile(file)),
  addFolder: folder => dispatch(addFolder(folder))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadButton)
