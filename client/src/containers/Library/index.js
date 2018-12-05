import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './library.module.scss'
import {
  FileCard,
  FolderCard,
  UploadCard,
  TrashCard,
  FolderFunctionsCard
} from '../../components/Card'

export class Library extends Component {
  render () {
    return (
      <div className={styles.libDiv}>
        <span className={styles.pathSpan}>this/is/the/path/span</span>
        <FileCard
          fileName={'PooFile.txt'}
          fileId={1}
          trashFile={console.log}
          downloadFile={console.log}
        />
        <FolderCard
          folderName={'PooFile.txt'}
          folderId={1}
          trashFolder={console.log}
          downloadFolder={console.log}
          openFolder={console.log}
        />
        <UploadCard
          fileType='file'
          upload={() => console.log('uploading file...')}
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <FolderFunctionsCard
          createFolder={console.log}
          uploadFolder={console.log}
        />
        <FileCard
          fileName={'PooFile.txt'}
          fileId={1}
          trashFile={console.log}
          downloadFile={console.log}
        />
        <FolderCard
          folderName={'PooFile.txt'}
          folderId={1}
          trashFolder={console.log}
          downloadFolder={console.log}
          openFolder={console.log}
        />
        <UploadCard
          fileType='file'
          upload={() => console.log('uploading file...')}
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <FolderFunctionsCard
          createFolder={console.log}
          uploadFolder={console.log}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
