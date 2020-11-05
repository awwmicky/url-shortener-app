import React, { useEffect } from 'react'
import './assets/reset.css'
import './assets/style.css'
import './assets/test.css'
import db from './assets/data-temp.json'
import { Context } from './assets/Context.js'
import { useImmer } from 'use-immer'
// import axios from 'axios'
import Form from './components/Form/Form'
import Table from './components/Table/Table'
import useClipboard from './utils/useClipboard.js'


const initState = { 
  data: db,
  // data: null,
  custom: "",
  link: ""
};


function App () {
  
  const [ isCopied,handleCopy ] = useClipboard(1500);
  const [ state,setState ] = useImmer(initState);
  const { data,custom,link } = state;
  const states = { state, setState };

  ////

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

  // ! include a reset btn ???
  // const resetAllData = (e) => setState(draft => initState);

  ////

  return (
    <Context.Provider value={ states }>
      <main>
        <h1>URL Shortener App</h1>
        <button 
          onClick={ () => handleCopy('plop…✱') }
        >{ isCopied ? 'COPIED' : 'TEST' }</button>
        
        <Form />
        <Table />
      </main>
    </Context.Provider>
  );
}

export default App;