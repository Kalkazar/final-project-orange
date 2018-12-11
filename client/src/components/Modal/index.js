import React, { Component, Fragment } from 'react'
import styles from './modal.module.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  InputGroup, 
  Input, 
  Label,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import VerifyModal from './VerifyModal'
import { Modals as ModalsDuck, Library as LibraryDuck } from '../../ducks'

const { 
  hideCreateFolderAction, 
  toggleCreateFolder, 
  toggleEditFile, 
  toggleOpenFolder,
  toggleVerify,
  validVerificationMethods: VVM
} = ModalsDuck

const { createNewFolder, renameFile, moveFile } = LibraryDuck

class Modals extends Component {
    componentDidUpdate(prevProps, prevState){
      if(this.props.targetFile){
        if(!prevProps.targetFile || prevProps.targetFile.uid !== this.props.targetFile.uid){
          this.setState({
            renameFileInput: this.props.targetFile.name,
            moveDirInput: this.props.targetFile.containerId ? this.props.targetFile.containerId : -1
          })
        }
      }
    }

    state = {
      createFolderInput: '',
      renameFileInput: '',
      moveDirInput: -1
    }

    createFolderHandleChange = e => {
        this.setState({
            createFolderInput: e.target.value
        })
    }

    renameFileInputChangeHandler = e => this.setState({
      renameFileInput: e.target.value
    })

    moveDirInputChangeHandler = e => this.setState({
      moveDirInput: e.target.value
    })

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
          <ModalHeader toggle={this.props.toggleOpenFolder}>Folder: {this.props.targetFolder ? this.props.targetFolder.name : null}</ModalHeader>
          <ModalBody>
            <ListGroup>
              {
                this.props.targetFolder && this.props.targetFolder.filesContained
                ? this.props.targetFolder.filesContained.map((e, i) => (<ListGroupItem key={i} >{e.name}</ListGroupItem>))
                : null
              }
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleOpenFolder}>Close</Button>{' '}
          </ModalFooter>
        </Modal>

        {/* Move/Rename File Modal */}
        <Modal isOpen={this.props.showEditFile} toggle={this.props.toggleEditFile} className={this.props.className}>
          <ModalHeader toggle={this.props.toggleEditFile}>Editing File: {this.props.targetFile ? this.props.targetFile.name : null}</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Label for={'renameInput'} >Rename:</Label>
              <Input name={'renameInput'} onChange={this.renameFileInputChangeHandler} value={this.state.renameFileInput} />
              <Button color="primary" onClick={() =>
                this.props.renameFile(this.props.targetFile.uid, this.state.renameFileInput)} >Rename</Button>
            </InputGroup>
            <InputGroup>
              <Label for={'moveDirInput'} >Move To:</Label>
              <select value={this.state.moveDirInput} onChange={this.moveDirInputChangeHandler} >
                <option value={-1} >(root)</option>
                {this.props.folderList.map((e, i) => (<option key={i} value={e.uid} >{e.name}</option>))}
              </select>
              <Button color="primary" onClick={() => {
                this.props.moveFile(this.props.targetFile.uid, this.state.moveDirInput)
              }} >Move</Button>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleEditFile}>Close</Button>{' '}
          </ModalFooter>
        </Modal>

        {/* Verification Modal */}
        <VerifyModal 
            isOpen={this.props.showVerify}
            toggleMethod={this.props.toggleVerify}
            headerText={
              (() => {
                switch (this.props.verifyMethod) {
                  case VVM.RESTORE_ALL: return 'Are you sure?'
                  case VVM.DELETE_ALL: return 'Are you sure?'
                  default: return 'Are you sure?'
                }
              })()
            }
            bodyText={
              (() => {
                switch (this.props.verifyMethod) {
                  case VVM.RESTORE_ALL: return 'This operation will restore all ' +
                      'items from the trashbin to the library. ' +
                      'Are you sure you want to do this?'
                  case VVM.DELETE_ALL: return 'This operation will permanently, ' +
                      'irreversibly remove all items within the trashbin. ' +
                      'Are you sure you want to do this?'
                  default: return 'This message is only displayed ' +
                      'when a verification method has not been set. ' +
                      'Hopefully this was intended. Good luck :)'
                }
              })()
            }
            confirmMethod={
              (() => {
                switch (this.props.verifyMethod) {
                  case VVM.RESTORE_ALL: return () => console.log('Fired restoreAll confirmMethod!')
                  case VVM.DELETE_ALL: return () => console.log('Fired deleteAll confirmMethod!')
                  default: return () => console.log('Fired default confirmMethod!')
                }
              })()
            }
            declineMethod={
              (() => {
                switch (this.props.verifyMethod) {
                  case VVM.RESTORE_ALL: return () => this.props.toggleVerify()
                  case VVM.DELETE_ALL: return () => this.props.toggleVerify()
                  default: return () => this.props.toggleVerify()
                }
              })()
            } />
      </Fragment>
    )
  }
}

Modals.propTypes = {
  showCreateFolder: PropTypes.bool,
  showOpenFolder: PropTypes.bool,
  showEditFile: PropTypes.bool,
  showVerify: PropTypes.bool,

  hideCreateFolder: PropTypes.func,

  toggleCreateFolder: PropTypes.func,
  toggleEditFile: PropTypes.func,
  toggleOpenFolder: PropTypes.func,
  toggleVerify: PropTypes.func,
  
  verifyMethod: PropTypes.string,
  createNewFolder: PropTypes.func,
  targetFolder: PropTypes.object,
  targetFile: PropTypes.object,
  folderList: PropTypes.array,
  renameFile: PropTypes.func,
  moveFile: PropTypes.func
}

const mapStateToProps = state => ({
  showCreateFolder: state.modals.createFolder.show,
  showOpenFolder: state.modals.openFolder.show,
  showEditFile: state.modals.editFile.show,
  showVerify: state.modals.verify.show,

  verifyMethod: state.modals.verify.method,

  targetFolder: state.modals.openFolder.targetFolder,
  targetFile: state.modals.editFile.targetFile,
  folderList: state.library.folderList
})

const mapDispatchToProps = dispatch => ({
  hideCreateFolder: () => dispatch(hideCreateFolderAction()),
  toggleCreateFolder: () => dispatch(toggleCreateFolder()),
  toggleEditFile: () => dispatch(toggleEditFile()),
  toggleOpenFolder: () => dispatch(toggleOpenFolder()),
  toggleVerify: () => dispatch(toggleVerify()),

  createNewFolder: folderName => dispatch(createNewFolder(folderName)),
  renameFile: (uid, newName) => dispatch(renameFile(uid, newName)),
  moveFile: (uid, folderUid) => dispatch(moveFile(uid, folderUid))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals)
