import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './uploadButton.module.scss'
import { fromEvent } from 'file-selector'

import { addFile } from '../../ducks/library.duck'

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
    // files.forEach(file => {
    //   const filePath = file.path.split('/').slice(1)
    //   console.log(filePath)
    // })
    addFile(files[0])
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
  addFile: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addFile: file => dispatch(addFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
