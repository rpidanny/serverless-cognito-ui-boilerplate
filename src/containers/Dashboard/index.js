/* global alert */
import React, { Component } from 'react'
import Amplify, { Auth, API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import logo from '../../assets/images/logo.svg'
import './index.css'
import { awsConfig, signUpConfig, federatedConfig, amplifyCustomTheme } from '../../config/cognito'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: awsConfig.s3.REGION,
    bucket: awsConfig.s3.BUCKET,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: awsConfig.apiGateway.URL,
        region: awsConfig.apiGateway.REGION
      }
    ]
  }
})

class Members extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: undefined
    }

    this.logout = this.logout.bind(this)
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

  async testApi () {
    API.get('api', '/test')
      .then(res => {
        console.log(res)
        alert(res.message)
      })
      .catch(err => {
        console.log(err)
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
            <button className='logoutBtn' onClick={this.testApi}>
              Test API
            </button>
          </p>
        </header>
      </div>
    )
  }
}

export default withAuthenticator(Members, {
  // Render a sign out button once logged in
  includeGreetings: true,
  signUpConfig,
  theme: amplifyCustomTheme,
  federated: federatedConfig
  // Show only certain components
  // authenticatorComponents: [MyComponents],
})
