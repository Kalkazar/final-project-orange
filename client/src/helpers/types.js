/**
 * @typedef UiState
 * @property {Object} currentFolder
 * @property {Number} currentPage
 * @property {Boolean} trashLoaded
 */

/**
 * @typedef ViewState
 * @property {FileResponse[]} fileList List of all files in trash (outside of folders?)
 * @property {FolderResponse[]} folderList List of all folders in trash
 * @property {Array<FileResponse|FolderResponse>} currentList List of items to be displayed
 * @property {Array<FileResponse|FolderResponse>} displayItems List of items to be displayed
 * @property {Number} currentPage Page of results to display
 * @property {Number} totalPages Total number of pages of results
 * @property {Boolean} foldersLoaded
 */

/**
 * @typedef LibraryState
 * @property {FileResponse[]} fileList List of all files in trash (outside of folders?)
 * @property {FolderResponse[]} folderList List of all folders in trash
 * @property {Array<FileResponse|FolderResponse>} currentList List of items to be displayed
 * @property {Array<FileResponse|FolderResponse>} displayItems List of items to be displayed
 * @property {Number} currentPage Page of results to display
 * @property {Number} totalPages Total number of pages of results
 * @property {Boolean} foldersLoaded
 * @property {FolderResponse} displayFolder Folder contents currently being viewed
 */

/**
 * @typedef ReduxAction
 * @property {String} type
 * @property {Any} payload
 */

/**
 * @function ActionCreator
 * @returns {ReduxAction}
 */

/**
 * @typedef FileResponse
 * @property {Number} uid File's unique ID
 * @property {String} name File's name
 * @property {Number} [containerId] File's containing folder, file contained in root if null or undefined
 * @property {Boolean} inTrash Whether or not file is currently in the trash bin/staged for permanent deletion
 */

/**
 * @typedef FolderResponse
 * @property {Number} uid Folder's unique ID
 * @property {String} name Folder's name
 * @property {FileResponse[]} filesContained Files this folder directly contains
 * @property {FolderResponse[]} foldersContained Folders this folder directly contains
 * @property {Number} [containerId] Folder's containing folder, folder contained in root if null or undefined
 * @property {Boolean} inTrash Whether or not file is currently in the trash bin/staged for permanent deletion
 */

export default null
