import React from 'react'
// import './Table.css'
import Body from './Link/Body.js'


export default function Table () {
  return (
    <div className="table-container">
      <table name="url_table" id="url-table">
        <thead>
          <tr>
            <th>Clicks</th>
            <th>Domain URL</th>
            <th>Custom URL</th>
            <th>Show Link</th>
            <th>Copy Link</th>
            <th>Delete Link</th>
          </tr>
        </thead>

        <Body />
      </table>
    </div>
  );
}