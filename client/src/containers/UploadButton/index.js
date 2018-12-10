import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './uploadButton.module.scss'

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

  handleUpload ([file]) {
    this.props.addFile(file)
  }

  render () {
    return (
      <div className={`${styles.uploadButtonClass}`}>
        <Dropzone
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  addFile: file => dispatch(addFile(file))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadButton)
