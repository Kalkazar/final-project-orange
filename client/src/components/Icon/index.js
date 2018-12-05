import React from 'react'
import styles from './icon.module.scss'

const Icon = props => (
  <div className={`${styles.iconClass} ${props.wrapper}`}>
    <i className={`${props.iconClass} fa-2x`} onClick={props.onClick} />
  </div>
)

export const DownloadIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-arrow-alt-circle-down'}
    wrapper={styles.cardIcon}
  />
)

export const UploadIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-upload'}
    wrapper={styles.cardIcon}
  />
)

export const TrashIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-trash-alt'}
    wrapper={styles.cardIcon}
  />
)

export const OpenFolderIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-folder-open'}
    wrapper={styles.cardIcon}
  />
)

export const CreateFolderIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-folder-plus'}
    wrapper={styles.cardIcon}
  />
)

export const RestoreIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-window-restore'}
    wrapper={styles.cardIcon}
  />
)

export const FileIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-file'}
    wrapper={styles.noHover}
  />
)

export const FolderIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-folder'}
    wrapper={styles.noHover}
  />
)

export const MoveIcon = props => (
  <Icon
    onClick={props.onClick}
    iconClass={'fas fa-directions'}
    wrapper={styles.cardIcon}
  />
)

export default Icon
