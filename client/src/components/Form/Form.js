import { useContext } from 'react'
import Context from '../../utils/Context.js'
import './Form.scss'
const FORM = 'form';


export default function Form () {

  const { 
    value:{ link , type , error } , setValue , setState , API
  } = useContext(Context);
  const display = type === FORM ? "" : 'hide-error';

  ////

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.postUrl(link);
      console.info( 'data:',res )

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