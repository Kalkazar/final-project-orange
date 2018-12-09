import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './sideNav.module.scss'
import { FolderFunctionsCard, UploadCard } from '../../components/Card'
import NavButton from '../../components/NavButton'
import PropTypes from 'prop-types'
import { changeView } from '../../ducks/ui.duck'
import $ from 'jquery'

export class SideNav extends Component {
  componentDidMount () {
    this.createFolderModal = $('#createFolderModal')
  }

  render () {
    return (
      <div className={styles.navDiv}>
        <NavButton
          text='Library'
          route='/library'
          onClick={() => this.props.changeView(false)}
        />
        <NavButton
          text='Trash'
          route='/trash'
          onClick={() => this.props.changeView(true)}
        />
        <FolderFunctionsCard
          createFolder={
            () => {
              // document.getElementById('#createFolderModal').modal()
              // document.getElementById('createFolderModal').classList.add('show')
              console.log($('#createFolderModal'))
              $('#createFolderModal')[0].modal()
              // this.createFolderModal.modal()
            }
          }
          uploadFolder={
            // Placeholder - pls implement
            () => {
              // document.getElementById('createFolderModal').modal()
              // document.getElementById('#createFolderModal').classList.add('show')
            }
            // data-toggle="modal" data-target="#exampleModal"
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
  changeView: view => dispatch(changeView(view))
  // uploadFolder: folder => dispatch(uploadFolder(folder)),
  // uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
