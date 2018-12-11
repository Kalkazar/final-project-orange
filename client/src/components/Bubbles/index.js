import React, { Component } from 'react'
import styles from './bubbles.module.scss'

class Bubbles extends Component {
  render () {
    return (
      <div>
        <div className={`${styles.backgroundWrap}`}>
          <div className={`${styles.bubble} ${styles.x1}`} />
          <div className={`${styles.bubble} ${styles.x2}`} />
          <div className={`${styles.bubble} ${styles.x3}`} />
          <div className={`${styles.bubble} ${styles.x4}`} />
          <div className={`${styles.bubble} ${styles.x5}`} />
          <div className={`${styles.bubble} ${styles.x6}`} />
          <div className={`${styles.bubble} ${styles.x7}`} />
          <div className={`${styles.bubble} ${styles.x8}`} />
          <div className={`${styles.bubble} ${styles.x9}`} />
          <div className={`${styles.bubble} ${styles.x10}`} />
        </div>
      </div>
    )
  }
}

export default Bubbles
