/**
 * @typedef {import('../helpers/types').ReduxAction} ReduxAction
 * @typedef {import('../helpers/types').FileResponse} FileResponse
 * @typedef {import('../helpers/types').FolderResponse} FolderResponse
 * @typedef {import('../helpers/types').ViewState} LibraryState
 */

import { FILES_PER_PAGE } from './ui.duck'
import { LiveEndpoints } from '../api'
import { Trash } from './'

/**
 * Add file to state
 */
export const ADD_FILE = 'drivestorage/library/ADD_FILE'

/**
 * Edit file in state
 */
export const EDIT_FILE = 'drivestorage/library/EDIT_FILE'

/**
 * Remove file from state
 */
export const REMOVE_FILE = 'drivestorage/library/REMOVE_FILE'

/**
 * Add file to state
 */
export const ADD_FOLDER = 'drivestorage/library/ADD_FOLDER'

/**
 * Rename a folder in state
 */
export const RENAME_FOLDER = 'drivestorage/library/RENAME_FOLDER'

/**
 * Remove folder from state
 */
export const REMOVE_FOLDER = 'drivestorage/library/REMOVE_FOLDER'

/**
 * Updates current list of results to be displayed
 */
export const UPDATE_CURRENT_LIST = 'drivestorage/library/UPDATE_CURRENT_LIST'

/**
 * Updates current page of results to be displayed
 */
export const UPDATE_CURRENT_PAGE = 'drivestorage/library/UPDATE_CURRENT_PAGE'

/**
 * Updates total number of pages of results
 */
export const UPDATE_TOTAL_PAGES = 'drivestorage/library/UPDATE_TOTAL_PAGES'

/**
 * Loads initial set of files
 */
export const LOAD_FILES = 'drivestorage/library/LOAD_FILES'

/**
 * Loads initial set of files
 */
export const LOAD_FOLDERS = 'drivestorage/library/LOAD_FOLDERS'

/**
 * Initial base-line trash view state
 * @type {LibraryState}
 */
const initialState = {
  fileList: [],
  folderList: [],
  currentList: [],
  currentFolder: null,
  currentPage: 0,
  totalPages: 1,
  displayItems: [],
  foldersLoaded: false
}

/**
 * Library reducer
 * @param {LibraryState} state Current state
 * @param {ReduxAction} action Action being performed
 * @returns {LibraryState}
 */
export default function config (state = initialState, action) {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        fileList: [...state.fileList, ({ ...action.payload, isFolder: false })]
      }
    case EDIT_FILE:
      return {
        ...state,
        fileList: state.fileList.map(e => e.uid === action.payload.uid ? action.payload : e)
      }
    case ADD_FOLDER:
      return {
        ...state,
        folderList: [...state.folderList, ({ ...action.payload, isFolder: true })]
      }
    case REMOVE_FILE:
      return {
        ...state,
        fileList: state.fileList.filter(e => e.uid !== action.payload.uid)
      }
    case REMOVE_FOLDER:
      return {
        ...state,
        folderList: state.folderList.filter(e => e.uid !== action.payload.uid)
      }
    case UPDATE_CURRENT_LIST:
      return {
        ...state,
        currentList: [...state.folderList, ...state.fileList].slice(
          state.currentPage * FILES_PER_PAGE,
          state.currentPage * FILES_PER_PAGE + FILES_PER_PAGE
        )
      }
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: Math.ceil((state.folderList.length + state.fileList.length) / FILES_PER_PAGE)
      }
    case LOAD_FILES:
      return {
        ...state,
        fileList: [...state.fileList, ...action.payload]
      }
    case LOAD_FOLDERS:
      return {
        ...state,
        folderList: [...state.folderList, ...action.payload]
      }
    default:
      return state
  }
}

/**
 * Adds a file to fileList
 * @param {FileResponse} file File to add
 * @returns {ReduxAction}
 */
export const addFileAction = file => ({
  type: ADD_FILE,
  payload: file
})

/**
 * Applies changes to a file in fileList
 * @param {FileResponse} file Updated file
 * @returns {ReduxAction}
 */
export const editFileAction = file => ({
  type: EDIT_FILE,
  payload: file
})

/**
 * Adds a folder to folderList
 * @param {FolderResponse} folder Folder to add
 * @returns {ReduxAction}
 */
export const addFolderAction = folder => ({
  type: ADD_FOLDER,
  payload: folder
})

/**
 * Remnoves a file from fileList
 * @param {FileResponse} file File to add
 * @returns {ReduxAction}
 */
export const removeFileAction = file => ({
  type: REMOVE_FILE,
  payload: file
})

/**
 * Removes a folder from folderList
 * @param {FolderResponse} folder Folder to add
 * @returns {ReduxAction}
 */
export const removeFolderAction = folder => ({
  type: REMOVE_FOLDER,
  payload: folder
})

/**
 * Removes a folder from folderList
 * @returns {ReduxAction}
 */
export const updateCurrentListAction = () => ({
  type: UPDATE_CURRENT_LIST
})

/**
 * Removes a folder from folderList
 * @param {Number} page Index of results to show
 * @returns {ReduxAction}
 */
export const updateCurrentPageAction = page => ({
  type: UPDATE_CURRENT_PAGE,
  payload: page
})

/**
* Removes a folder from folderList
* @returns {ReduxAction}
*/
export const updateTotalPagesAction = () => ({
  type: UPDATE_TOTAL_PAGES
})

/**
* Adds files into fileList
* @returns {ReduxAction}
*/
export const loadFilesAction = files => ({
  type: LOAD_FILES,
  payload: files
})

/**
* Adds folders into folderList
* @returns {ReduxAction}
*/
export const loadFoldersAction = folders => ({
  type: LOAD_FOLDERS,
  payload: folders
})

/**
 * Load files to initialize fileList with
 * @param {FileResponse[]} files Files to load
 */
export const loadFiles = files => dispatch => {
  dispatch(loadFilesAction(files.map(e => ({ ...e, isFolder: false }))))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
}

/**
 * Load folders to initialize folderList with
 * @param {FolderResponse[]} folders Folders to load
 */
export const loadFolders = folders => dispatch => {
  dispatch(loadFoldersAction(folders.map(e => ({ ...e, isFolder: true }))))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
}

/**
 * Adds a file
 * @param {FileResponse} file File to add
 */
export const addFile = file => dispatch => {
  LiveEndpoints.File.uploadFile(file).then(({ data }) => {
    dispatch(addFileAction(data))
    dispatch(updateCurrentListAction())
    dispatch(updateTotalPagesAction())
  }).catch(err => {
    console.error(err)
  })
}

/**
 * Adds a folder
 * @param {FolderResponse} folder Folder to add
 */
export const addFolder = folder => dispatch => {
  dispatch(addFolderAction(folder))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
}

/**
 * Removes a file
 * @param {FileResponse} file File to remove
 */
export const removeFile = file => dispatch => {
  dispatch(removeFileAction(file))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
}

/**
 * Removes a folder
 * @param {FolderResponse} folder Folder to remove
 */
export const removeFolder = folder => dispatch => {
  dispatch(removeFolderAction(folder))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
}

/**
 * Updates an individual file
 * @param {FileResponse} file Updated file
 */
export const editFile = file => dispatch => {
  dispatch(editFileAction(file))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
}

/**
 * Set currently displayed page of results
 * @param {Number} index Index of results page to show
 */
export const setPage = index => (dispatch, getState) => {
  const { totalPages } = getState().library

  if (index >= 0 && index < totalPages) {
    dispatch(updateCurrentPageAction(index))
    dispatch(updateCurrentPageAction(index))
    dispatch(updateCurrentListAction())
  } else {
    console.error('Index out of range!')
  }
}

/**
 * Finds a file by UID in fileList
 * @param {Number} uid of file to find
 * @param {Function} getState redux-thunk getState method
 * @returns {FileResponse}
 */
const getFileByUID = (uid, getState) => {
  const file = getState().library.fileList.filter(e => e.uid === uid)[0]

  if (typeof file !== 'undefined') {
    return file
  } else {
    throw new Error('Invalid file UID!')
  }
}

/**
 * Finds a folder by UID in folderList
 * @param {Number} uid of folder to find
 * @param {Function} getState redux-thunk getState method
 * @returns {folderResponse}
 */
const getFolderByUID = (uid, getState) => {
  const folder = getState().library.folderList.filter(e => e.uid === uid)[0]

  if (typeof folder !== 'undefined') {
    return folder
  } else {
    throw new Error('Invalid folder UID!')
  }
}

/**
 * Move a file to trashbin
 * @param {Number} uid UID of file to trashbin
 */
export const trashFile = uid => (dispatch, getState) => {
  const file = getFileByUID(uid, getState)
  dispatch(removeFile(file))
  LiveEndpoints.File.trashFile(uid).then(({ data }) => {
    // dispatch(removeFile(data))
    dispatch(Trash.addFile(data))
  }).catch(err => {
    console.error(err)
    dispatch(addFile(file))
  })
}

/**
 * Move a folder to trashbin
 * @param {Number} uid UID of folder to trashbin
 */
export const trashFolder = uid => (dispatch, getState) => {
  const folder = getFolderByUID(uid, getState)
  dispatch(removeFolder(folder))
  LiveEndpoints.Folder.trashFolder(uid).then(({ data }) => {
    // dispatch(removeFolder(data))
    dispatch(Trash.addFolder(data))
  }).catch(err => {
    console.error(err)
    dispatch(addFolder(folder))
  })
}

/**
 * Create a new folder and add it to the UI
 * @param {String} folderName Name for newly created folder
 */
export const createNewFolder = folderName => (dispatch, getState) =>
  LiveEndpoints.Folder.createFolder(folderName)
    .then(({ data }) => {
      dispatch(addFolder(data))
    })

/**
 * Renames a file
 * @param {Number} uid UID of file to rename
 * @param {String} newName New name to assign to file
 */
export const renameFile = (uid, newName) => (dispatch, getState) =>
  LiveEndpoints.File.renameFile(uid, newName)
    .then(({ data }) => {
      dispatch(editFile(data))
    })

/**
 * Moves a file into a new directory
 * @param {Number} uid UID of file to rename
 * @param {Number} folderUid New name to assign to file
 */
export const moveFile = (uid, folderUid) => (dispatch, getState) => {
  LiveEndpoints.File.moveFile(uid, folderUid)
    .then(({ data }) => {
      dispatch(editFile(data))
    })
}
