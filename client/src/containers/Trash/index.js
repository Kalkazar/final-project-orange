import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './trash.module.scss'
import {
  FileCard,
  FolderCard,
  UploadCard,
  TrashCard,
  FolderFunctionsCard
} from '../../components/Card'

export class Trash extends Component {
  render () {
    return (
      <div className={styles.trashDiv}>
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
        />
        <TrashCard
          name="Don't delete me.txt"
          id={2}
          deleteForever={console.log}
          restore={console.log}
          fileType='file'
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
)(Trash)
