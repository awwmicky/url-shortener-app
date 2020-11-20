import React from 'react'
import './Table.scss'
import TBody from './Link/TBody.js'


export default function Table () {
  return (
    <section id="table-fold">
      <table name="url_table" id="url-table">
        <caption>URL History Log</caption>
        
        <thead>
          <tr>
            <th>Clicked</th>
            <th>Published</th>
            <th>Domain</th>
            <th>Custom</th>
            <th>Options</th>
          </tr>
        </thead>

        <TBody />
      </table>
    </section>
  );
}