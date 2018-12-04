import React, { Component } from 'react'
import styles from './app.module.scss'
import { FileCard } from '../../components/Card'
import { SideNav } from '../SideNav/SideNav'
import { Library } from '../Library'
import InnerButton from '../../components/InnerButton'
import { TrashIcon } from '../../components/Icon'

class App extends Component {
  render () {
    return (
      <div className={`container-fluid ${styles.nopadding}`}>
        <div className={`row justify-content-center ${styles.nopadding}`}>
          <div className=' col-sm-12 col-md-3 col-lg-3 col-xl-3'>
            <SideNav />
          </div>
          <div className=' col-sm-12 col-md-9 col-lg-8 col-xl-7'>
            <Library>
              <FileCard
                fileName={'PooFile.txt'}
                fileId={1}
                trashFile={console.log}
                downloadFile={console.log}
              />
            </Library>
            <InnerButton name={'Delete File'} icon={<TrashIcon />} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
