import React from 'react';

const UrlTable = ({ urls, onDeleteUrl }) => {

    if (!urls) {
        return <label>Loading...</label>
    } else {
        console.log(urls);
        let urlArray = urls.map(att => {
            let src = `http://localhost:3001/${att.hash}`;
            let toDelete = `http://localhost:3001/${att.hash}/remove/${att.removeToken}`;
            return (
                <tr key={att._id} className="ui center aligned">
                    <td data-label="Long Url">
                        <a href={att.url}
                         target="_blank"
                         rel="noopener noreferrer">
                         {att.url}
                        </a>
                    </td>
                    <td data-label="Short Url">
                        <a href={src}
                         target="_blank"
                         rel="noopener noreferrer">
                         {src}
                        </a>
                    </td>
                    <td data-label="Created">{att.createdAt}</td>
                    <td data-label="Clicks">{att.clicks}</td>
                    <td data-label="Delete">
                        <a href="javascript:void(0)">
                            <i className="trash alternate outline icon"
                                onClick={() => onDeleteUrl(toDelete)}>
                            </i>
                        </a>
                    </td>
                </tr>
            )
        });
        return (
            <table className="ui celled table">
                <thead>
                    <tr className="ui center aligned">
                        <th>Long Url</th>
                        <th>Short Url</th>
                        <th>Created</th>
                        <th>Clicks</th>
                        <th><i className="trash alternate outline icon"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {urlArray}
                </tbody>
            </table>
        );  
    }
};

export default UrlTable;