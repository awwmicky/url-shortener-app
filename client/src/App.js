import { useEffect,useMemo } from 'react'
import './assets/reset.scss'
import './assets/style.scss'
import './assets/test.css'
import { useImmer } from 'use-immer'
import Form from './components/Form/Form'
import Result from './components/Result/Result'
import Table from './components/Table/Table'
import Modal from './components/Modal/Modal'
// import db from './assets/data-temp.json'
import Context from './utils/Context.js'
import useClipboard from './utils/useClipboard.js'
import { mainContainer } from './utils/mainContainer.js'
import * as API from './apis/API.js'


const initState = { 
  // data: db,
  data   : null,
  result : null,
  target : null
};

const initValue = { 
  link   : "",
  custom : "",
  option : "",
  type   : "",
  error  : null
};

const initModal = {
  isShowing : false,
  id        : NaN,
  type      : ""
};


function App () {

  const [ state,setState ] = useImmer(initState);
  const [ value,setValue ] = useImmer(initValue);
  const [ modal,setModal ] = useImmer(initModal);
  
  const { data } = state;
  const { custom } = value;
  
  const states = useMemo(() => ({ 
    state , setState,
    value , setValue,
    modal , setModal,
    useClipboard, 
    mainContainer,
    API
  }), [
    state , setState,
    value , setValue,
    modal , setModal
  ]);

  ////

  // TODO : useState for is loading/error/data
  useEffect(() => {
    (() => {
      const path = window.location.pathname;
      if ((path === '/') || (path === '/all')) return;
      const redirect = (url) => window.location.assign(url);
      API.redirectTo(path)
      .then(url => redirect(url))
      .catch(err => console.error(err))
    })()
  }, [ ])

  useEffect(() => {
    (() => (
      API.getAll().then(res => setState(
        draft => { draft.data = res.data; }
      )).catch(err => console.error( err ))
    ))()
  }, [ setState ])

  useEffect(() => {
    console.log( (data ? data : "") , custom )
  }, [ data,custom ])

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
      </main>

      <Table />

      <Modal />
    </Context.Provider>
  );
}

export default App;