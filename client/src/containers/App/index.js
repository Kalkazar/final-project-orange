import React, { Component } from 'react'
import styles from './app.module.scss'
import { FileCard, FolderCard, UploadCard } from '../../components/Card'

class App extends Component {
  render () {
    return (
      <div className={styles.App}>
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
      </div>
    )
  }
}

export default App
