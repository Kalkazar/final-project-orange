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

// Folder
// @POST /folder/
// Uploads a new folder
// Returns folder dto of newly uploaded folder

const uploadFolder = folder =>
  Axios.post('folder', folder)

// @POST /folder/create/{name}
// Creates a new empty folder
// Returns folder dto of newly created folder

const createFolder = folderName =>
  Axios.post(`folder/create/${folderName}`)

// @GET /folder/
// Returns all folders (dtos as List)

const getAllFolders = () =>
  Axios.get(`folder`)

// @GET /folder/{folder_uid}/
// Returns a folder (dto) via uid if it exists

const getFolder = uid =>
  Axios.get(`folder/${uid}`)

// @PATCH /folder/{folder_uid}/rename/{new_name}/
// Renames a folder by uid
// Returns renamed folder (dto)

const renameFolder = (uid, newName) =>
  Axios.get(`folder/${uid}/rename/${newName}`)

// @PATCH /folder/move/{uid}/
// Moves a folder to the root folder
// Returns moved folder (dto)

const moveFolder = (folderUid, containerUid) =>
  Axios.patch(
    containerUid
      ? `file/move/${folderUid}/${containerUid}`
      : `file/move/${folderUid}`
  )

// @PATCH /folder/move/{folder_uid}/{container_uid}/
// Moves a folder into a folder via uids
// Returns moved folder (dto)

// @DELETE /folder/{folder_uid}/
// Moves a folder to trash via uid
// Returns deleted folder (dto)
// Pending documentation

const deleteFolder = uid =>
  Axios.delete(`folder/${uid}`)

// Trash
// @PATCH /trash/file/{file_uid}/restore/
// Restores a file via uid

const restoreFile = uid =>
  Axios.patch(`trash/file/${uid}/restore`)

// @PATCH /trash/folder/{folder_uid}/restore/
// Restores a folder via uid

const restoreFolder = uid =>
  Axios.patch(`trash/folder/${uid}/restore`)

// @PATCH /trash/restore/
// Restores all file and folders in trash

const restoreAll = () =>
  Axios.patch(`trash/restore`)

// @DELETE /trash/file/{file_uid}/delete/
// Permanently deletes a file by uid

const deleteFile = uid =>
  Axios.patch(`trash/file/${uid}/delete`)

// @DELETE /trash/folder/{folder_uid}/delete/
// Permanently deletes a folder by uid

const deleteFolder = uid =>
  Axios.patch(`trash/folder/${uid}/delete`)

// @DELETE /trash/delete/
// Permanently deletes all files and folders in trash

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
  }
}
