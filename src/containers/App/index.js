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
const Dashboard = lazy(() => import('../Dashboard'))

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
          path='/dashboard'
          render={props => (
            <Suspense fallback={<Fallback />} >
              <Dashboard {...props} />
            </Suspense>
          )}
        />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default withRouter(App)
