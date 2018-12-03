import React, { Component } from 'react'
import styles from './app.module.scss'

class App extends Component {
  render () {
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>Are you ready?</header>
      </div>
    )
  }
}

export default App
