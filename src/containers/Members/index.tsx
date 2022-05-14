import React, { Component } from "react";
import { Amplify, Storage, Auth, API } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import "./index.css";

import { amplifyConfig, authenticateConfig } from "../../config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: amplifyConfig.cognito.REGION,
    userPoolId: amplifyConfig.cognito.USER_POOL_ID,
    identityPoolId: amplifyConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: amplifyConfig.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: amplifyConfig.s3.REGION,
    bucket: amplifyConfig.s3.BUCKET,
    identityPoolId: amplifyConfig.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: amplifyConfig.apiGateway.URL,
        region: amplifyConfig.apiGateway.REGION,
      },
    ],
  },
});

class Members extends Component {
  apiInitParams = {
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
  };

  constructor(props: any) {
    super(props);

    this.state = {
      user: undefined,
      userAttributes: undefined,
      profilePic: undefined,
    };

    Storage.configure({ level: "private" });

    this.testApi = this.testApi.bind(this);
  }

  async componentDidMount() {
    try {
      // const user = await Auth.currentUserInfo()
      const user = await Auth.currentAuthenticatedUser();
      const userAttributes = await Auth.userAttributes(user);
      const picture = userAttributes.find((attr) => attr.Name === "picture");

      const profilePic = picture ? await Storage.get(picture.Value) : null;

      console.log("User", user);
      console.log("Attributes", userAttributes);
      console.log("ProfilePicture", profilePic);

      this.setState({ user, profilePic });
    } catch (e) {
      console.log(e);
    }
  }

  async testApi() {
    const res = await API.get("api", "/test", this.apiInitParams);
    console.log(res);
    alert(res.message);
  }

  render() {
    return (
      <Authenticator
        signUpAttributes={[
          "email",
          "name",
          "family_name",
          "phone_number",
          "gender",
          "birthdate",
        ]}
        variation="modal"
        formFields={authenticateConfig.formFields}
      >
        {({ signOut, user }) => (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome, {user && user.username}</h1>
              <button className="button" onClick={this.testApi}>
                Test API
              </button>
              <button className="button" onClick={signOut}>
                Log Out
              </button>
              <p className="App-intro">
                To get started, edit{" "}
                <code>src/containers/Members/index.js</code> and save to reload.
              </p>
            </header>
          </div>
        )}
      </Authenticator>
    );
  }
}

export default Members;
