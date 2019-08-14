import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import logo from '../../assets/images/logo.svg'
import './index.css'
import config from '../../config'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
})

class Members extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined,
      collapsed: true,
      selectedMenuKey: '1'
    }

    this.logout = this.logout.bind(this)
    this.handleMenuSelect = this.handleMenuSelect.bind(this)
  }

  async componentWillMount () {
    try {
      const user = await Auth.currentUserInfo()
      this.setState({ user })
    } catch (e) {
      console.log(e)
    }
  }

  async logout () {
    console.log('Logging out..')
    try {
      this.setState({ user: undefined })
      await Auth.signOut()
      window.location = '/'
    } catch (e) {
      console.log(e)
    }
  }

  handleMenuSelect (e) {
    this.setState({
      selectedMenuKey: e.key
    })
  }

  render () {
    const { user } = this.state
    console.log(user)
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome, { user && user.username}</h1>
          <h5 className='App-title'>{user && user.attributes.email}</h5>
          <p className='App-intro'>
            To get started, edit <code>src/containers/Members/index.js</code> and save to reload.
          </p>
          <p>
            <button className='logoutBtn' onClick={this.logout}>
              Logout
            </button>
          </p>
        </header>
      </div>
    )
  }
}

export default withAuthenticator(Members, {
  // Render a sign out button once logged in
  // includeGreetings: true
  // Show only certain components
  // authenticatorComponents: [MyComponents],
})
