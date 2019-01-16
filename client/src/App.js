import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
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
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();
    console.log('body post');
    this.setState({ responseToPost: body });
  }

  render() {
    return (
      <div>
        {this.state.response}
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input 
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
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