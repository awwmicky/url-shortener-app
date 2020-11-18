import { useEffect } from 'react'
import './assets/reset.scss'
import './assets/style.scss'
import './assets/test.css'
import { useImmer } from 'use-immer'
// import axios from 'axios'
import db from './assets/data-temp.json'
import Form from './components/Form/Form'
import Result from './components/Result/Result'
import Table from './components/Table/Table'
import Modal from './components/Modal/Modal'
import Context from './utils/Context.js'
import useClipboard from './utils/useClipboard.js'
import { mainContainer } from './utils/mainContainer.js'


// TODO : reverse DB sort
const initState = { 
  data:   db,
  // data:   null,
  recent: null,
  option: "",
  custom: "",
  link:   ""
};

// TODO : edit modal states
const initModal = {
  isShowing: false,
  id: NaN,
  type: ""
}


function App () {

  const [ state,setState ] = useImmer(initState);
  const [ modal,setModal ] = useImmer(initModal);
  const { data,custom,link } = state;
  const states = { 
    state , setState , modal , setModal,
    useClipboard , mainContainer
  };

  ////

  useEffect(() => {
    (() => {
      const path = window.location.pathname;
      if (path === '/') return;
      axios.get(path)
      .then(res => window.location.assign( res.data.url ))
      .catch(err => console.error(err))
    })()
  }, [ ])

  // TODO : load all data after URL shortens
  // useEffect(() => {
  //   (() => (
  //     axios.get('/all')
  //     .then(res => setState(draft => { draft.data = res.data; }))
  //     .catch(err => console.error(err))
  //   ))()
  // }, [ setState ])

  useEffect(() => {
    console.log( (data ? data : ""),custom,link )
  }, [ data,custom,link ])

  ////

  return (
    <Context.Provider value={ states }>
      <main id="hero-fold">
        <div className="headlines">
          <h1>"<q>Poke.</q>Me It"</h1>
          <p>sharing links, made simple.</p>
        </div>

        <Form />
        <Result />

        <button className="more-btn">▼</button>
      </main>

      <Table />

      <Modal />
    </Context.Provider>
  );
}

export default App;