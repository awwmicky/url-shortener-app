import { useEffect,useContext } from 'react'
import Context from '../../utils/Context.js'
import './Result.scss'
// import axios from 'axios'
import Copy from './Option/Copy'
import Edit from './Option/Edit'


export default function Result () {

  const { state:{ recent,option },setState } = useContext(Context);
  const display = option ? '' : 'hide';
  const subTitle = option && (option === 'c-link-btn') 
  ? 'click to copy link' : 'press enter to save';

  ////

  useEffect(() => {
    if ( recent ) setState(draft => { draft.option = 'c-link-btn'; });
  }, [ recent,setState ])

  const handleEdit = async (e) => {
    if (option === 'c-link-btn') return setState(draft => {
      draft.option = 'c-edit-inp'; 
      draft.custom = recent.custom;
    });

    // REVIEW : TEST patch call
    if (option === 'c-edit-inp') {
      // const url = `/url/${ recent.id }?custom=${ custom }`;
      try {
        // const { data:res } = await axios.path(url);
        // console.info( res )

        setState(draft => {
          draft.option = 'c-link-btn';
          draft.recent.custom = draft.custom; 
        })
      } catch (err) { console.error(err) }
    }
  };

  const handleCancel = (e) => setState(draft => { 
    draft.option = 'c-link-btn'; 
  });

  const opts = { handleEdit,handleCancel };

  ////

  return (
    <div className={`result ${display}`} data-id={ recent?.id }>
      { recent && option === 'c-link-btn' ? <Copy /> : <Edit opts={ opts } /> }
      <label htmlFor={ option }>{ subTitle }</label>

      <div className="result-opts">
        <button onClick={ handleEdit }>✏️</button>
        <button onClick={ handleCancel }>✖️</button>
      </div>
    </div>
  );
}