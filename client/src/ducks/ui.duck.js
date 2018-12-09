/**
 * @typedef {import('../helpers/types').ReduxAction} ReduxAction
 * @typedef {import('../helpers/types').FileResponse} FileResponse
 * @typedef {import('../helpers/types').FolderResponse} FolderResponse
 * @typedef {import('../helpers/types').ViewState} UiState
 */

import { LiveEndpoints } from '../api'
import { Library, Trash } from './'

/**
 * Max number of file cards to display per page
 */
export const FILES_PER_PAGE = 9

/**
 * Changes the current page
 */
export const CHANGE_PAGE = 'drivestorage/ui/CHANGE_PAGE'

/**
 * Change to Library view
 */
export const SELECT_LIBRARY = 'drivestorage/ui/SELECT_LIBRARY'

/**
 * Change to Trash view
 */
export const SELECT_TRASH = 'drivestorage/ui/SELECT_TRASH'

/**
 * Open a folder ??!?
 */
export const OPEN_FOLDER = 'drivestorage/ui/OPEN_FOLDER'

/**
 * @type {UiState}
 */
const initialState = {
  currentFolder: null,
  currentPage: 1,
  trashLoaded: false
}

/**
 * UI reducer
 * @param {UiState} state Current state
 * @param {ReduxAction} action Action being performed
 * @returns {UiState}
 */
export default function config (state = initialState, action) {
  switch (action.type) {
    case SELECT_TRASH:
      return {
        ...state,
        currentPage: 1,
        trashLoaded: true,
        currentFolder: null
      }
    case SELECT_LIBRARY:
      return {
        ...state,
        currentPage: 1,
        trashLoaded: false,
        currentFolder: null
      }
    case OPEN_FOLDER:
      return {
        ...state,
        currentFolder: action.folder
      }
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.page
      }
    default:
      return state
  }
}

/**
 * Opens a folder [NOT IMPLEMENTED]
 * @param {FolderResponse} folder
 */
export const openFolder = folder => dispatch => {
  dispatch({ type: OPEN_FOLDER, folder })
  // dispatch(getCurrentList()) // Redundant API calls
}

/**
 * Changes current page
 * @param {Number} page
 */
export const changePage = page => dispatch => {
  dispatch({ type: CHANGE_PAGE, page })
  // dispatch(getCurrentList()) // Redundant API calls
}

/**
 * Selects Trash view
 */
export const selectTrash = () => dispatch => {
  dispatch({ type: SELECT_TRASH })
  // dispatch(getCurrentList()) // Redundant API calls
}

/**
 * Selects Library view
 */
export const selectLibrary = () => dispatch => {
  dispatch({ type: SELECT_LIBRARY })
  // dispatch(getCurrentList()) // Redundant API calls
}

/**
 * Changes displayed data - Unnecessary?!?
 * @param {Boolean} view Displays trash if true
 */
export const changeView = view => (dispatch, getState) =>
  view ? dispatch(selectTrash()) : dispatch(selectLibrary())

/**
 * Initializes data for both views
 */
export const initData = () => dispatch => {
  LiveEndpoints.File.getAllFiles().then(({ data }) => {
    const libFiles = data.filter(e => e.inTrash === false)
    const trashFiles = data.filter(e => e.inTrash === true)

    dispatch(Library.loadFiles(libFiles))
    dispatch(Trash.loadFiles(trashFiles))
  })

  LiveEndpoints.Folder.getAllFolders().then(({ data }) => {
    const libFolders = data.filter(e => e.inTrash === false)
    const trashFolders = data.filter(e => e.inTrash === true)

    dispatch(Library.loadFolders(libFolders))
    dispatch(Trash.loadFolders(trashFolders))
  })
}
