import React from 'react'
import styles from './card.module.scss'
import {
  DownloadIcon,
  UploadIcon,
  TrashIcon,
  OpenFolderIcon,
  MoveIcon,
  CreateFolderIcon,
  RestoreIcon,
  FileIcon,
  FolderIcon
} from '../Icon'
import InnerButton from '../InnerButton'
import UploadButton from '../UploadButton'

const Card = ({ children }) => (
  <div className={styles.cardHolder}>
    <div className={styles.cardBody}>{children}</div>
  </div>
)

// export const UploadCard = ({ fileType, upload }) => (
//   <Card>
//     <div className={styles.cardTitle}>Upload {fileType}</div>
//     <div onClick={upload} className={styles.uploadIconHolder}>
//       <UploadIcon onClick={() => {}} />
//     </div>
//   </Card>
// )

export const UploadCard = ({ fileType, upload, uploadFolder }) => (
  <div>
    <UploadButton
      name='Upload File'
      onClick={uploadFolder}
      icon={<UploadIcon onClick={() => {}} />}
    />
  </div>
)

// export const FolderFunctionsCard = ({ createFolder, uploadFolder }) => (
//   <Card>
//     <div className={styles.createAndUploadCardHolder}>
//       <InnerButton
//         name='Create Folder'
//         onClick={createFolder}
//         icon={<CreateFolderIcon onClick={() => {}} />}
//       />
//       <InnerButton
//         name='Upload Folder'
//         onClick={uploadFolder}
//         icon={<UploadIcon onClick={() => {}} />}
//       />
//     </div>
//   </Card>
// )

export const FolderFunctionsCard = ({ createFolder, uploadFolder }) => (
  <div>
    <div>
      <InnerButton
        name='Create Folder'
        onClick={createFolder}
        icon={<CreateFolderIcon onClick={() => {}} />}
      />
      <InnerButton
        name='Upload Folder'
        onClick={uploadFolder}
        icon={<UploadIcon onClick={() => {}} />}
      />
    </div>
  </div>
)

export const TrashCard = ({ name, fileType, id, deleteForever, restore }) => (
  <Card>
    <div className={styles.cardTitle}>{name}</div>
    <div className={styles.trashCardHolder}>
      <InnerButton
        name={`Delete ${fileType}`}
        onClick={() => deleteForever(id)}
        icon={<TrashIcon onClick={() => {}} />}
      />
      <InnerButton
        name={`Restore ${fileType}`}
        onClick={() => restore(id)}
        icon={<RestoreIcon onClick={() => {}} />}
      />
    </div>
  </Card>
)

export const FileCard = ({
  fileName,
  fileId,
  trashFile,
  downloadFile,
  moveFile
}) => (
  <Card>
    <div className={styles.cardTitle}>
      {fileName}{' '}
      <div className={styles.titleIconHolder}>
        <FileIcon onClick={() => {}} />
      </div>
    </div>
    <div className={styles.fileCardBody}>
      <TrashIcon onClick={() => trashFile(fileId)} />
      <MoveIcon onClick={() => moveFile(fileId)} />
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
      <TrashIcon
        onClick={e => {
          e.stopPropagation()
          trashFolder(folderId)
        }}
      />
      <DownloadIcon
        onClick={e => {
          e.stopPropagation()
          downloadFolder(folderId)
        }}
      />
    </div>
  </Card>
)
