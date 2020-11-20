import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Save.css'
import axios from 'axios'
const [ MODAL,ENTER_KEY ] = ['modal',13];


export default function Save () {

  const { 
    state:{ data , result } , value:{ custom , type , error }, 
    modal:{ id } , setState , setValue , setModal 
  } = useContext(Context);
  const display = type === MODAL ? "" : 'hide-error';

  ////

  const handleValue = (e) => {
    const { name,value } = e.target;
    setValue(draft => { draft[name] = value; })
  };

  // REVIEW : → convert API
  const handleSave = async (e) => {
    const url = `/url/custom/${ data[id].id }?custom=${ custom }`;
    
    try {
      if ( data[id].custom !== custom ) {
        const { data:res } = await axios.patch(url);
        if (res?.error) throw res.error;
      }

      if (!result) {
        setState(draft => { 
          draft.data[id].custom = custom;
        })
      } else {
        setState(draft => { 
          draft.data[id].custom = custom;
          draft.result.custom = custom;
        })
      }
      setValue(draft => { draft.type = ""; })
      setModal(draft => { draft.isShowing = false; })
    } catch (err) { 

      console.error( err.stack )
      setValue(draft => { 
        draft.type = MODAL;
        draft.error = err.message; 
      })
    }
  };

  const handleCancel = (e) => {
    setModal(draft => { draft.isShowing = false; })
  };

  const handleEnterKey = (e) => {
    if (e.which === ENTER_KEY) return handleSave();
  };

  ////

  // SECTION : include error label
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

      <span className={`err modal-error ${display}`}>
        { type === MODAL && error }
      </span>
    </div>
  );
}