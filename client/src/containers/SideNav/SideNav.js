import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styles from './sideNav.module.scss'
import NavButton from '../../components/NavButton'
import PropTypes from 'prop-types'
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
        />
        <NavButton
          text='Trash'
          route='/trash'
        />
        <Switch>
          <Route exact path={'/library'} >
            <FolderNavButton
              text='Create Folder'
              onClick={this.props.toggleCreateFolder}
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
  toggleCreateFolder: () => dispatch(toggleCreateFolder())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
