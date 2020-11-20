import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Save.css'
import axios from 'axios'
const ENTER_KEY = 13;


// SECTION : include error label
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

  // REVIEW : convert API
  const handleSave = async (e) => {
    const url = `/url/${ data[id].id }?custom=${ custom }`;
    
    try {
      // console.log(url)
      await axios.patch(url)

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
          autoFocus={ true }
          value={ custom }
          onChange={ handleValue }
          onKeyUp={ handleEnterKey }
        />
      </div>

      <div className="modal-opts">
        <button
          className="btns save-btn"
          onClick={ handleSave }
        >✔</button>
        <button
          className="btns cancel-btn"
          onClick={ handleCancel }
        >✘</button>
      </div>

      <span className="err modal-error">
        {/* Custom URL name is already in use. */}
        Must contain only a-z, 0-9, or "-"/"_".
        {/* Must be between 4-20 chars long. */}
      </span>
    </div>
  );
}