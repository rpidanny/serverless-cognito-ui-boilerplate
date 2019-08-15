/* global alert */
import React, { Component } from 'react'
import Amplify, { Auth, API, Storage } from 'aws-amplify'
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
      user: undefined,
      userAttributes: undefined,
      profilePic: undefined
    }

    Storage.configure({ level: 'private' })

    this.inputElement = null
    this.logout = this.logout.bind(this)
    this.uploadProfilePicture = this.uploadProfilePicture.bind(this)
    this.updateProfilePicture = this.updateProfilePicture.bind(this)
    this.deleteProfilePicture = this.deleteProfilePicture.bind(this)
  }

  async componentWillMount () {
    try {
      // const user = await Auth.currentUserInfo()
      const user = await Auth.currentAuthenticatedUser()
      const userAttributes = await Auth.userAttributes(user)
      const picture = userAttributes.find(attr => attr.Name === 'picture')

      const profilePic = picture ? await Storage.get(picture.Value) : null

      console.log('User', user)
      console.log('Attributes', userAttributes)
      console.log('ProfilePicture', profilePic)

      this.setState({ user, profilePic })
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

  uploadProfilePicture (e) {
    const file = e.target.files[0]
    console.log(file)
    Storage.put(`uploads/${file.name}`, file, {
      contentType: 'image/png'
    })
      .then(res => {
        return Auth
          .updateUserAttributes(this.state.user, {
            picture: res.key
          })
          .then((r) => {
            console.log(r)
            return Storage.get(res.key)
          })
      })
      .then(this.updateProfilePicture)
      .catch(err => console.log(err))
  }

  deleteProfilePicture () {
    const { user } = this.state
    Auth
      .updateUserAttributes(user, {
        picture: ''
      })
      .then(() => this.updateProfilePicture(null))
      .then(console.log)
  }

  updateProfilePicture (e) {
    this.setState({
      profilePic: e
    })
  }

  render () {
    const { user, profilePic } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <img
            className={profilePic ? 'Profile-pic' : 'App-logo'}
            src={profilePic || logo}
            alt={profilePic ? 'Profile Picture' : 'Logo'}
          />
          <h1 className='App-title'>Welcome, { user && user.username}</h1>
          <button
            className='button'
            onClick={() => {
              this.inputElement.click()
            }}
          >
            Update Image
          </button>
          {
            (() => {
              if (profilePic) {
                return (
                  <button
                    className='button'
                    onClick={this.deleteProfilePicture}
                  >
                    Remove Image
                  </button>
                )
              }
            })()
          }
          <button
            className='button'
            onClick={this.testApi}>
            Test API
          </button>
          <button
            className='button'
            onClick={this.logout}>
            Log Out
          </button>
          <input
            className='file-upload-input'
            type='file'
            ref={input => {
              this.inputElement = input
            }}
            onChange={this.uploadProfilePicture}
            accept='image/*'
          />
          <p className='App-intro'>
            To get started, edit <code>src/containers/Members/index.js</code> and save to reload.
          </p>
        </header>
      </div>
    )
  }
}

export default withAuthenticator(Members, {
  // Render a sign out button once logged in
  // includeGreetings: true,
  signUpConfig,
  theme: amplifyCustomTheme,
  federated: federatedConfig
  // Show only certain components
  // authenticatorComponents: [MyComponents],
})
