import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './sideNav.module.scss'
import { FolderFunctionsCard, UploadCard } from '../../components/Card'

export class SideNav extends Component {
  render () {
    return (
      <div className={styles.navDiv}>
        <button>Library Nav</button>
        <button>Trash Nav</button>
        <FolderFunctionsCard
          createFolder={console.log}
          uploadFolder={console.log}
        />
        <UploadCard
          fileType='file'
          upload={() => console.log('uploading file...')}
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
