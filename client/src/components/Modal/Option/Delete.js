import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Delete.css'
// import axios from 'axios'



export default function Delete () {

  const { 
    state:{ data } , setState, 
    modal:{ id } , setModal 
  } = useContext(Context);
  const { url,custom } = data[id];

  // REVIEW : convert API
  const handleDelete = async (e) => {
    const url = `/url/${ data[id].id }`;
    
    try {
      console.log(url)
      // await axios.delete(url)

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