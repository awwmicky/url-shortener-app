import { useContext } from 'react'
import Context from '../../utils/Context.js'
import './Form.scss'
// import axios from 'axios'


export default function Form () {

  const { state:{ link },setState } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const obj = {
      id: 10,
      custom: 'as98das',
      domain: 'google',
      url: 'https://www.google.com'
    };

    try {
      // const body = { url:link };
      // const { data:res } = await axios.post('/url/new', body);
      // console.log( res )
      setState(draft => { 
        // draft.data.push(res)
        // draft.recent = res;
        // draft.custom = res.custom;
        // draft.link = ""; // ? RESET
        
        // ? TEST
        draft.custom = obj.custom;
        draft.recent = obj;
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