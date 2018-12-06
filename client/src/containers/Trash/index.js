import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './trash.module.scss'
import {
  FileCard,
  FolderCard,
  UploadCard,
  TrashCard,
  FolderFunctionsCard
} from '../../components/Card'
import PropTypes from 'prop-types'
import { changeView } from '../../ducks/ui.duck'
import { restoreFile } from '../../ducks/library.duck'

export class Trash extends Component {
  componentDidMount () {
    console.log('Get All TRASHED Files and Folders')
    // this.props.changeView(true)
  }

  render () {
    return (
      <div className={styles.trashDiv}>

        {/* If props.activePage exists, render cards for items */}
        {this.props.activePage ? this.props.activePage.map((e, i) =>
          (<TrashCard
            name={e.name}
            id={e.uid}
            deleteForever={console.log}
            restore={() => this.props.restoreFile(e.uid)}
            fileType='file'
          />)
        ) : null}

      </div>
    )
  }
}

Trash.propTypes = {
  changeView: PropTypes.func,
  restoreFile: PropTypes.func
  // restoreFolder: PropTypes.func,
  // deleteFile: PropTypes.func,
  // deleteFolder: PropTypes.func,
  // restoreAll: PropTypes.func,
  // deleteAll: PropTypes.func
}

const mapStateToProps = state => ({
  activePage: state.library.activePage
})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  changeView: isTrash => dispatch(changeView(isTrash)),
  restoreFile: uid => dispatch(restoreFile(uid))
  // restoreFolder: folder => dispatch(restoreFolder(folder)),
  // deleteFile: file => dispatch(deleteFile(file)),
  // deleteFolder: folder => dispatch(deleteFolder(folder)),
  // restoreAll: () => dispatch(restoreAll()),
  // deleteAll: () => dispatch(deleteAll())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash)
