import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './library.module.scss'
import { FileCard, FolderCard } from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Library as LibraryDuck, Modals as ModalsDuck } from '../../ducks'
import { LiveEndpoints } from '../../api'

const { trashFile, trashFolder, setPage } = LibraryDuck
const { toggleOpenFolder, openFolder, editFile } = ModalsDuck

/**
 * Paginator connected to library store.
 * Why won't this work by passing props????!?
 */
const LibraryPaginator = connect(state => ({
  currentPage: state.library.currentPage,
  totalPages: state.library.totalPages
}), dispatch => ({
  setPage: index => dispatch(setPage(index))
}))(Pagination)

class Library extends Component {
  render () {
    return (
      <Fragment>
        <div className={styles.libDiv}>
          <span className={styles.pathSpan}>this/is/the/path/span</span>
          {this.props.activePage ? this.props.activePage.map((e, i) => {
            return e.isFolder
              ? (<FolderCard
                key={i}
                folderName={e.name}
                folderId={e.uid}
                openFolder={() => this.props.openFolder(e)}
                trashFolder={() => this.props.trashFolder(e.uid)}
                downloadFolder={() => LiveEndpoints.Folder.downloadFolder(e.uid)}
              />)
              : (<FileCard
                key={i}
                fileName={e.name}
                fileId={e.uid}
                moveFile={() => this.props.editFile(e)}
                trashFile={() => this.props.trashFile(e.uid)}
                downloadFile={() => LiveEndpoints.File.downloadFile(e.uid)}
              />)
          }
          ) : null}
        </div>
        <LibraryPaginator />
      </Fragment>
    )
  }
}

// connect(state => ({
//   currentPage: state.trash.currentPage,
//   totalPages: state.trash.totalPages
// }), dispatch => ({
//   setPage: index => dispatch(setPage(index))
// }))(Pagination)

Library.propTypes = {
  activePage: PropTypes.array,
  trashFile: PropTypes.func,
  trashFolder: PropTypes.func,
  toggleOpenFolder: PropTypes.func,
  openFolder: PropTypes.func,
  editFile: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  setPage: PropTypes.func
}

const mapStateToProps = state => ({
  activePage: state.library.currentList,
  currentPage: state.trash.currentPage,
  totalPages: state.trash.totalPages
})

const mapDispatchToProps = dispatch => ({
  trashFile: uid => dispatch(trashFile(uid)),
  trashFolder: uid => dispatch(trashFolder(uid)),
  toggleOpenFolder: () => dispatch(toggleOpenFolder()),
  openFolder: folder => dispatch(openFolder(folder)),
  editFile: file => dispatch(editFile(file)),
  setPage: index => dispatch(setPage(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
