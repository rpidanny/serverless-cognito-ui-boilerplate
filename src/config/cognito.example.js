const signUpConfig = {
  // hiddenDefaults: ['phone_number'],
  // header: 'Welcome!',
  defaultCountryCode: '31',
  signUpFields: [
    {
      label: 'First Name',
      key: 'name',
      placeholder: 'First Name',
      displayOrder: 3,
      required: true,
      type: 'string'
    },
    {
      label: 'Last Name',
      key: 'family_name',
      placeholder: 'Last Name',
      displayOrder: 4,
      required: true,
      type: 'string'
    },
    {
      label: 'Gender',
      key: 'gender',
      placeholder: 'Male',
      displayOrder: 5,
      required: true,
      type: 'string'
    },
    {
      label: 'Birthday',
      key: 'birthdate',
      displayOrder: 6,
      required: true,
      type: 'date'
    }
  ]
}

const federatedConfig = {
  // google_client_id: 'YOUR_GOOGLE_CLIENT_ID'
}

const awsConfig = {
  s3: {
    REGION: 'YOUR_REGION',
    BUCKET: 'YOUR_S3_BUCKET_NAME'
  },
  apiGateway: {
    REGION: 'YOUR_REGION',
    URL: 'YOUR_API_GATEWAY_URL'
  },
  cognito: {
    REGION: 'YOUR_REGION',
    USER_POOL_ID: 'YOUR_USER_POOL_ID',
    APP_CLIENT_ID: 'YOUR_APP_CLIENT_ID',
    IDENTITY_POOL_ID: 'YOUR_IDENTITY_POOL_ID'
  }
}

const amplifyCustomTheme = {
  googleSignInButton: {
    // backgroundColor: 'red',
    // borderColor: 'red'
    // fontSize: 12,
    // fontWeight: 400,
    // font: 'Arial'
  },
  button: {
    // backgroundColor: '#fd5650',
    // borderColor: '#fd5650'
  },
  signInButtonIcon: {
    // display: 'none'
  }
}

module.exports = {
  awsConfig,
  signUpConfig,
  federatedConfig,
  amplifyCustomTheme
}
