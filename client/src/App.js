import React, { useEffect } from 'react'
import './assets/reset.css'
import './assets/style.css'
import './assets/test.css'
import { useImmer } from 'use-immer'
import axios from 'axios'

const initState = { 
  data: [],
  username: "",
  name: "",
  link: ""
};

function App () {
  
  const [ state,setState ] = useImmer(initState);
  const { data,username,name,link } = state;

  useEffect(() => {
    console.log( (data.length ? data : ""),name,link )
  }, [ data,name,link ])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = { username,name,link };
      const { data } = await axios.post('/url/new', body);
      setState(draft => { draft.data = data; })
    } catch (err) { console.error('Error:', err) }    
  };

  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };

  // const resetAllData = e => setState(draft => initState);

  
  return (
    <>
      <h1>URL Shortener App</h1>
      
      <form 
        name="url_form" 
        id="url-form" 
        onSubmit={ handleSubmit }
      >
        <fieldset>
          <label htmlFor="username">username:</label>
          <input 
            type="text"
            name="username" 
            id="username"
            placeholder="anonymous"
            autoComplete="off"
            autoFocus
            value={ username }
            onChange={ handleValue }
          />
        </fieldset>

        <fieldset>
          <label htmlFor="url-name">name:</label>
          <input 
            type="text"
            name="name" 
            id="url-name"
            placeholder="/custom-name"
            autoComplete="off"
            // autoFocus
            value={ name }
            onChange={ handleValue }
          />
        </fieldset>

        <fieldset>
          <label htmlFor="url-link">link:</label>
          <input 
            type="text" 
            name="link"
            id="url-link"
            placeholder="www.link.com"
            autoComplete="off"
            // autoFocus
            value={ link }
            onChange={ handleValue }
          />
        </fieldset>
        
        <button 
          type="submit"
          name="submit_btn"
          id="submit-btn"
        >Submit</button>
      </form>

      <div className="table-container">
        <table name="url_table" id="url-table">
          <thead>
            <tr>
              <th>Clicks</th>
              <th>Short URL</th>
              <th>Show Link</th>
              <th>Copy Link</th>
              <th>Delete Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td><a href="link.com">link</a></td>
              <td><button className="btn show">👁️</button></td>
              <td><button className="btn copy">📋</button></td>
              <td><button className="btn delete">❌</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;