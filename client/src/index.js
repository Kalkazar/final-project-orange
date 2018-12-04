import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './containers/App'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import getStore from './ducks'

const history = createHistory()
const store = getStore({}, history)
console.log({ store, history, ConnectedRouter, Provider })

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
