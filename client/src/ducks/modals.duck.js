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
 * Show the folder creation modal
 */
export const SHOW_CREATE_FOLDER = 'drivestorage/modals/SHOW_CREATE_FOLDER'

/**
 * Show the folder exploration modal
 */
export const SHOW_OPEN_FOLDER = 'drivestorage/modals/SHOW_OPEN_FOLDER'

/**
 * Show the file editing modal
 */
export const SHOW_EDIT_FILE = 'drivestorage/modals/SHOW_EDIT_FILE'

/**
 * Hide the folder creation modal
 */
export const HIDE_CREATE_FOLDER = 'drivestorage/modals/HIDE_CREATE_FOLDER'

/**
 * Hide the folder exploration modal
 */
export const HIDE_OPEN_FOLDER = 'drivestorage/modals/HIDE_OPEN_FOLDER'

/**
 * Hide the file editing modal
 */
export const HIDE_EDIT_FILE = 'drivestorage/modals/HIDE_EDIT_FILE'

/**
 * Sets the folder to explore
 */
export const SET_OPENING_FOLDER = 'drivestorage/modals/SET_OPENING_FOLDER'

/**
 * Sets the file to edit
 */
export const SET_EDITING_FILE = 'drivestorage/modals/SET_EDITING_FILE'

/**
 * @type {ModalState}
 */
const initialState = {
  editFile: {
    show: false,
    targetFile: null
  },
  createFolder: {
    show: false
  },
  openFolder: {
    show: false,
    targetFolder: null
  }
}

/**
 * @typedef ModalState
 * @property {Object} editFile
 * @property {Boolean} editFile.show
 * @property {FileResponse} editFile.targetFile
 * @property {Object} createFolder
 * @property {Boolean} createFolder.show
 * @property {Object} openFolder
 * @property {Boolean} openFolder.show
 * @property {FolderResponse} openFolder.targetFolder
 */

/**
 * Modal reducer
 * @param {ModalState} state Current state
 * @param {ReduxAction} action Action being performed
 * @returns {ModalState}
 */
export default function config (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_FOLDER: {
      const newState = ({ ...state })
      newState.createFolder.show = true
      return newState
    }
    case SHOW_OPEN_FOLDER: {
      const newState = ({ ...state })
      newState.openFolder.show = true
      return newState
    }
    case SHOW_EDIT_FILE: {
      const newState = ({ ...state })
      newState.editFile.show = true
      return newState
    }
    case HIDE_CREATE_FOLDER: {
      const newState = ({ ...state })
      newState.createFolder.show = false
      return newState
    }
    case HIDE_EDIT_FILE: {
      const newState = ({ ...state })
      newState.editFile.show = false
      return newState
    }
    case HIDE_OPEN_FOLDER: {
      const newState = ({ ...state })
      newState.openFolder.show = false
      return newState
    }
    case SET_EDITING_FILE: {
      const newState = ({ ...state })
      newState.editFile.targetFile = action.payload
      return newState
    }
    case SET_OPENING_FOLDER: {
      const newState = ({ ...state })
      newState.openFolder.targetFolder = action.payload
      return newState
    }
    default:
      return state
  }
}

/**
 * Shows the create folder modal
 * @returns {ReduxAction}
 */
export const showCreateFolderAction = () => ({
  type: SHOW_CREATE_FOLDER
})

/**
 * Shows the open folder modal
 * @returns {ReduxAction}
 */
export const showOpenFolderAction = () => ({
  type: SHOW_OPEN_FOLDER
})

/**
 * Shows the edit file modal
 * @returns {ReduxAction}
 */
export const showEditFileAction = () => ({
  type: SHOW_EDIT_FILE
})

/**
 * Hides the create folder modal
 * @returns {ReduxAction}
 */
export const hideCreateFolderAction = () => ({
  type: HIDE_CREATE_FOLDER
})

/**
 * Hides the open folder modal
 * @returns {ReduxAction}
 */
export const hideOpenFolderAction = () => ({
  type: HIDE_OPEN_FOLDER
})

/**
 * Hides the edit file modal
 * @returns {ReduxAction}
 */
export const hideEditFileAction = () => ({
  type: HIDE_EDIT_FILE
})

/**
 * Sets the file to edit with the edit file modal
 * @param {FileResponse} file
 * @returns {ReduxAction}
 */
export const setEditingFileAction = file => ({
  type: SET_EDITING_FILE,
  payload: file
})

/**
 * Sets the folder to browser with the open folder modal
 * @param {FolderResponse} folder
 * @returns {ReduxAction}
 */
export const setOpeningFolderAction = folder => ({
  type: SET_OPENING_FOLDER,
  payload: folder
})

/**
 * Toggles createFolder modal and closes other modals
 */
export const toggleCreateFolder = () => (dispatch, getState) => {
  const { createFolder: { show } } = getState().modals

  dispatch(hideEditFileAction())
  dispatch(hideOpenFolderAction())

  show ? dispatch(hideCreateFolderAction()) : dispatch(showCreateFolderAction())
}

/**
 * Toggles openFolder modal and closes other modals
 */
export const toggleOpenFolder = () => (dispatch, getState) => {
  const { openFolder: { show } } = getState().modals

  dispatch(hideEditFileAction())
  dispatch(hideCreateFolderAction())

  show ? dispatch(hideOpenFolderAction()) : dispatch(showOpenFolderAction())
}

/**
 * Toggles editFile modal and closes other modals
 */
export const toggleEditFile = () => (dispatch, getState) => {
  const { editFile: { show } } = getState().modals

  dispatch(hideCreateFolderAction())
  dispatch(hideOpenFolderAction())

  show ? dispatch(hideEditFileAction()) : dispatch(showEditFileAction())
}

/**
 * Opens a folder in the openFolder modal
 * @param {FolderResponse} folder Folder to open
 */
export const openFolder = folder => (dispatch, getState) => {
  dispatch(setOpeningFolderAction(folder))
  dispatch(showOpenFolderAction())
}

/**
 * Opens a file in the editFile modal
 * @param {FileResponse} file file to open
 */
export const editFile = file => (dispatch, getState) => {
  dispatch(setEditingFileAction(file))
  dispatch(showEditFileAction())
}
