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
 * Show the "Are you sure?" modal
 */
export const SHOW_VERIFICATION = 'drivestorage/modals/SHOW_VERIFICATION'

/**
 * Hide the "Are you sure?" modal
 */
export const HIDE_VERIFICATION = 'drivestorage/modals/HIDE_VERIFICATION'

// /**
//  * Show the file editing modal <- Unnecessary??!?
//  */
// export const SHOW_ALL = 'drivestorage/modals/SHOW_EDIT_FILE'

/**
 * Hides all modals
 */
export const HIDE_ALL = 'drivestorage/modals/HIDE_ALL'

/**
 * Sets the type of action that the verify modal is verifying
 */
export const SET_VERIFYING_METHOD = 'drivestorage/modals/SET_VERIFYING_METHOD'

/**
 * Sets the folder to explore
 */
export const SET_OPENING_FOLDER = 'drivestorage/modals/SET_OPENING_FOLDER'

/**
 * Sets the file to edit
 */
export const SET_EDITING_FILE = 'drivestorage/modals/SET_EDITING_FILE'

/**
 * All valid methods for verification operations
 */
export const validVerificationMethods = {
  DELETE_ALL: 'DELETE_ALL',
  RESTORE_ALL: 'RESTORE_ALL',
  DEFAULT: 'DEFAULT'
}

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
  },
  verify: {
    show: false,
    method: ''
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
 * @property {Object} verify
 * @property {Boolean} verify.show
 * @property {String} verify.method
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
    case SHOW_VERIFICATION: {
      const newState = ({ ...state })
      newState.verify.show = true
      return newState
    }
    case HIDE_VERIFICATION: {
      const newState = ({ ...state })
      newState.verify.show = false
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
    case HIDE_ALL: {
      const newState = Object.keys(state)
        .reduce((acc, curr) => ({ ...acc, [curr]: { ...state[curr], show: false } }), ({ ...state }))
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
    case SET_VERIFYING_METHOD: {
      const newState = ({ ...state })
      newState.verify.method = action.payload
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
 * Hides all modals
 * @returns {ReduxAction}
 */
export const hideAllAction = () => ({
  type: HIDE_ALL
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
 * Shows the verification modal
 * @returns {ReduxAction}
 */
export const showVerifyAction = () => ({
  type: SHOW_VERIFICATION
})

/**
 * Hides the verification modal
 * @returns {ReduxAction}
 */
export const hideVerifyAction = () => ({
  type: HIDE_VERIFICATION
})

/**
 * Sets the type/method of operation that the verification modal is verifying
 * @param {String} method
 * @returns {ReduxAction}
 */
export const setVerifyingMethodAction = method => ({
  type: SET_VERIFYING_METHOD,
  payload: method
})

/**
 * Hides all modals
 */
export const hideAll = () => dispatch => dispatch(hideAllAction())

/**
 * Toggles createFolder modal and closes other modals
 */
export const toggleCreateFolder = () => (dispatch, getState) => {
  const { createFolder: { show } } = getState().modals

  dispatch(hideAll())

  show ? dispatch(hideCreateFolderAction()) : dispatch(showCreateFolderAction())
}

/**
 * Toggles openFolder modal and closes other modals
 */
export const toggleOpenFolder = () => (dispatch, getState) => {
  const { openFolder: { show } } = getState().modals

  dispatch(hideAll())

  show ? dispatch(hideOpenFolderAction()) : dispatch(showOpenFolderAction())
}

/**
 * Toggles editFile modal and closes other modals
 */
export const toggleEditFile = () => (dispatch, getState) => {
  const { editFile: { show } } = getState().modals

  dispatch(hideAll())

  show ? dispatch(hideEditFileAction()) : dispatch(showEditFileAction())
}

/**
 * Toggles editFile modal and closes other modals
 */
export const toggleVerify = () => (dispatch, getState) => {
  const { verify: { show } } = getState().modals

  dispatch(hideAll())

  show ? dispatch(hideVerifyAction()) : dispatch(showVerifyAction())
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

/**
 * Sets method for verification modal
 * @param {String} method Method to set for verification operation
 */
export const setVerificationMethod = (method = validVerificationMethods.DEFAULT) => dispatch => {
  if (Object.keys(validVerificationMethods).includes(method)) {
    dispatch(setVerifyingMethodAction(method))
  } else {
    console.error(`Unable to set invalid verification type: ${method}`)
    dispatch(setVerifyingMethodAction(validVerificationMethods.DEFAULT))
  }
}

/**
 * Sets the verification method, and then opens the verification modal
 * @param {String} [method] Method of action to verify
 */
export const verifyMethod = (method = '') => dispatch => {
  dispatch(setVerificationMethod(method))
  dispatch(hideAllAction())
  dispatch(showVerifyAction())
}
