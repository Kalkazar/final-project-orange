import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './sideNav.module.scss'
import NavButton from '../../components/NavButton'

export class SideNav extends Component {
  render () {
    return (
      <div className={styles.navDiv}>
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
