
import React, { Component } from 'react';
import {
  Navigator,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './reducers/reducer'

import Home from './containers/Home'
import Login from './containers/Login'
import Settings from './containers/Settings'

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
          renderScene={this._renderScenes.bind(this)}
        />
      </Provider>
    );
  }

  _renderScenes(route, navigator) {
    const title = route.title
    switch(title) {
      case 'Login':
        return <Login navigator={navigator} />
      case 'Home':
        return <Home navigator={navigator} />
      case 'Settings':
        return <Settings navigator={navigator} />

    }
  }
}
