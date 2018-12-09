/**
 * @typedef {import('../helpers/types').ReduxAction} ReduxAction
 * @typedef {import('../helpers/types').FileResponse} FileResponse
 * @typedef {import('../helpers/types').FolderResponse} FolderResponse
 * @typedef {import('../helpers/types').ViewState} TrashState
 */

import { FILES_PER_PAGE } from './ui.duck'
import { LiveEndpoints } from '../api'
import { Library } from './'

/**
 * Add file to state
 */
export const ADD_FILE = 'drivestorage/trash/ADD_FILE'

/**
 * Remove file from state
 */
export const REMOVE_FILE = 'drivestorage/trash/REMOVE_FILE'

/**
 * Add file to state
 */
export const ADD_FOLDER = 'drivestorage/trash/ADD_FOLDER'

/**
 * Remove file from state
 */
export const REMOVE_FOLDER = 'drivestorage/trash/REMOVE_FILE'

/**
 * Updates current list of results to be displayed
 */
export const UPDATE_CURRENT_LIST = 'drivestorage/trash/UPDATE_CURRENT_LIST'

/**
 * Updates current page of results to be displayed
 */
export const UPDATE_CURRENT_PAGE = 'drivestorage/trash/UPDATE_CURRENT_PAGE'

/**
 * Updates total number of pages of results
 */
export const UPDATE_TOTAL_PAGES = 'drivestorage/trash/UPDATE_TOTAL_PAGES'

/**
 * Loads initial set of files
 */
export const LOAD_FILES = 'drivestorage/trash/LOAD_FILES'

/**
 * Loads initial set of files
 */
export const LOAD_FOLDERS = 'drivestorage/trash/LOAD_FOLDERS'

/**
 * Initial base-line trash view state
 * @type {TrashState}
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
 * Trash reducer
 * @param {TrashState} state Current state
 * @param {ReduxAction} action Action being performed
 * @returns {TrashState}
 */
export default function config (state = initialState, action) {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        fileList: [...state.fileList, action.payload]
      }
    case ADD_FOLDER:
      return {
        ...state,
        folderList: [...state.folderList, action.payload]
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
        fileList: [ ...state.fileList, ...action.payload ]
      }
    case LOAD_FOLDERS:
      return {
        ...state,
        folderList: [ ...state.folderList, ...action.payload ]
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
  type: UPDATE_CURRENT_LIST,
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
  dispatch(loadFilesAction(files))
  dispatch(updateCurrentListAction())
}

/**
 * Load folders to initialize folderList with
 * @param {FolderResponse[]} folders Folders to load
 */
export const loadFolders = folders => dispatch => {
  dispatch(loadFoldersAction(folders))
  dispatch(updateCurrentListAction())
}

/**
 * Adds a file
 * @param {FileResponse} file File to add
 */
export const addFile = file => dispatch => {
  dispatch(addFileAction(file))
  dispatch(updateCurrentListAction())
  dispatch(updateTotalPagesAction())
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
 * Set currently displayed page of results
 * @param {Number} index Index of results page to show
 */
export const setPage = index => (dispatch, getState) => {
  const { totalPages } = getState().trash

  if (index >= 0 && index < totalPages) {
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
  const file = getState().trash.fileList.filter(e => e.uid === uid)[0]

  if (typeof file !== 'undefined') {
    return file
  } else {
    throw new Error('Invalid file UID!')
  }
}

/**
 * Restore a file from trashbin
 * @param {Number} uid UID of file to restore
 */
export const restoreFile = uid => (dispatch, getState) => {
  const file = getFileByUID(uid, getState)
  dispatch(removeFile(file))
  LiveEndpoints.Trash.restoreFile(uid).then(({ data }) => {
    // dispatch(removeFile(data))
    dispatch(Library.addFile(data))
  }).catch(err => {
    console.error(err)
    dispatch(addFile(file))
  })
}

/**
 * Permanently delete a file from trashbin
 * @param {Number} uid UID of file to delete
 */
export const deleteFile = uid => dispatch =>
  LiveEndpoints.Trash.deleteFile(uid).then(({ data }) => {
    dispatch(removeFile(data))
  })

/**
 * Restore a folder from trashbin
 * @param {Number} uid UID of folder to restore
 */
export const restoreFolder = uid => dispatch =>
  LiveEndpoints.Trash.restoreFolder(uid).then(({ data }) => {
    dispatch(removeFolder(data))
  })

/**
 * Permanently delete a folder from trashbin
 * @param {Number} uid UID of folder to permanently delete
 */
export const deleteFolder = uid => dispatch =>
  LiveEndpoints.Trash.deleteFolder(uid).then(({ data }) => {
    dispatch(removeFolder(data))
  })
