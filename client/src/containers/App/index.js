import React, { Component } from 'react'
import styles from './app.module.scss'
import Library from '../Library'
import SideNav from '../SideNav/SideNav'
import Trash from '../Trash'
import { Route, Switch, Redirect } from 'react-router-dom'
// import Pagination from '../../components/Pagination'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'

class App extends Component {
  render () {
    return (
      <div className={styles['container-fluid']}>
        <SideNav />
        <div className={styles['content-box']}>
          <Switch>
            <Route exact path='/library' component={Library} />
            <Route exact path='/trash' component={Trash} />
            <Route path='/*' render={() => <Redirect to={'/library'} />} />
          </Switch>
        </div>

        {/* <Pagination
              currentPage={2}
              totalPages={12}
              setPage={() => console.log('setPage called!')}
            /> */}
        <Modal />
      </div>
    )
  }
}

App.propTypes = {
  // totalPages: PropTypes.number,
  // currentPage: PropTypes.number,
  // setPage: PropTypes.func,
  // getFiles: PropTypes.func
}

const mapStateToProps = state => ({
  // totalPages: state.library.totalPages,
  // currentPage: state.library.currentPage
})

const mapDispatchToProps = dispatch => ({
  // setPage: page => dispatch(setPage(page)),
  // getFiles: () => dispatch(getFiles())
})

// Unnecessary???
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
