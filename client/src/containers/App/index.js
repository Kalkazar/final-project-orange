import React, { Component } from 'react'
import styles from './app.module.scss'
import Library from '../Library'
import { SideNav } from '../SideNav/SideNav'
import { NavButton } from '../../components/NavButton'
import { Trash } from '../Trash'
import { Route } from 'react-router-dom'
import Pagination from '../../components/Pagination'

class App extends Component {
  render () {
    return (
      <div className='container-fluid '>
        <div className='row justify-content-center'>
          <div className=' col-sm-12 col-md-3 col-lg-3 col-xl-3'>
            <SideNav />
          </div>
          <div className=' col-sm-12 col-md-9 col-lg-8 col-xl-7'>
            <Route path='/library' component={Library} />
            <Route path='/trash' component={Trash} />
            <Pagination totalPages={5} currentPage={2} totalRecords={10} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
