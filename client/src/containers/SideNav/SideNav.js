import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styles from './sideNav.module.scss'
import NavButton from '../../components/NavButton'
import PropTypes from 'prop-types'
import { Modals as ModalsDuck } from '../../ducks'
import FolderNavButton from '../../components/FolderNavButton'
import UploadButton from '../UploadButton'

const { toggleCreateFolder, verifyMethod, validVerificationMethods: VVM } = ModalsDuck

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
              onClick={() => this.props.verifyMethod(VVM.RESTORE_ALL)}
            />
            <FolderNavButton
              text='Delete All'
              onClick={() => this.props.verifyMethod(VVM.DELETE_ALL)}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

SideNav.propTypes = {
  uploadFolder: PropTypes.func,
  uploadFile: PropTypes.func,
  verifyMethod: PropTypes.func.isRequired,
  toggleCreateFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  toggleCreateFolder: () => dispatch(toggleCreateFolder()),
  verifyMethod: method => dispatch(verifyMethod(method))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
