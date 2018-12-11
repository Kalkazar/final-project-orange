import React, { Component } from 'react'
import styles from './bubbles.module.scss'

class Bubbles extends Component {
  render () {
    return (
      <div>
        <div class={`${styles.backgroundWrap}`}>
          <div class={`${styles.bubble} ${styles.x1}`} />
          <div class={`${styles.bubble} ${styles.x2}`} />
          <div class={`${styles.bubble} ${styles.x3}`} />
          <div class={`${styles.bubble} ${styles.x4}`} />
          <div class={`${styles.bubble} ${styles.x5}`} />
          <div class={`${styles.bubble} ${styles.x6}`} />
          <div class={`${styles.bubble} ${styles.x7}`} />
          <div class={`${styles.bubble} ${styles.x8}`} />
          <div class={`${styles.bubble} ${styles.x9}`} />
          <div class={`${styles.bubble} ${styles.x10}`} />
        </div>
      </div>
    )
  }
}

export default Bubbles
