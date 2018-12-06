import { files, folders, file, FileResponse } from '../helpers/mock-responses'
import Axios, { AxiosPromise } from 'axios'

export const getFileList = () =>
  new Promise((resolve, reject) => {
    resolve(files)
  })

// Appropriate endpoint - get all files
// Axios.get('file')
//   .then()

export const getFolderList = () =>
  new Promise((resolve, reject) => {
    resolve(folders)
  })

// Appropriate endpoint - get all folders
// Axios.get('folder')
//   .then()

/**
 * [PARTIALLY IMPLEMENTED] Upload a new file
 * @param {Any} file File data to upload
 * @returns {AxiosPromise<FileResponse>}
 */
const uploadFile = file =>
  Axios.post('file', file)

/**
 * Returns a file via UID if it exists
 * @param {Number} uid UID of file to retrieve
 * @returns {AxiosPromise<FileResponse>}
 */
const getFile = uid =>
  Axios.get(`file/${uid}`)

/**
 * [PARTIALLY IMPLEMENTED] Downloads a file’s data.
 * This should be called in-browser to initiate
 * file download by user
 * @param {Number} uid UID of file to download
 */
const downloadFile = uid =>
  Axios.get(`file/${uid}/download`)

/**
 * Returns all files
 * @returns {AxiosPromise<FileResponse[]>}
 */
const getAllFiles = () =>
  Axios.get(`file`)

/**
 * Renames the given file by uid
 * @param {Number} uid UID of file to rename
 * @returns {AxiosPromise<FileResponse>}
 */
const renameFile = uid =>
  Axios.patch(`file/${uid}/download`)

/**
 * Moves a file into a folder by UID
 * @param {Number} fileUid UID of file to move
 * @param {Number} [folderUid] UID of destination folder.  Moves the file to root if undefined
 * @returns {AxiosPromise<FileResponse>}
 */
const moveFile = (fileUid, folderUid) =>
  Axios.patch(
    folderUid
      ? `file/move/${fileUid}/${folderUid}`
      : `file/move/${fileUid}`
  )

/**
 * Moves a file to the trash via uid
 * @param {Number} uid UID of file to trashbin
 * @returns {AxiosPromise<FileResponse>}
 */
const trashFile = uid =>
  Axios.delete(`file/${uid}`)

/**
 * [PARTIALLY IMPLEMENTED] Upload a new folder
 * @param {Any} folder Folder to upload
 * @returns {AxiosPromise<Any>}
 */
const uploadFolder = folder =>
  Axios.post('folder', folder)

/**
 * Creates a new empty folder
 * @param {String} folderName Name of newly created folder
 * @returns folder dto of newly created folder
 */
const createFolder = folderName =>
  Axios.post(`folder/create/${folderName}`)

/**
 * Gets all folders (dtos as List)
 * @returns {AxiosPromise<Any[]>}
 */
const getAllFolders = () =>
  Axios.get(`folder`)

/**
 * Gets a folder via UID
 * @param {Number} uid UID of folder to get
 * @returns {AxiosPromise<Any>}
 */
const getFolder = uid =>
  Axios.get(`folder/${uid}`)

/**
 * Renames a folder by UID
 * @param {Number} uid UID of folder to rename
 * @param {String} newName New name to assign to folder
 * @returns {AxiosPromise<Any>}
 */
const renameFolder = (uid, newName) =>
  Axios.get(`folder/${uid}/rename/${newName}`)

/**
 * Moves a folder to the destination folder
 * @param {Number} folderUid UID of folder to move
 * @param {Number} [containerUid] Destination folder, moves to root if undefined
 * @returns {AxiosPromise<Any>}
 */
const moveFolder = (folderUid, containerUid) =>
  Axios.patch(
    containerUid
      ? `file/move/${folderUid}/${containerUid}`
      : `file/move/${folderUid}`
  )

/**
 * Moves a folder to trash bin via uid
 * @param {Number} uid UID of folder to trash bin
 * @returns {AxiosPromise<Any>} trashbinned folder
 */
const trashFolder = uid =>
  Axios.delete(`folder/${uid}`)

/**
 * Restores a file via uid
 * @param {Number} uid UID of file to restore
 */
const restoreFile = uid =>
  Axios.patch(`trash/file/${uid}/restore`)

/**
 * Restores a folder via uid
 * @param {Number} uid UID of folder to restore
 */
const restoreFolder = uid =>
  Axios.patch(`trash/folder/${uid}/restore`)

/**
 * Restores all file and folders in trash
 */
const restoreAll = () =>
  Axios.patch(`trash/restore`)

/**
 * Permanently deletes a file by uid
 * @param {Number} uid UID of file to permanently delete
 */
const deleteFile = uid =>
  Axios.patch(`trash/file/${uid}/delete`)

/**
 * Permanently deletes a folder by uid
 * @param {Number} uid UID of folder to permanently delete
 */
const deleteFolder = uid =>
  Axios.patch(`trash/folder/${uid}/delete`)

/**
 * Permanently deletes all files and folders in trash
 */
const deleteAll = () =>
  Axios.patch(`trash/delete`)

export const LiveEndpoints = {
  File: {
    uploadFile,
    getFile,
    downloadFile,
    getAllFiles,
    renameFile,
    moveFile,
    trashFile
  },
  Folder: {
    uploadFolder,
    createFolder,
    getFolder,
    getAllFolders,
    renameFolder,
    moveFolder,
    trashFolder
  },
  Trash: {
    restoreFile,
    restoreFolder,
    restoreAll,
    deleteFile,
    deleteFolder,
    deleteAll
  }
}