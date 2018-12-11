import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import PropTypes from 'prop-types'

class VerifyModal extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggleMethod}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.toggleMethod}>
          {this.props.headerText}
        </ModalHeader>
        <ModalBody>
          <span>{this.props.bodyText}</span>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.props.declineMethod}>
            No
          </Button>{' '}
          <Button color='danger' onClick={this.props.confirmMethod}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

VerifyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMethod: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  declineMethod: PropTypes.func.isRequired,
  confirmMethod: PropTypes.func.isRequired
}

export default VerifyModal
