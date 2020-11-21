import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Delete.css'


export default function Delete () {

  const { 
    state:{ data , target:{ url,custom }},
    modal:{ id } , setState , setModal, API
  } = useContext(Context);

  ////

  const handleDelete = async (e) => {
    const dId = data[id].id;

    try {
      await API.deleteUrl(dId)
      // await axios.delete(path)
      
      setState(draft => { 
        delete draft.data[id];
        draft.data = draft.data.filter(Boolean);
      })
      setModal(draft => { draft.isShowing = false; })
    } catch (err) { console.error(err) }
  };

  const handleCancel = (e) => {
    setModal(draft => { draft.isShowing = false; })
  };

  ////

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