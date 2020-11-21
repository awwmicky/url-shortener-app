import { useContext } from 'react'
import Context from '../../utils/Context.js'
import './Form.scss'
import axios from 'axios'
const FORM = 'form';


export default function Form () {

  const { value:{ link , type , error } , setValue , setState 
  //, API
  } = useContext(Context);
  const display = type === FORM ? "" : 'hide-error';

  ////

  // REVIEW : convert API
  const handleSubmit = async (e) => {
    e.preventDefault()
    const [ url,body ] = ['/url/new',{ url:link }];

    try {
      // const res = API.postUrl(link)
      const { data:res } = await axios.post(url, body);
      console.info( 'data:',res )
      if (res?.error) throw res.error;

      setValue(draft => {
        draft.custom = res.custom;
        draft.link = "";
        draft.type = "";
      })
      setState(draft => { 
        draft.data.push(res)
        draft.result = res;
      })
    } catch (err) { 

      console.log(err)
      console.error( err.stack )
      setValue(draft => {
        draft.type = FORM;
        draft.error = err.message; 
      })
    }
  };

  const handleValue = (e) => {
    const { name,value } = e.target;
    setValue(draft => { draft[name] = value; })
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

      <span className={`err link-error ${display}`}>
        { type === FORM && error }
      </span>
    </form>
  );
}