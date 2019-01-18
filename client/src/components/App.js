import React, { Component } from 'react';
import axios from 'axios';

import Addition from './urlMethods/Addition';
import UrlTable from './urlTable/UrlTable';

class App extends Component {
  state = {
    urls: [],
    postedUrl: ''
  };

  onUrlSubmit = async url => {
    try {
      let result = await axios.post('/', { url: url });
      if (result.status === 200 && !result.data.error) {
        this.setState({ postedUrl: result.data });
        this.onGetAllContent();
      } else {
        alert(result.data.message);
      }
    } catch (err) {
      if (!url) alert('Please provide an URL');
      console.log(err);
    }
  }

  onGetAllContent = async () => {
    try {
      let result = await axios.get('/api/content');
      if (result.status === 200) {
        this.setState({ urls: result.data })
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.onGetAllContent();
  }

  onHandleDelete = async url => {
    let pathname = new URL(url).pathname.replace(/\//g, '');
    let hash = pathname.split('remove')[0];
    let removeToken = pathname.split('remove')[1];
    try {
      let newUrlList = this.state.urls.filter(item => {
        return item.removeToken !== removeToken
      });
      let response = await axios.delete(`/${hash}/remove/${removeToken}`);
      if (response.status === 200) {
        this.setState({ urls: newUrlList })
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="ui container">
        <Addition onUrlSubmit={this.onUrlSubmit} />
        <div className="ui segment">
          <UrlTable urls={this.state.urls} onDeleteUrl={this.onHandleDelete}/>
        </div>
      </div>
    )
  }
}

export default App;