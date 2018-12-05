import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './containers/App'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router } from 'react-router-dom'
import getStore, { getFiles } from './ducks'

const history = createHistory()
const store = getStore({}, history)
store.dispatch(getFiles())
window.store = store
setTimeout(() => console.log(store.getState()), 500)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
