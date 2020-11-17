import { useContext } from 'react'
import Context from '../../utils/Context.js'
import './Form.scss'
// import axios from 'axios'


const obj = {
  id: 10,
  count: 2,
  custom: 'as98das',
  domain: 'google',
  url: 'https://www.google.com',
  created_at: '2020-11-17T08:36:48Z',
  updated_at: '2020-11-17T08:36:48Z'
};

export default function Form () {

  const { state:{ link },setState } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // const body = { url:link };
      // const { data:res } = await axios.post('/url/new', body);
      // console.log( res )
      setState(draft => { 
        
        // STUB : testing
        draft.data.push( obj )
        draft.custom = obj.custom;
        draft.recent = obj;
        // draft.link = ""; // ? RESET
      })
    } catch (err) { console.error(err) }
  };

  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };

  ////

  return (
    <form 
      name="url_form" 
      id="url-form" 
      onSubmit={ handleSubmit }
    >
      <input 
        type="text"
        name="link"
        id="link"
        placeholder=" "
        autoComplete="off"
        autoFocus
        value={ link }
        onChange={ handleValue }
      />

      <label 
        htmlFor="link"
      >Add URL Here</label>

      <button 
        type="submit"
        name="submit_btn"
        id="submit-btn"
      >shorten 🔗</button>
    </form>
  );
}