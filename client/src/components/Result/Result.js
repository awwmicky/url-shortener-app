import { useEffect,useContext } from 'react'
import Context from '../../utils/Context.js'
import './Result.scss'
import axios from 'axios'
import Copy from './Option/Copy'
import Edit from './Option/Edit'
const [ RESULT , BUTTON , INPUT ] = [
  'result','c-link-btn','c-edit-inp'
];


export default function Result () {

  const { 
    state:{ data , result } , setState,
    value:{ custom , option , type , error } , setValue
  } = useContext(Context);

  const displayError = type === RESULT ? "" : 'hide-error';
  const displayResult = option.length ? "" : 'hide-result';
  const isInput = option === INPUT;
  const text = option === BUTTON ? '✏️' : '✔';
  const subTitle = option && (option === BUTTON) 
  ? 'click to copy link' : 'press enter to save';

  ////

  useEffect(() => {
    if (result) setValue(draft => { draft.option = BUTTON; });
  }, [ result,setValue ])

  const handleEdit = async (e) => {
    if (option === BUTTON) return setValue(draft => {
      draft.option = INPUT;
      draft.custom = result.custom;
    });

    // REVIEW : → convert API
    if (option === INPUT) {
      const [ rId,query ] = [result.id,encodeURIComponent(custom)];
      const url = `/url/custom/${ rId }?custom=${ query }`;

      try {
        if ( result.custom !== custom ) {
          const { data:res } = await axios.patch(url);
          console.info( 'check:',res )
          if (res?.error) throw res.error;
        }

        const dId = !data ? 0 : data.length - 1;
        setValue(draft => { 
          draft.option = BUTTON;
          draft.type = "";
        })
        setState(draft => { 
          draft.result.custom = custom;
          if (data[dId]) draft.data[dId].custom = custom;
        })
      } catch (err) {

        console.error( err.stack )
        setValue(draft => {
          draft.type = RESULT;
          draft.error = err.message; 
        })
      }
    }
  };

  const handleCancel = (e) => setValue(draft => { 
    draft.option = BUTTON;
  });

  const opts = { handleEdit,handleCancel };

  ////

  return (
    <div className={`result ${displayResult}`} data-id={ result?.id }>
      { result && option === BUTTON ? <Copy /> : <Edit opts={ opts } /> }
      <label htmlFor={ option }>{ subTitle }</label>

      <div className="result-opts">
        <button className="btns" onClick={ handleEdit }>{ text }</button>
        { isInput && <button className="btns" onClick={ handleCancel }>✘</button> }
      </div>

      <span className={`err custom-error ${displayError}`}>
        { type === RESULT && error }
      </span>
    </div>
  );
}