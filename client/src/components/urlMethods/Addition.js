import React, { Component } from 'react';

class Addition extends Component {
    state = { url: '' };

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onUrlSubmit(this.state.url);
        this.setState({ url: '' });
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Paste your URL here:</label>
                        <input
                            type="text" 
                            value={this.state.url}
                            onChange={(e) => this.setState({ url: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Addition;