import { useContext } from 'react'
import Context from '../../utils/Context.js'
import './Form.scss'
// import axios from 'axios'


const res = {
  url: 'https://codewithmosh.com/p/the-ultimate-git-course',
  domain: 'codewithmosh',
  custom: 'code-with-mosh',
  created_at: new Date().toISOString(),
  count: 0
};

// SECTION : include error label
export default function Form () {

  const { state:{ link },setState } = useContext(Context);

  // REVIEW : convert API
  const handleSubmit = async (e) => {
    e.preventDefault()
    // const [ url,body ] = ['/url/new',{ url:link }];

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

      <span className="err link-error">
        This is a reserved or unknown domain.
      </span>
    </form>
  );
}