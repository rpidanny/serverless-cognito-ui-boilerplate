import React, { Suspense, lazy } from 'react'
import {
  withRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Fallback from '../../components/Fallback'

import './index.css'

const LandingPage = lazy(() => import('../LandingPage'))
const Members = lazy(() => import('../Members'))

function App () {
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          render={props => (
            <Suspense fallback={<Fallback />} >
              <LandingPage />
            </Suspense>
          )}
        />
        <Route
          path='/members'
          render={props => (
            <Suspense fallback={<Fallback />} >
              <Members {...props} />
            </Suspense>
          )}
        />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default withRouter(App)
