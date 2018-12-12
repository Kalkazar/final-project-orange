import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './library.module.scss'
import { FileCard, FolderCard } from '../../components/Card'
import { HomeIcon } from '../../components/Icon'
import Pagination from '../../components/Pagination'
// import { Paginator } from './styled'
import { Library as LibraryDuck, Modals as ModalsDuck } from '../../ducks'
import { LiveEndpoints } from '../../api'
import { groupArray } from '../../helpers/util'
import { Container, Row, Col } from 'reactstrap'

const { trashFile, trashFolder, setPage, setDisplayFolder } = LibraryDuck
const { toggleOpenFolder, editFile, editFolder } = ModalsDuck

/**
 * Paginator connected to library store.
 * Why won't this work by passing props????!?
 */
const LibraryPaginator = connect(
  state => ({
    currentPage: state.library.currentPage,
    totalPages: state.library.totalPages
  }),
  dispatch => ({
    setPage: index => dispatch(setPage(index))
  })
)(Pagination)

class Library extends Component {
  render () {
    return (
      <Fragment>
        <div className={styles.libDiv}>
          <div className={styles.libDivSmol + ' ' + styles.libTopSmol}>
            <HomeIcon
              className={`d-none d-md-block ${styles.iconWidthDown}`}
              onClick={() => this.props.openFolder()}
            />
            <span className={styles.pathSpan + ' d-none d-md-block'}>
              {' '}
              Browsing: ./
              {this.props.displayFolder
                ? `${this.props.displayFolder.name}/`
                : ` (root)`}
            </span>
          </div>

          <div className={styles.libDivMain}>
            {this.props.activePage ? (
              this.props.activePage.map((e, i) => {
                return e.isFolder ? (
                  <FolderCard
                    key={i}
                    folderName={e.name}
                    folderId={e.uid}
                    moveFolder={() => this.props.editFolder(e)}
                    openFolder={() => this.props.openFolder(e.uid)}
                    trashFolder={() => this.props.trashFolder(e.uid)}
                    downloadFolder={() =>
                      LiveEndpoints.Folder.downloadFolder(e.uid)
                    }
                  />
                ) : (
                  <FileCard
                    key={i}
                    fileName={e.name}
                    fileId={e.uid}
                    moveFile={() => this.props.editFile(e)}
                    trashFile={() => this.props.trashFile(e.uid)}
                    downloadFile={() =>
                      LiveEndpoints.File.downloadFile(e.uid)
                    }
                  />
                )
              })) : null}
          </div>

          <div className={styles.libPaginatorContainer}>
            <LibraryPaginator />
          </div>
        </div>
      </Fragment>
    )
  }
}

Library.propTypes = {
  activePage: PropTypes.array.isRequired,
  trashFile: PropTypes.func.isRequired,
  trashFolder: PropTypes.func.isRequired,
  toggleOpenFolder: PropTypes.func.isRequired,
  openFolder: PropTypes.func.isRequired,
  editFile: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  displayFolder: PropTypes.object
}

const mapStateToProps = state => ({
  activePage: state.library.currentList,
  currentPage: state.library.currentPage,
  totalPages: state.library.totalPages,
  displayFolder: state.library.displayFolder
})

const mapDispatchToProps = dispatch => ({
  trashFile: uid => dispatch(trashFile(uid)),
  trashFolder: uid => dispatch(trashFolder(uid)),
  toggleOpenFolder: () => dispatch(toggleOpenFolder()),
  openFolder: folder => dispatch(setDisplayFolder(folder)),
  editFile: file => dispatch(editFile(file)),
  editFolder: folder => dispatch(editFolder(folder)),
  setPage: index => dispatch(setPage(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
