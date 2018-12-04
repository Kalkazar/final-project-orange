import React, { Component } from 'react'
import styles from './app.module.scss'
import { FileCard } from '../../components/Card'

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
      </div>
    )
  }
}

export default App
