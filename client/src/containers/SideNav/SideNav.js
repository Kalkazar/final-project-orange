import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './sideNav.module.scss'
import { FolderFunctionsCard, UploadCard } from '../../components/Card'
import NavButton from '../../components/NavButton'
import PropTypes from 'prop-types'

export class SideNav extends Component {
  render () {
    return (
      <div className={styles.navDiv}>
        <NavButton
          text='Library'
          route='/library'
          onClick={
            // Placeholder - pls implement
            () => console.log('opening library')
          }
        />
        <NavButton
          text='Trash'
          route='/trash'
          onClick={
            // Placeholder - pls implement
            () => console.log('opening trash')
          }
        />
        <FolderFunctionsCard
          createFolder={console.log}
          uploadFolder={
            // Placeholder - pls implement
            () => console.log('UPLOADING FOLDER')
          }
        />
        <UploadCard
          fileType='file'
          upload={
            // Placeholder - pls implement
            () => console.log('UPLOADING FILE')
          }
        />
      </div>
    )
  }
}

SideNav.propTypes = {
  changeView: PropTypes.func,
  uploadFolder: PropTypes.func,
  uploadFile: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  // changeView: view => dispatch(changeView(view)),
  // uploadFolder: folder => dispatch(uploadFolder(folder)),
  // uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
