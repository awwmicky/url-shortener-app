import React from 'react'
// import './Table.css'
import TBody from './Link/TBody.js'


export default function Table () {
  return (
    <section id="table-fold">
      <table name="url_table" id="url-table">
        <thead>
          <tr>
            <th>Clicked</th>
            <th>Published</th>
            <th>Domain</th>
            <th>Custom URL</th>
            <th>Show Link</th>
            <th>Copy Link</th>
            <th>Delete Link</th>
          </tr>
        </thead>

        <TBody />
      </table>
    </section>
  );
}