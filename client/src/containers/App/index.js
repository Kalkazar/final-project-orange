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
import { NavButton } from '../../components/NavButton'

class App extends Component {
  render () {
    return (
      <div className='container-fluid '>
        <div className='row justify-content-center'>
          <NavButton
            text='Library'
            route='/library'
            onClick={() => console.log('opening library')}
          />
          <NavButton
            text='Trash'
            route='/trash'
            onClick={() => console.log('opening trash')}
          />
          <SideNav className=' col-sm-12 col-md-3 col-lg-2 col-xl-2'>
            <NavButton
              text='Library'
              route='/library'
              onClick={() => console.log('opening library')}
            />
            <NavButton
              text='Trash'
              route='/trash'
              onClick={() => console.log('opening trash')}
            />
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
