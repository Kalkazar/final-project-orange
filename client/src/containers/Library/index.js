import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './library.module.scss'
import {
  FileCard,
  FolderCard,
  UploadCard,
  TrashCard,
  FolderFunctionsCard
} from '../../components/Card'

export class Library extends Component {
  componentDidMount () {
    console.log('Get All Files and Folders')
  }

  render () {
    return (
      <div className={styles.libDiv}>
        <span className={styles.pathSpan}>this/is/the/path/span</span>

        {/* Checking props manually for testing */}
        { console.log('Library props', this.props) }

        {/* If props.activePage exists, render cards for items */}
        { this.props.activePage ? this.props.activePage.map((e, i) =>
          (<FileCard
            key={i}
            fileName={e.name}
            fileId={e.uid}
            trashFile={console.log}
            downloadFile={console.log}
          />)
        ) : null }

      </div>
    )
  }
}

Library.propTypes = {
  activePage: PropTypes.array
}

const mapStateToProps = state => ({
  activePage: state.library.activePage
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
