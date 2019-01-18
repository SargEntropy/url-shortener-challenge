import React, { Component } from 'react';
import axios from 'axios';

import URLTable from './URLTable';

class App extends Component {
  state = {
    urls: [],
    response: '',
    url: '',
    shortUrl: '',
    toBeDeleted: ''
  };

  componentDidMount() {

  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post('/', { url: this.state.url })
    .then(result => {
      if (result.status === 200) {
        this.setState({url: '', shortUrl: result.data.shorten });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleDeletionSubmit = e => {
    e.preventDefault();
    let url = new URL(this.state.toBeDeleted);
    url = url.pathname.replace(/\//g, '');
    let hash = url.split('remove')[0];
    let removeToken = url.split('remove')[1];
    axios.delete(`/${hash}/remove/${removeToken}`)
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="ui container">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Paste your URL here:</label>
            <input 
              type="text"
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })}
            />
          </div>
          <div className="field">
            <h4 className="ui header">
              <a href={this.state.shortUrl}>{this.state.shortUrl}</a>
            </h4>
          </div>
        </form>
        <form className="ui form" onSubmit={this.handleDeletionSubmit}>
          <div className="field">
            <label>URL to delete:</label>
            <input
              type="text"
              value={this.state.toBeDeleted}
              onChange={e => this.setState({ toBeDeleted: e.target.value})}
              />
          </div>
        </form>
        <URLTable />
      </div>
    )
  }
}

export default App;