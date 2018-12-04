import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './library.module.scss'

export class Library extends Component {
  render () {
    return <div className={styles.libDiv}>This is the library container</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
