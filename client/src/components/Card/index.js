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

const Card = ({ children }) => (
  <div className={styles.cardHolder}>
    <div className={styles.cardBody}>{children}</div>
  </div>
)

export const UploadCard = ({ fileType, upload }) => (
  <Card>
    <div className={styles.cardTitle}>Upload {fileType}</div>
    <div onClick={upload} className={styles.uploadIconHolder}>
      <UploadIcon onClick={upload} />
    </div>
  </Card>
)

export const TrashCard = ({ name, id, deleteForever, restore }) => (
  <Card title={name}>
    <div className={styles.cardTitle}>{name}</div>
    <div className={styles.fileCardBody}>
      <TrashIcon onClick={() => deleteForever(id)} />
      <RestoreIcon onClick={() => restore(id)} />
    </div>
  </Card>
)

export const FileCard = ({ fileName, fileId, trashFile, downloadFile }) => (
  <Card title={fileName}>
    <div className={styles.cardTitle}>{fileName}</div>
    <div className={styles.fileCardBody}>
      <TrashIcon onClick={() => trashFile(fileId)} />
      <DownloadIcon onClick={() => downloadFile(fileId)} />
    </div>
  </Card>
)

export const FolderCard = ({
  folderName,
  folderId,
  trashFolder,
  downloadFolder,
  openFolder
}) => (
  <Card title={folderName}>
    <div className={styles.cardTitle}>
      {folderName}
      <div className={styles.titleIconHolder}>
        <FolderIcon onClick={() => openFolder(folderId)} />
      </div>
    </div>
    <div className={styles.folderText}>Open Folder</div>

    <div className={styles.folderCardBody} onClick={() => openFolder(folderId)}>
      <TrashIcon onClick={() => trashFolder(folderId)} />
      <DownloadIcon onClick={() => downloadFolder(folderId)} />
    </div>
  </Card>
)
