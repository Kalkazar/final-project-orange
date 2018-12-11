import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './trash.module.scss'
import { TrashCard } from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Trash as TrashDuck } from '../../ducks'

const {
  restoreFile,
  deleteFile,
  restoreFolder,
  deleteFolder,
  setPage
} = TrashDuck

/**
 * Paginator connected to trash store.
 * Why won't this work by passing props????!?
 */
const TrashPaginator = connect(
  state => ({
    currentPage: state.trash.currentPage,
    totalPages: state.trash.totalPages
  }),
  dispatch => ({
    setPage: index => dispatch(setPage(index))
  })
)(Pagination)

export class Trash extends Component {
  render () {
    return (
      <Fragment>
        <div className={styles.trashDiv}>
          {/* If props.activePage exists, render cards for items */}
          {this.props.activePage
            ? this.props.activePage.map((e, i) =>
              e.isFolder ? (
                <TrashCard
                  key={i}
                  name={e.name}
                  id={e.uid}
                  deleteForever={() => this.props.deleteFolder(e.uid)}
                  restore={() => this.props.restoreFolder(e.uid)}
                  fileType={'folder'}
                />
              ) : (
                <TrashCard
                  key={i}
                  name={e.name}
                  id={e.uid}
                  deleteForever={() => this.props.deleteFile(e.uid)}
                  restore={() => this.props.restoreFile(e.uid)}
                  fileType={'file'}
                />
              )
            )
            : null}
        </div>
        {/* <Pagination
          currentPage={this.props.currentPage + 1}
          totalPages={this.props.totalPages}
          setPage={this.props.setPage}
        /> */}
        <TrashPaginator />
      </Fragment>
    )
  }
}

Trash.propTypes = {
  // changeView: PropTypes.func,
  activePage: PropTypes.array,
  restoreFile: PropTypes.func,
  deleteFile: PropTypes.func,
  restoreFolder: PropTypes.func,
  deleteFolder: PropTypes.func,
  // restoreAll: PropTypes.func,
  // deleteAll: PropTypes.func
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  setPage: PropTypes.func
}

const mapStateToProps = state => ({
  activePage: state.trash.currentList,
  currentPage: state.trash.currentPage,
  totalPages: state.trash.totalPages
})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  // changeView: isTrash => dispatch(changeView(isTrash)),
  restoreFile: uid => dispatch(restoreFile(uid)),
  deleteFile: uid => dispatch(deleteFile(uid)),
  setPage: index => dispatch(setPage(index)),
  restoreFolder: folder => dispatch(restoreFolder(folder)),
  deleteFolder: folder => dispatch(deleteFolder(folder))
  // restoreAll: () => dispatch(restoreAll()),
  // deleteAll: () => dispatch(deleteAll())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash)
