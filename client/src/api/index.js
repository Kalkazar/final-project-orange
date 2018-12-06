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

export const LiveEndpoints = {
  File: {
    uploadFile,
    getFile,
    downloadFile,
    getAllFiles,
    renameFile,
    moveFile,
    trashFile
  }
}
