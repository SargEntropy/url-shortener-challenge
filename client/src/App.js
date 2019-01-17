import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
    url: '',
    responseToPost: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express } ))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/get');
    console.log(response);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log('React fetch post');
    await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: this.state.url })
    });
    // const body = await response.text();
    // console.log('body post');
    // console.log(body);
    // this.setState({ responseToPost: body });
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
        </ form>
      </div>
    )
  }
  /*state = { users: [] }

  componentDidMount() {
  console.log('componentDidMount');
    fetch('/mariana')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user => 
          <div key={user.id}>{user.username}</div>
          )}
      </div>
    )
  }*/
}

export default App;