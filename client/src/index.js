import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './containers/App'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router } from 'react-router-dom'
import getStore, { Library, UI } from './ducks'
import 'jquery/dist/jquery'

const { getFiles } = Library
const history = createHistory()
const store = getStore({}, history)
// store.dispatch(getFiles())
store.dispatch(UI.initData())
window.store = store
setTimeout(() => console.log(store.getState()), 500) // Why?

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
