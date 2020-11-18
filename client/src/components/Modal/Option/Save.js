import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Save.css'
// import axios from 'axios'
const ENTER_KEY = 13;


// TODO : update content
export default function Save () {

  const { 
    state:{ data,custom } , setState, 
    modal:{ id } , setModal 
  } = useContext(Context);

  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };

  const handleEnterKey = (e) => {
    if (e.which !== ENTER_KEY) return;
    setState(draft => { draft.data[id].custom = custom; })
    setModal(draft => { draft.isShowing = false; })
  };
  
  // REVIEW : TEST patch call
  const handleSave = async (e) => {
    const url = `/url/${ data[id].id }?custom=${ custom }`;
    console.log(e.target,'\n',url)
    try {
      // const { data:res } = await axios.path(url);
      // console.info( res )

      setState(draft => { draft.data[id].custom = custom; })
      setModal(draft => { draft.isShowing = false; })
    } catch (err) { console.error(err) }
  };

  const handleCancel = (e) => {
    setModal(draft => {
      draft.isShowing = false;
    })
  };

  return (
    <div className="modal-content">
      <div className="save-modal">
        <label htmlFor="custom">
          press enter to save
        </label>
        <input 
          type="text"
          name="custom"
          id="custom"
          className="c-edit-inp"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus="true"
          value={ custom }
          onChange={ handleValue }
          onKeyUp={ handleEnterKey }
        />
      </div>

      <div className="modal-opts">
        <button
          className="save-btn"
          onClick={ handleSave }
        >✔</button>
        <button
          className="cancel-btn"
          onClick={ handleCancel }
        >✘</button>
      </div>
    </div>
  );
}