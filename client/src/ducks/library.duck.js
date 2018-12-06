import { getFileList, getFolderList } from '../api'
import { groupArray } from '../helpers/util'

import { FileResponse, FolderResponse } from '../helpers/mock-responses'

/**
 * Load file objects into state
 */
export const LOAD_FILES = 'LOAD_FILES'

/**
 * Load folder objects into state
 */
export const LOAD_FOLDERS = 'LOAD_FOLDERS'

/**
 * Load current list of results to be displayed
 */
export const LOAD_CURRENT_LIST = 'LOAD_CURRENT_LIST'

/**
 * Called when a load fails
 */
export const LOAD_ERROR = 'LOAD_ERROR'

/**
 * Load pages of display results into state
 */
export const LOAD_PAGES = 'LOAD_PAGES'

/**
 * Set index of current results page to display
 */
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

/**
 * Update currently displayed results page based on state
 */
export const UPDATE_ACTIVE_PAGE = 'UPDATE_ACTIVE_PAGE'

/**
 * Update total number of pages of results based on state
 */
export const UPDATE_TOTAL_PAGES = 'UPDATE_TOTAL_PAGES'

/**
 * Update total number of results elements based on state
 */
export const UPDATE_TOTAL_DISPLAY_ELEMENTS = 'UPDATE_TOTAL_DISPLAY_ELEMENTS'

/**
 * Max number of file cards to display per page
 */
export const FILES_PER_PAGE = 9

/**
 * Initial base-line library state
 * @type {LibraryState}
 */
const initialState = {
  fileList: [],
  folderList: [],
  currentList: [],
  currentFolder: null,
  currentPage: 0,
  foldersLoaded: false,
  trashLoaded: false,
  loadingError: null,
  pages: [],
  totalDisplayElements: 0,
  totalPages: 1,
  activePage: []
}

/**
 * Calls API for a list of all folders
 */
export const getFolders = () => dispatch => {
  getFolderList()
    .then(folderList => {
      dispatch(loadFolders(folderList))
      dispatch(getCurrentList())
    })
    .catch(err => dispatch(loadError(err)))
}

/**
 * Calls API for a list of all files
 */
export const getFiles = () => dispatch => {
  getFileList()
    .then(fileList => {
      dispatch(loadFiles(fileList))
      dispatch(getCurrentList())
    })
    .catch(err => dispatch(loadError(err)))
}

/**
 * Selects which page of results Cards to display via index, if valid index
 * @param {Number} pageIndex Index of Cards to display
 */
export const setPage = pageIndex => (dispatch, getState) => {
  const { totalPages } = getState().library

  if (pageIndex > -1 && pageIndex < totalPages) {
    dispatch(setCurrentPage(pageIndex))
    dispatch(updateActivePage())
  } else {
    console.log('setPage failed in library.duck')
  }
}

/**
 * Decides which list of results to display based on UI state
 * [INCOMPLETE DOCS]
 */
export const getCurrentList = () => (dispatch, getState) => {
  const { fileList, folderList } = getState().library
  const { trashLoaded, currentPage, currentFolder } = getState().ui
  const currentFileList = fileList.filter(
    x =>
      (trashLoaded ? x.inTrash : !x.inTrash) &&
      (!currentFolder || x.folder === currentFolder.uid)
  )
  const currentFolderList = currentFolder ? [] : [...folderList]
  const currentList = [...currentFolderList, ...currentFileList]

  const pages = groupArray(currentList, FILES_PER_PAGE)

  dispatch(loadPages(pages))
  dispatch(updateTotalPages())
  dispatch(setPage(0))
  dispatch(updateActivePage())
  dispatch(updateTotalDisplayElements())

  dispatch(
    loadCurrentList(
      currentList.slice(
        FILES_PER_PAGE * (currentPage - 1),
        FILES_PER_PAGE * currentPage
      )
    )
  )
}

/**
 * Updates total display elements
 * @returns {ReduxAction}
 */
export const updateTotalDisplayElements = () => ({
  type: UPDATE_TOTAL_DISPLAY_ELEMENTS
})

/**
 * Updates active page based on state
 * @returns {ReduxAction}
 */
export const updateActivePage = () => ({
  type: UPDATE_ACTIVE_PAGE
})

/**
 * Sets the current page
 * @param {Number} currentPage Index of page to change to
 * @returns {ReduxAction}
 */
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage
})

/**
 * Updates the total number of results pages, based on state.
 * For use with pagination components
 * @returns {ReduxAction}
 */
export const updateTotalPages = () => ({
  type: UPDATE_TOTAL_PAGES
})

/**
 * Sets current pages of results
 * @param {Object[][]} currentPages 2D array of results, each array is a page
 * @returns {ReduxAction}
 */
export const loadPages = currentPages => ({
  type: LOAD_PAGES,
  payload: currentPages
})

/**
 * Sets current list of display results [INCOMPLETE DOCS]
 * @param {Any[]} currentList List of objects to display
 * @returns {ReduxAction}
 */
export const loadCurrentList = currentList => ({
  type: LOAD_CURRENT_LIST,
  payload: currentList
})

/**
 * Sets loadError in state, if load has failed [INCOMPLETE DOCS]
 * @param {Any} loadError Reason for load failure
 * @returns {ReduxAction}
 */
export const loadError = loadError => ({
  type: LOAD_ERROR,
  payload: loadError
})

/**
 * Sets list of all files [INCOMPLETE DOCS]
 * @param {Object[]} fileList List of files from API
 * @returns {ReduxAction}
 */
export const loadFiles = fileList => ({
  type: LOAD_FILES,
  payload: fileList
})

/**
 * Sets list of all folders [INCOMPLETE DOCS]
 * @param {Object[]} folderList List of folders from API
 * @returns {ReduxAction}
 */
export const loadFolders = folderList => ({
  type: LOAD_FILES,
  payload: folderList
})

/**
 * Library state reducer
 * @param {LibraryState} state Library state object
 * @param {ReduxAction} action Redux type/payload action
 * @returns {LibraryState}
 */
function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_ERROR:
      return {
        ...state,
        loadError: action.payload
      }
    case LOAD_FILES:
      return {
        ...state,
        fileList: action.payload
      }
    case LOAD_FOLDERS:
      return {
        ...state,
        folderList: action.payload
      }
    case LOAD_CURRENT_LIST:
      return {
        ...state,
        currentList: action.payload
      }
    case LOAD_PAGES:
      return {
        ...state,
        pages: action.payload
      }
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: state.pages.length
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case UPDATE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: state.pages[state.currentPage]
      }
    case UPDATE_TOTAL_DISPLAY_ELEMENTS:
      return {
        ...state,
        totalDisplayElements: state.pages.reduce((acc, curr) => acc + curr.length, 0)
      }
    default:
      return state
  }
}

export default config

// Need to correct list props to reflect an array that may contain a mixture of 2+ object types

/**
 * @typedef LibraryState
 * @property {FileResponse[]} fileList A list of files
 * @property {FolderResponse[]} folderList
 * @property {FileResponse[]|FolderResponse[]} currentList
 * @property {Object} currentFolder
 * @property {Number} currentPage
 * @property {Boolean} foldersLoaded
 * @property {Boolean} trashLoaded
 * @property {Error} loadingError
 * @property {FileResponse[][]|FolderResponse[][]} pages
 * @property {Number} totalPages
 * @property {Number} totalDisplayElements
 * @property {FileResponse[]|FolderResponse[]} activePage
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
