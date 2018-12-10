import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './sideNav.module.scss'
import { FolderFunctionsCard, UploadCard } from '../../components/Card'
import NavButton from '../../components/NavButton'
import PropTypes from 'prop-types'
import { changeView } from '../../ducks/ui.duck'
import { Modals as ModalsDuck } from '../../ducks'

const { toggleCreateFolder } = ModalsDuck

export class SideNav extends Component {
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
          createFolder={this.props.toggleCreateFolder}
          uploadFolder={
            // Placeholder - pls implement
            () => {}
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
  uploadFile: PropTypes.func,
  toggleCreateFolder: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  // Hook up appropriate Redux methods
  changeView: view => dispatch(changeView(view)),
  toggleCreateFolder: () => dispatch(toggleCreateFolder())
  // uploadFolder: folder => dispatch(uploadFolder(folder)),
  // uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
