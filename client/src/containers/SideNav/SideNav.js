import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styles from './sideNav.module.scss'
import NavButton from '../../components/NavButton'
import PropTypes from 'prop-types'
// import { changeView } from '../../ducks/ui.duck'
import { Modals as ModalsDuck } from '../../ducks'
import FolderNavButton from '../../components/FolderNavButton'
import UploadButton from '../UploadButton'

const { toggleCreateFolder } = ModalsDuck

export class SideNav extends Component {
  render () {
    return (
      <div className={styles.navDiv}>
        <NavButton
          text='Library'
          route='/library'
          // onClick={() => this.props.changeView(false)}
        />
        <NavButton
          text='Trash'
          route='/trash'
          // onClick={() => this.props.changeView(true)}
        />
        <Switch>
          <Route exact path={'/library'} >
            <FolderNavButton
              text='Create Folder'
              // createFolder={this.props.toggleCreateFolder}
              onClick={this.props.toggleCreateFolder}
              uploadFolder={
                // Placeholder - pls implement
                () => {}
              }
            />
            <UploadButton
              // text='Upload File/Folder'
              fileType='file'
              upload={
                // Placeholder - pls implement
                () => console.log('UPLOADING FILE')
              }
            />
          </Route>
          <Route exact path={'/trash'} >
            <FolderNavButton
              text='Restore All'
              onClick={() => console.log('Fire RestoreAll')}
            />
            <FolderNavButton
              text='Delete All'
              onClick={() => console.log('Fire DeleteAll')}
            />
          </Route>
        </Switch>
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
  // changeView: view => dispatch(changeView(view)),
  toggleCreateFolder: () => dispatch(toggleCreateFolder())
  // uploadFolder: folder => dispatch(uploadFolder(folder)),
  // uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
