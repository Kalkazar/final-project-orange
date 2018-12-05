import { getFileList, getFolderList } from '../api'

export const LOAD_FILES = 'LOAD_FILES'
export const LOAD_FOLDERS = 'LOAD_FOLDERS'
export const LOAD_CURRENT_LIST = 'LOAD_CURRENT_LIST'
export const LOAD_ERROR = 'LOAD_ERROR'
const FILES_PER_PAGE = 12

const initialState = {
  fileList: [],
  folderList: [],
  currentList: [],
  currentFolder: null,
  currentPage: 1,
  foldersLoaded: false,
  trashLoaded: false,
  loadingError: null
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
  dispatch(
    loadCurrentList(
      currentList.slice(
        FILES_PER_PAGE * (currentPage - 1),
        FILES_PER_PAGE * currentPage
      )
    )
  )
}

export const loadCurrentList = currentList => ({
  type: LOAD_CURRENT_LIST,
  currentList
})

export const loadError = loadError => ({
  type: LOAD_ERROR,
  loadError
})

export const loadFiles = fileList => ({
  type: LOAD_FILES,
  fileList
})

export const loadFolders = folderList => ({
  type: LOAD_FILES,
  folderList
})

export default function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_ERROR:
      return {
        ...state,
        loadError: action.loadError
      }
    case LOAD_FILES:
      return {
        ...state,
        fileList: action.fileList
      }
    case LOAD_FOLDERS:
      return {
        ...state,
        folderList: action.folderList
      }
    case LOAD_CURRENT_LIST:
      return {
        ...state,
        currentList: action.currentList
      }
    default:
      return state
  }
}
