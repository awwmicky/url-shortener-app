import { useContext } from 'react'
import Context from '../../utils/Context.js'
import './Form.scss'
// import axios from 'axios'


const res = {
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

  // REVIEW : convert API
  // FIXME : issue with Time comp
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = '/url/new';
    const body = { url:link };

    try {
      // const { data:res } = await axios.post(url, body);
      // console.log( res )

      setState(draft => { 
        draft.data.push(res)
        draft.recent = res;
        draft.custom = res.custom;
        draft.link = "";
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
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus={ true }
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