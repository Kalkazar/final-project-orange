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
import InnerButton from '../InnerButton'

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

export const FolderFunctionsCard = ({ createFolder, uploadFolder }) => (
  <Card>
    <div className={styles.trashCardHolder}>
      <InnerButton
        name='Create Folder'
        onClick={createFolder}
        icon={<CreateFolderIcon onClick={createFolder} />}
      />
      <InnerButton
        name='Upload Folder'
        onClick={uploadFolder}
        icon={<UploadIcon onClick={uploadFolder} />}
      />
    </div>
  </Card>
)

export const TrashCard = ({ name, fileType, id, deleteForever, restore }) => (
  <Card>
    <div className={styles.cardTitle}>{name}</div>
    <div className={styles.trashCardHolder}>
      <InnerButton
        name={`Delete ${fileType}`}
        onClick={() => deleteForever(id)}
        icon={<TrashIcon onClick={() => deleteForever(id)} />}
      />
      <InnerButton
        name={`Restore ${fileType}`}
        onClick={() => restore(id)}
        icon={<RestoreIcon onClick={() => restore(id)} />}
      />
    </div>
  </Card>
)

export const FileCard = ({ fileName, fileId, trashFile, downloadFile }) => (
  <Card>
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
  <Card>
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
