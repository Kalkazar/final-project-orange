import styles from './topNavBar.module.scss'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavButton from '../../components/NavButton'
import FolderNavButton from '../../components/FolderNavButton'
import { Modals as ModalsDuck } from '../../ducks'
import UploadButton from '../UploadButton'
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap'

export default class topNavBar extends Component {
  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const {
      toggleCreateFolder,
      verifyMethod,
      validVerificationMethods: VVM
    } = ModalsDuck

    return (
      <div className={styles.topNav}>
        <Navbar color='faded' light>
          <NavbarToggler onClick={this.toggleNavbar} className='mr-2' />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar className={styles.navExtend}>
              <NavButton text='Library' route='/library' />
              <NavButton text='Trash' route='/trash' />
              <Switch>
                <Route exact path={'/library'}>
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
                <Route exact path={'/trash'}>
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
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
