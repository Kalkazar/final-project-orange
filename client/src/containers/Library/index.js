import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './library.module.scss'
import {
  FileCard,
  FolderCard
  // UploadCard,
  // TrashCard,
  // FolderFunctionsCard
} from '../../components/Card'
import { LiveEndpoints } from '../../api'
import { Library as LibraryDuck } from '../../ducks'

export class Library extends Component {
  render () {
    return (
      <div className={styles.libDiv}>
        <span className={styles.pathSpan}>this/is/the/path/span</span>
        {/* Checking props manually for testing */}
        {console.log('Library props', this.props)}

        {/* If props.activePage exists, render cards for items */}
        { this.props.activePage ? this.props.activePage.map((e, i) => {
          const CardType = e.isFolder ? FolderCard : FileCard

          return (<CardType
            key={i}
            fileName={e.name}
            fileId={e.uid}
            trashFile={() => this.props.trashBinFile(e.uid)}
            downloadFile={() => LiveEndpoints.File.downloadFile(e.uid)}
          />)
        }
          
        ) : null }
      </div>
    )
  }
}

Library.propTypes = {
  activePage: PropTypes.array
}

const mapStateToProps = state => ({
  activePage: state.library.currentList
})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  trashBinFile: uid => dispatch(LibraryDuck.trashFile(uid))
  // uploadFolder: folder => dispatch(uploadFolder(folder)),
  // uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
