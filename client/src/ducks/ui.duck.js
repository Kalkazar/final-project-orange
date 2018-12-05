import { getCurrentList } from './'

export const CHANGE_PAGE = 'CHANGE_PAGE'
export const SELECT_UNTRASHED = 'SELECT_UNTRASHED'
export const SELECT_TRASHED = 'SELECT_TRASHED'
export const SELECT_FOLDERS = 'SELECT_FOLDERS'
export const SELECT_FILES = 'SELECT_FILES'

const initialState = {
  currentFolder: null,
  currentPage: 1,
  foldersLoaded: false,
  trashLoaded: false
}

export const changePage = page => dispatch => {
  dispatch({ type: CHANGE_PAGE, page })
  dispatch(getCurrentList())
}

export const selectTrashed = () => dispatch => {
  dispatch({ type: SELECT_TRASHED })
  dispatch(getCurrentList())
}

export const selectUntrashed = () => dispatch => {
  dispatch({ type: SELECT_UNTRASHED })
  dispatch(getCurrentList())
}

export const selectFolders = () => dispatch => {
  dispatch({ type: SELECT_FOLDERS })
  dispatch(getCurrentList())
}

export const selectFiles = () => dispatch => {
  dispatch({ type: SELECT_FILES })
  dispatch(getCurrentList())
}

export default function config (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
