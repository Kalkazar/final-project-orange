import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './library.module.scss'
import {
  FileCard,
  FolderCard
} from '../../components/Card'
import { Library as LibraryDuck, Modals as ModalsDuck } from '../../ducks'

const { trashFile, trashFolder } = LibraryDuck
const { toggleOpenFolder, openFolder, editFile } = ModalsDuck

class Library extends Component {
  render () {
    return (
      <div className={styles.libDiv}>
        <span className={styles.pathSpan}>this/is/the/path/span</span>
        {/* Checking props manually for testing */}
        {console.log('Library props', this.props)}

        {/* If props.activePage exists, render cards for items */}
        { this.props.activePage ? this.props.activePage.map((e, i) => {
          return e.isFolder
            ? (<FolderCard
              key={i}
              folderName={e.name}
              folderId={e.uid}
              openFolder={() => this.props.openFolder(e)}
              trashFolder={() => this.props.trashFolder(e.uid)}
              downloadFolder={() => console.log('pls implement downloadFolder')}
            />)
            : (<FileCard
              key={i}
              fileName={e.name}
              fileId={e.uid}
              moveFile={() => this.props.editFile(e)}
              trashFile={() => this.props.trashFile(e.uid)}
              downloadFile={() => console.log('pls implement downloadFile')}
            />)
        }
        ) : null }
      </div>
    )
  }
}

Library.propTypes = {
  activePage: PropTypes.array,
  trashFile: PropTypes.func,
  trashFolder: PropTypes.func,
  toggleOpenFolder: PropTypes.func,
  openFolder: PropTypes.func,
  editFile: PropTypes.func
}

const mapStateToProps = state => ({
  activePage: state.library.currentList
})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  trashFile: uid => dispatch(trashFile(uid)),
  trashFolder: uid => dispatch(trashFolder(uid)),
  toggleOpenFolder: () => dispatch(toggleOpenFolder()),
  openFolder: folder => dispatch(openFolder(folder)),
  editFile: file => dispatch(editFile(file))
  // uploadFolder: folder => dispatch(uploadFolder(folder)),
  // uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
