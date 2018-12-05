import React, { Component } from 'react'
import styles from './app.module.scss'
import { Library } from '../Library'
import { SideNav } from '../SideNav/SideNav'
import { NavButton } from '../../components/NavButton'

class App extends Component {
  render () {
    return (
      <div className='container-fluid '>
        <div className='row justify-content-center'>
          <div className=' col-sm-12 col-md-3 col-lg-3 col-xl-3'>
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
