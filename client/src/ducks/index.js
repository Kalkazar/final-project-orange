import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import uiReducer from './ui.duck'
import libraryReducer from './library.duck'

export { getFiles, getCurrentList } from './library.duck'

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
    ui: uiReducer
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
