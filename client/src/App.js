import React, { useEffect } from 'react'
import './assets/reset.css'
import './assets/style.css'
import './assets/test.css'
import db from './assets/data-temp.json'
import { useImmer } from 'use-immer'
import axios from 'axios'


const initState = { 
  // data: null,
  data: db,
  custom: "",
  link: ""
};

const container = (e) => e.target.parentElement.parentElement;

function App () {
  
  const [ state,setState ] = useImmer(initState);
  const { data,custom,link } = state;

  // useEffect(() => {
  //   (() => (
  //     axios.get('/all')
  //     .then(res => setState(draft => { draft.data = res.data; }))
  //     .catch(err => console.error(err))
  //   ))()
  // }, [ ])

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

  const handleTest = async (e) => {
    try {
      const { data:res } = await axios.get(`/url/${custom}`);
      console.info( res )
      // setState(draft => { draft.data = res; })
    } catch (err) { console.error(err); }
  };

  const handleCount = async (e) => {
    const id = container(e).dataset.id;
    if ( data[id].checked ) return;
    
    // try {
      // const url = `/url/${ id }?count=${ data[id].count }`;
      // const { data:res } = await axios.patch(url);
      // console.info(res)

      setState(draft => { 
        draft.data[id].count += 1;
        draft.data[id].checked = !draft.data[id].checked;
      })
    // } catch (err) { console.error(err); }
  };

  // ! apply tooltip style
  const toggleLink = () => {};
  ////

  // ! apply copy to clipboard
  const handleCopy = (e) => {
    const id = container(e).dataset.id;
    const customLink = '/' + data[id].custom;
    console.log( customLink )
  };

  const handleDelete = async (e) => {
    const id = container(e).dataset.id;
    
    // try {
      // const { data:res } = await axios.delete(`/url/${ id }`);
      // console.info(res)

      setState(draft => { 
        delete draft.data[id];
        draft.data = draft.data.filter(Boolean);
      })
    // } catch (err) { console.error(err); }
  };

  
  return (
    <main>
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
          onClick={ handleTest }
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
              <th>Domain URL</th>
              <th>Custom URL</th>
              <th>Show Link</th>
              <th>Copy Link</th>
              <th>Delete Link</th>
            </tr>
          </thead>
          
          <tbody>
            {
              data && data.map((link, id) => (
                <tr key={ link.id } data-id={ id }>
                  <td>{ link.count }</td>
                  <td>
                    <a 
                      href={ link.url }
                      target="_blank"
                      rel="noopener noreferrer"
                      title="go to link"
                      onClick={ handleCount }
                    >{ link.domain }</a>
                  </td>
                  <td>
                    <a 
                      href={ link.url }
                      target="_blank"
                      rel="noopener noreferrer"
                      title="go to link"
                      onClick={ handleCount }
                    >{ `/${link.custom}` }</a>
                  </td>
                  <td>
                    <button 
                      className="btn show" 
                      onClick={ toggleLink }
                    >👁️</button>
                      <a 
                        className="tooltip" 
                        href={ link.url }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="go to link"
                        hidden
                        onClick={ handleCount }
                      >URL</a>
                  </td>
                  <td>
                    <button 
                      className="btn copy"
                      onClick={ handleCopy }
                    >📋</button>
                  </td>
                  <td>
                    <button 
                      className="btn delete"
                      onClick={ handleDelete }
                    >❌</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;