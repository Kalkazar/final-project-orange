import React, { Component, Fragment } from 'react'
import styles from './modal.module.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input } from 'reactstrap'
// import { LiveEndpoints } from '../../api'
import { Modals as ModalsDuck, Library as LibraryDuck } from '../../ducks'

const { 
  hideCreateFolderAction, 
  toggleCreateFolder, 
  toggleEditFile, 
  toggleOpenFolder
} = ModalsDuck

const { createNewFolder } = LibraryDuck

class Modals extends Component {
    state = {
      createFolderInput: '',
      openFolderInput: '',
      openFolderShow: false,
      moveFileInput: '',
      moveFileShow: false
    }

    createFolderToggle = e => this.setState({
      createFolderShow: !this.state.createFolderShow
    })

    createFolderHandleChange = e => {
        this.setState({
            createFolderInput: e.target.value
        })
    }

    // createFolderHandleClick = e => {
    //     LiveEndpoints.Folder.createFolder(this.state.createFolderInput)

    //     setTimeout(() => {
    //         this.setState({
    //             createFolderInput: '',
    //         })
    //     }, 500)
    // }

    openFolderToggle = e => this.setState({
      openFolderShow: !this.state.openFolderShow
    })

    openFolderHandleChange = e => {
        this.setState({
            openFolderInput: e.target.value
        })
    }

    openFolderHandleClick = e => {

        setTimeout(() => {
            this.setState({
                openFolderInput: '',
            })
        }, 500)
    }

    moveFileToggle = e => this.setState({
      moveFileShow: !this.state.moveFileShow
    })

    moveFileHandleChange = e => {
        this.setState({
            moveFileInput: e.target.value
        })
    }

    moveFileHandleClick = e => {
        // LiveEndpoints.Folder.moveFile(this.state.moveFileInput)

        setTimeout(() => {
            this.setState({
                moveFileInput: '',
            })
        }, 500)
    }

  render () {
    return (
      <Fragment>

        {/* Create Folder Modal */}
        <Modal isOpen={this.props.showCreateFolder} toggle={this.props.toggleCreateFolder} className={this.props.className}>
          <ModalHeader toggle={this.props.toggleCreateFolder}>Create a New Folder</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input onChange={this.createFolderHandleChange} value={this.state.createFolderInput} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleCreateFolder}>Cancel</Button>{' '}
            <Button color="primary" onClick={
              () => this.props.createNewFolder(this.state.createFolderInput)
              .then(r => {
                this.props.toggleCreateFolder()
                this.setState({
                  createFolderInput: ''
                })
              })
              }>Create Folder</Button>
          </ModalFooter>
        </Modal>

        {/* Folder Contents Modal */}
        <Modal isOpen={this.props.showOpenFolder} toggle={this.props.toggleOpenFolder} className={this.props.className}>
          <ModalHeader toggle={this.props.toggleOpenFolder}>[Folder's Name] Contents</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input onChange={this.openFolderHandleChange} value={this.state.openFolderInput} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleOpenFolder}>Cancel</Button>{' '}
            <Button color="primary" onClick={this.openFolderHandleClick}>Click Action</Button>
          </ModalFooter>
        </Modal>

        {/* Move/Rename File Modal */}
        <Modal isOpen={this.props.showEditFile} toggle={this.props.toggleEditFile} className={this.props.className}>
          <ModalHeader toggle={this.props.toggleEditFile}>Move File</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input onChange={this.moveFileHandleChange} value={this.state.moveFileInput} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleEditFile}>Cancel</Button>{' '}
            <Button color="primary" onClick={this.moveFileHandleClick}>Move!</Button>
          </ModalFooter>
        </Modal>

      </Fragment>
    )
  }
}

Modals.propTypes = {
  showCreateFolder: PropTypes.bool,
  showOpenFolder: PropTypes.bool,
  showEditFile: PropTypes.bool,
  hideCreateFolder: PropTypes.func,
  toggleCreateFolder: PropTypes.func,
  toggleEditFile: PropTypes.func,
  toggleOpenFolder: PropTypes.func,
  createNewFolder: PropTypes.func
}

const mapStateToProps = state => ({
  // totalPages: state.library.totalPages,
  showCreateFolder: state.modals.createFolder.show,
  showOpenFolder: state.modals.openFolder.show,
  showEditFile: state.modals.editFile.show
})

const mapDispatchToProps = dispatch => ({
  hideCreateFolder: () => dispatch(hideCreateFolderAction()),
  toggleCreateFolder: () => dispatch(toggleCreateFolder()),
  toggleEditFile: () => dispatch(toggleEditFile()),
  toggleOpenFolder: () => dispatch(toggleOpenFolder()),
  createNewFolder: folderName => dispatch(createNewFolder(folderName))

  // setPage: page => dispatch(setPage(page)),
  // getFiles: () => dispatch(getFiles())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals)
