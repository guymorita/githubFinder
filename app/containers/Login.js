

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk';
import { connect } from 'react-redux'

import { saveUser } from '../reducers/reducer'

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onConnectFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          //alert('Login success with permissions: '
          //  +result.grantedPermissions.toString());
          this.getGraph();
        }
      },
      (error) => {
        alert('Login fail with error: ' + error);
      }
    );
  }

  async getGraph() {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    const loginResult = await LoginManager.logInWithReadPermissions(['public_profile']);
    if (loginResult.isCancelled) {
      return alert('Login cancelled');
        }
    const {accessToken} = await AccessToken.getCurrentAccessToken();
    const { dispatch } = this.props

    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'id, name, link, gender, picture' // what you want to get
          },
          access_token: {
            string: accessToken
          }
        }
      },
      (error, result) => {
        if (error) {
          alert('Error fetching data: ' + JSON.stringify(error));
          return;
        }
        dispatch(saveUser(result))
        // alert('result: ' + JSON.stringify(result));
        this.props.navigator.push({title:'Home'});
        return (result);
      },
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + JSON.stringify(result))
    }
  }

  render() {
    return (<View
      style={{
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
      }}
      >
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          width: 200, height: 40,
          alignItems: 'center', justifyContent: 'center',
        }}
        onPress={this.onConnectFacebook.bind(this)}
        >
        <Text
          style={{
            color: '#fff',
          }}
          >
          Connect with Facebook
        </Text>
      </TouchableOpacity>

    </View>);
  }
}

export default connect()(Login)