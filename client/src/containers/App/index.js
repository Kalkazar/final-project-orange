import React, { Component } from 'react'
import styles from './app.module.scss'
import { FileCard } from '../../components/Card'
import { SideNav } from '../SideNav/SideNav'
import { Library } from '../Library'

class App extends Component {
  render () {
    return (
      <div className={`container-fluid ${styles.nopadding}`}>
        <div className={`row justify-content-center ${styles.nopadding}`}>
          <div className=' col-sm-12 col-md-3 col-lg-2 col-xl-3'>
            <SideNav />
          </div>
          <div className=' col-sm-12 col-md-9 col-lg-8 col-xl-7'>
            <Library />
          </div>
        </div>
      </div>
    )
  }
}

export default App
