import React, { useEffect } from 'react'
import './assets/reset.css'
import './assets/style.css'
import './assets/test.css'
import db from './assets/data-temp.json'
import { useImmer } from 'use-immer'
import axios from 'axios'


const initState = { 
  data: null,
  custom: "",
  link: ""
};

function App () {
  
  const [ state,setState ] = useImmer(initState);
  const { data,custom,link } = state;

  useEffect(() => {
    console.log( (data ? data : ""),custom,link )
  }, [ data,custom,link ])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = { custom,link };
      const { data:res } = await axios.post('/url/new', body);
      console.log( res )
      // setState(draft => { draft.data = res; })
    } catch (err) { console.error(err) }
  };

  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };

  // const resetAllData = e => setState(draft => initState);

  const handleClick = async (e) => {
    try {
      const { data:res } = await axios.get(`/url/${custom}`);
      console.info( res )
      // setState(draft => { draft.data = res; })
    } catch (err) { console.error(err); }
  };

  
  return (
    <>
      <h1>URL Shortener App</h1>
      
      <form 
        name="url_form" 
        id="url-form" 
        onSubmit={ handleSubmit }
      >
        <fieldset>
          <label htmlFor="custom">custom:</label>
          <input 
            type="text"
            name="custom"
            id="custom"
            placeholder="anonymous"
            autoComplete="off"
            autoFocus
            value={ custom }
            onChange={ handleValue }
          />
        </fieldset>

        <fieldset>
          <label htmlFor="link">link:</label>
          <input 
            type="text" 
            name="link"
            id="link"
            placeholder="www.website.com"
            autoComplete="off"
            // autoFocus
            value={ link }
            onChange={ handleValue }
          />
        </fieldset>

        <button
          type="button"
          name="get-btn"
          id="get-btn"
          onClick={ handleClick }
        >Click</button>

        <button 
          type="submit"
          name="submit_btn"
          id="submit-btn"
        >Create URL</button>
      </form>

      <div className="table-container">
        <table name="url_table" id="url-table">
          <thead>
            <tr>
              <th>Clicks</th>
              <th>Custom URL</th>
              <th>Show Link</th>
              <th>Copy Link</th>
              <th>Delete Link</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>0</td>
              <td><a href="link.com">/short</a></td>
              <td>
                <button className="btn show">👁️</button>
                <a href="link.com" hidden>link</a>
              </td>
              <td><button className="btn copy">📋</button></td>
              <td><button className="btn delete">❌</button></td>
            </tr>

            {
              db.map(url => (
                <tr key={ url.id }>
                  <td>{ url.count }</td>
                  <td><a href="link.com">/{ url.custom }</a></td>
                  <td>
                    <button className="btn show">👁️</button>
                    <a href={ url.link } hidden>link</a>
                  </td>
                  <td><button className="btn copy">📋</button></td>
                  <td><button className="btn delete">❌</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;