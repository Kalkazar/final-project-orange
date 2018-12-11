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
const { toggleOpenFolder, editFile } = ModalsDuck

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
          <HomeIcon className={'d-none d-lg-block'} onClick={() => this.props.openFolder()} />
          <span className={styles.pathSpan + ' d-none d-lg-block'}>
            {' '}
            Browsing: ./
            {this.props.displayFolder
              ? `${this.props.displayFolder.name}/`
              : ` (root)`}
          </span>
          {this.props.activePage
            ? <Container className={styles.containerFill} > {groupArray(this.props.activePage.map((e, i) => {
              return e.isFolder ? (
                <Col xl={'3'} lg={'3'} md={'3'} key={i} >
                  <FolderCard
                    key={i}
                    folderName={e.name}
                    folderId={e.uid}
                    openFolder={() => this.props.openFolder(e.uid)}
                    trashFolder={() => this.props.trashFolder(e.uid)}
                    downloadFolder={() =>
                      LiveEndpoints.Folder.downloadFolder(e.uid)
                    }
                  />
                </Col>
              ) : (
                <Col xl={'3'} lg={'3'} md={'3'} key={i} >
                  <FileCard
                    key={i}
                    fileName={e.name}
                    fileId={e.uid}
                    moveFile={() => this.props.editFile(e)}
                    trashFile={() => this.props.trashFile(e.uid)}
                    downloadFile={() => LiveEndpoints.File.downloadFile(e.uid)}
                  />
                </Col>
              )
            }), 4).map((e, i) => (<Row key={i} >{e}</Row>))} </Container>
            : null}
        </div>
        <LibraryPaginator />
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
  setPage: index => dispatch(setPage(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
