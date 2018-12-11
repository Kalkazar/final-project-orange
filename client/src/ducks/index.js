import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import uiReducer, * as UI from './ui.duck'
import libraryReducer, * as Library from './library.duck'
import trashReducer, * as Trash from './trash.duck'
import modalReducer, * as Modals from './modals.duck'

export { Library, UI, Trash, Modals }

export function routes (state = { location: null }, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}

function createReducer () {
  return combineReducers({
    library: libraryReducer,
    ui: uiReducer,
    trash: trashReducer,
    modals: modalReducer
  })
}

export default function configureStore (initialState = {}, history) {
  const middlewares = [thunk, routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })
  return createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )
}
