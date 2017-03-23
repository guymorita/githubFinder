
import React, { Component } from 'react';
import {
  Navigator,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './reducers/reducer'

const store = createStore(reducer)

export default class App extends Component {
  render() {
    const routes = [
      {
        title: 'Login',
        index: 0
      },
      {
        title: 'Home',
        index: 1
      },
      {
        title: 'Settings',
        index: 2
      }
    ]
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) =>
            <View><Text>Hi</Text></View>
          }
        />
      </Provider>
    );
  }
}
