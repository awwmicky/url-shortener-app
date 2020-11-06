import { useEffect } from 'react'
import './assets/reset.scss'
import './assets/style.scss'
import './assets/test.css'
import db from './assets/data-temp.json'
import { useImmer } from 'use-immer'
// import axios from 'axios'
import Form from './components/Form/Form'
import Table from './components/Table/Table'
import Context from './utils/Context.js'
import useClipboard from './utils/useClipboard.js'


const container = (e) => e.target.parentElement.parentElement;

const initState = { 
  data: db,
  // data: null,
  custom: "",
  link: ""
};


function App () {
  
  const [ state,setState ] = useImmer(initState);
  const { data,custom,link } = state;
  const states = { state,setState,useClipboard,container };

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

  ////

  return (
    <Context.Provider value={ states }>
      <main>
        <h1>URL Shortener App</h1>
        
        <Form />
        <Table />
      </main>
    </Context.Provider>
  );
}

export default App;