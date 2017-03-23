
import React, { Component } from 'react';
import {
  ListView,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux'

class Home extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      ds
    };
  }

  componentDidMount() {
    console.log('fetching')
    return fetch(`https://api.github.com/search/repositories?q=topic:ruby+topic:rails`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          dataSource: this.state.ds.cloneWithRows(json.items)
        })
      })
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData.name}</Text>}
      />
    );
  }
}


export default connect()(Home)