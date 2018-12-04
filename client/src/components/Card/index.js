import React from 'react'
import styles from './card.module.scss'
import {
  DownloadIcon,
  UploadIcon,
  TrashIcon,
  OpenFolderIcon,
  CreateFolderIcon,
  RestoreIcon,
  FileIcon,
  FolderIcon
} from '../Icon'

const Card = ({ children, title }) => (
  <div className={styles.cardHolder}>
    {title && <div className={styles.cardTitle}>{title}</div>}
    <div className={styles.cardBody}>{children}</div>
  </div>
)

export const FileCard = ({ fileName, fileId, trashFile, downloadFile }) => (
  <Card title={fileName}>
    <div className={styles.fileCardBody}>
      <TrashIcon onClick={trashFile(fileId)} />
      <DownloadIcon onClick={downloadFile(fileId)} />
    </div>
  </Card>
)
