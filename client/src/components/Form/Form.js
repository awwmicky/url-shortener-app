import { useContext } from 'react'
import Context from '../../utils/Context.js'
// import './Form.css'
import axios from 'axios'
import Input from './Input'


export default function Form () {

  const { state, setState } = useContext(Context);
  const { custom,link } = state;

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = { custom,link };
      const { data:res } = await axios.post('/url/new', body);
      // console.log( res )
      setState(draft => { 
        // draft.custom = "";
        // draft.link = "";
        draft.data.push(res)
      })
    } catch (err) { console.error(err) }
  };

  // ! REDIRECT test page
  const handleTest = async (e) => {
    try {
      // const { data:res } = 
      await axios.get(`/${custom}`);
      // console.info( res )
      // await axios.get(`/${custom}`,{ headers:{ 'Access-Control-Allow-Origin' : '*' }});
      // setState(draft => { draft.data = res; })
    } catch (err) { console.error(err) }
  }; // ? TEST redirect

  ////

  return (
    <form 
      name="url_form" 
      id="url-form" 
      onSubmit={ handleSubmit }
    >
      <Input
        name={ 'custom' }
        ph={ 'enter-custom-name' }
        focus={ true }
        val={ custom }
      />

      <Input
        name={ 'link' }
        ph={ 'www.website.com' }
        val={ link }
      /> 

      <button
        type="button"
        name="get_btn"
        id="get-btn"
        onClick={ handleTest }
      >Redirect Test</button>

      <button 
        type="submit"
        name="submit_btn"
        id="submit-btn"
      >Create URL</button>
    </form>
  );
}