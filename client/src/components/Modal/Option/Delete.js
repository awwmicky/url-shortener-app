import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Delete.css'
import axios from 'axios'


export default function Delete () {

  // TODO : FIX current item
  const { 
    state:{ data,recent } , setState, 
    modal:{ id } , setModal 
  } = useContext(Context);
  const { url="",custom="" } = recent;

  // REVIEW : convert API
  const handleDelete = async (e) => {
    const path = `/url/${ data[id].id }`;
    
    try {
      // console.log(path)
      await axios.delete(path)

      setState(draft => { 
        delete draft.data[id];
        draft.data = draft.data.filter(Boolean);
      })
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
      <div className="delete-modal">
        <p>Are you sure you want to delete this?</p>
        <a href={ url }>{ '/' + custom }</a>
      </div>

      <div className="modal-opts">
        <button
          className="btns delete-btn"
          autoFocus={ true }
          onClick={ handleDelete }
        >✔</button>
        <button
          className="btns cancel-btn"
          onClick={ handleCancel }
        >✘</button>
      </div>
    </div>
  );
}