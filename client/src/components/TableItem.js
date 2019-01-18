import React from 'react';

const TableItem = ({ urls }) => {
    let content = urls.map(prop => {
        let src = `http://localhost:3001/${prop.hash}`;
        return (
            <tr key={prop._id}>
                <td className="data-label">
                    <a rel="noopener noreferrer"
                    href={src} 
                    target="_blank">
                    {src}</a>
                </td>
                <td className="data-label">{prop.removeToken}</td>
                <td className="data-label">{prop.createdAt}</td>
                <td className="data-label">{prop.clicks}</td>
            </tr>
        )
    });
    return <tbody>{content}</tbody>
}

export default TableItem;