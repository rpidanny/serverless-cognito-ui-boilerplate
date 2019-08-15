/* global it */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Router
      basename={process.env.PUBLIC_URL + '/'}
    >
      <App />
    </Router>, div)
  ReactDOM.unmountComponentAtNode(div)
})
