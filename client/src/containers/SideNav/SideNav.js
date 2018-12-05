import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './sideNav.module.scss'

export class SideNav extends Component {
  render () {
    return (
      <div className={styles.navDiv}>
        <button>Library Nav</button>
        <button>Trash Nav</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
