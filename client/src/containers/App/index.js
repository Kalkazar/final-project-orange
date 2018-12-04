import React, { Component } from 'react'
import styles from './app.module.scss'
import {
  FileCard,
  FolderCard,
  UploadCard,
  TrashCard,
  FolderFunctionsCard
} from '../../components/Card'
import { Library } from '../Library'
import { SideNav } from '../SideNav/SideNav'

class App extends Component {
  render () {
    return (
      <div className='container-fluid '>
        <div className='row justify-content-center'>
          <SideNav className=' col-sm-12 col-md-3 col-lg-2 col-xl-2'>
            Navigation
          </SideNav>
          <Library className=' col-sm-12 col-md-9 col-lg-7 col-xl-6'>
            Library
          </Library>
        </div>
      </div>
    )
  }
}

export default App
