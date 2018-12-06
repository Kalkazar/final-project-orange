import { getFileList, getFolderList } from '../api'
import { groupArray } from '../helpers/util'

export const LOAD_FILES = 'LOAD_FILES'
export const LOAD_FOLDERS = 'LOAD_FOLDERS'
export const LOAD_CURRENT_LIST = 'LOAD_CURRENT_LIST'
export const LOAD_ERROR = 'LOAD_ERROR'

export const LOAD_PAGES = 'LOAD_PAGES'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const UPDATE_ACTIVE_PAGE = 'UPDATE_ACTIVE_PAGE'
export const UPDATE_TOTAL_PAGES = 'UPDATE_TOTAL_PAGES'

const FILES_PER_PAGE = 6

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
  totalPages: 1,
  activePage: []
}

export const getFolders = () => dispatch => {
  getFolderList()
    .then(folderList => {
      dispatch(loadFolders(folderList))
      dispatch(getCurrentList())
    })
    .catch(err => dispatch(loadError(err)))
}

export const getFiles = () => dispatch => {
  getFileList()
    .then(fileList => {
      dispatch(loadFiles(fileList))
      dispatch(getCurrentList())
    })
    .catch(err => dispatch(loadError(err)))
}

export const setPage = pageIndex => (dispatch, getState) => {
  const { totalPages } = getState().library

  if (pageIndex > -1 && pageIndex < totalPages) {
    dispatch(setCurrentPage(pageIndex))
    dispatch(updateActivePage())
  } else {
    console.log('setPage failed in library.duck')
  }
}

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

  dispatch(
    loadCurrentList(
      currentList.slice(
        FILES_PER_PAGE * (currentPage - 1),
        FILES_PER_PAGE * currentPage
      )
    )
  )
}

export const updateActivePage = () => ({
  type: UPDATE_ACTIVE_PAGE
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage
})

export const updateTotalPages = () => ({
  type: UPDATE_TOTAL_PAGES
})

export const loadPages = currentPages => ({
  type: LOAD_PAGES,
  payload: currentPages
})

export const loadCurrentList = currentList => ({
  type: LOAD_CURRENT_LIST,
  payload: currentList
})

export const loadError = loadError => ({
  type: LOAD_ERROR,
  payload: loadError
})

export const loadFiles = fileList => ({
  type: LOAD_FILES,
  payload: fileList
})

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
    default:
      return state
  }
}

export default config

// const initialState = {
//   fileList: [],
//   folderList: [],
//   currentList: [],
//   currentFolder: null,
//   currentPage: 0,
//   foldersLoaded: false,
//   trashLoaded: false,
//   loadingError: null,

//   pages: [],
//   totalPages: 1,
//   activePage: []
// }

/**
 * @typedef LibraryState
 * @property {Any[]} fileList
 * @property {Any[]} folderList
 * @property {Any[]} currentList
 * @property {Object} currentFolder
 * @property {Number} currentPage
 * @property {Boolean} foldersLoaded
 * @property {Boolean} trashLoaded
 * @property {Error} loadingError
 * @property {Any[][]} pages
 * @property {Number} totalPages
 * @property {Any[]} activePage
 */

/**
  * @typedef ReduxAction
  * @property {String} type
  * @property {Any} payload
  */
