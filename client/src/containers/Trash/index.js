import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './trash.module.scss'
import {
  FileCard,
  FolderCard,
  UploadCard,
  TrashCard,
  FolderFunctionsCard
} from '../../components/Card'


export class Trash extends Component {
  componentDidMount () {
    console.log('Get All TRASHED Files and Folders')
  }

  render () {
    return (
      <div className={styles.trashDiv}>
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
      </div>
    )
  }
}

Trash.propTypes = {
  restoreFile: PropTypes.func,
  restoreFolder: PropTypes.func,
  deleteFile: PropTypes.func,
  deleteFolder: PropTypes.func,
  restoreAll: PropTypes.func,
  deleteAll: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  // restoreFile: file => dispatch(restoreFile(file)),
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
