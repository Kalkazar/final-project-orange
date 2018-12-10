/**
 * @typedef {import('../helpers/types').FileResponse} FileResponse
 * @typedef {import('../helpers/types').FolderResponse} FolderResponse
 * @typedef {import('../helpers/types').ViewState} LibraryState
 * @typedef {import('axios').AxiosPromise} AxiosPromise
 */

import Axios from 'axios'

/**
 * [PARTIALLY IMPLEMENTED] Upload a new file
 * @param {Any} file File data to upload
 * @returns {AxiosPromise<FileResponse>}
 */
const uploadFile = file => {
  const formData = new FormData()
  formData.append('name', file.name)
  formData.append('file', file)
  return Axios.post('file', formData)
}

/**
 * Returns a file via UID if it exists
 * @param {Number} uid UID of file to retrieve
 * @returns {AxiosPromise<FileResponse>}
 */
const getFile = uid =>
  Axios.get(`file/${uid}`)

/**
 * Downloads a file’s data.
 * This should be called in-browser to initiate
 * file download by user
 * @param {Number} uid UID of file to download
 */
const downloadFile = uid => {
  console.log('test')
  return Axios.get(`file/${uid}/download`)
    .then(response => {
      getFile(uid).then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', data.name)
        document.body.appendChild(link)
        link.click()
        // document.body.removeChild(link)
      })
      // const url = window.URL.createObjectURL(new Blob([response.data]))
      // const link = document.createElement('a')
      // link.href = url
      // link.setAttribute('download', 'file.pdf')
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    })
    .catch(err => (console.log(err)))
}

/**
 * Returns all files
 * @returns {AxiosPromise<FileResponse[]>}
 */
const getAllFiles = () =>
  Axios.get(`file`)

/**
 * Renames the given file by uid
 * @param {Number} uid UID of file to rename
 * @param {String} newName New name to assign to file
 * @returns {AxiosPromise<FileResponse>}
 */
const renameFile = (uid, newName) =>
  Axios.patch(`file/${uid}/rename/${newName}`)

/**
 * Moves a file into a folder by UID
 * @param {Number} fileUid UID of file to move
 * @param {Number} [folderUid] UID of destination folder.  Moves the file to root if undefined
 * @returns {AxiosPromise<FileResponse>}
 */
const moveFile = (fileUid, folderUid) =>
  Axios.patch(
    folderUid > -1
      ? `file/${fileUid}/move/${folderUid}`
      : `file/${fileUid}/move`
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
 * @returns {AxiosPromise<FolderResponse>}
 */
const uploadFolder = folder =>
  Axios.post('folder', folder)

/**
 * Creates a new empty folder
 * @param {String} folderName Name of newly created folder
 * @returns {AxiosPromise<FolderResponse>}
 */
const createFolder = folderName =>
  Axios.post(`folder/create/${folderName}`)

/**
 * Gets all folders (dtos as List)
 * @returns {AxiosPromise<FolderResponse[]>}
 */
const getAllFolders = () =>
  Axios.get(`folder`)

/**
 * Gets a folder via UID
 * @param {Number} uid UID of folder to get
 * @returns {AxiosPromise<FolderResponse>}
 */
const getFolder = uid =>
  Axios.get(`folder/${uid}`)

/**
* Downloads a folder's data.
* This should be called in-browser to initiate
* file download by user
* @param {Number} uid UID of file to download
*/
const downloadFolder = uid => {
  return Axios.get(`folder/${uid}/download`, { responseType: 'arraybuffer' })
    .then(response => {
      getFolder(uid).then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', data.name + '.zip')
        document.body.appendChild(link)
        link.click()
      })
    })
    .catch(err => console.log(err))
}

/**
 * Renames a folder by UID
 * @param {Number} uid UID of folder to rename
 * @param {String} newName New name to assign to folder
 * @returns {AxiosPromise<FolderResponse>}
 */
const renameFolder = (uid, newName) =>
  Axios.get(`folder/${uid}/rename/${newName}`)

/**
 * Moves a folder to the destination folder
 * @param {Number} folderUid UID of folder to move
 * @param {Number} [containerUid] Destination folder, moves to root if undefined
 * @returns {AxiosPromise<FolderResponse>}
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
 * @returns {AxiosPromise<FolderResponse>} trashbinned folder
 */
const trashFolder = uid =>
  Axios.delete(`folder/${uid}`)

/**
 * Restores a file via uid
 * @param {Number} uid UID of file to restore
 * @returns {AxiosPromise<FileResponse>} restored file
 */
const restoreFile = uid =>
  Axios.patch(`trash/file/${uid}/restore`)

/**
 * Restores a folder via uid
 * @param {Number} uid UID of folder to restore
 * @returns {AxiosPromise<FolderResponse>} restored folder
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
  Axios.delete(`trash/file/${uid}/delete`)

/**
 * Permanently deletes a folder by uid
 * @param {Number} uid UID of folder to permanently delete
 */
const deleteFolder = uid =>
  Axios.delete(`trash/folder/${uid}/delete`)

/**
 * Permanently deletes all files and folders in trash
 */
const deleteAll = () =>
  Axios.delete(`trash/delete`)

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
    downloadFolder,
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
