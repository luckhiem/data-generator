import React from 'react'
import ReactDOM from 'react-dom'
import App from './Layout/app'
import * as ServiceWorker from '../serviceWorker'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

serviceWorker.register();
