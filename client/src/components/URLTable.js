import React, { Component } from 'react';
import axios from 'axios';

import TableItem from './TableItem';

class URLTable extends Component {
    state = { urls: [] }

    componentDidMount() {
        axios.get('/api/content').then(content => {
            this.setState({ urls: content.data });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr><th>Short URL</th>
                    <th>Token</th>
                    <th>Created</th>
                    <th>Clicks</th></tr>
                </thead>
                <TableItem urls={this.state.urls} />
            </table>
        )
    }
}

export default URLTable;