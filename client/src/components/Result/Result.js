import { useEffect,useContext } from 'react'
import Context from '../../utils/Context.js'
import './Result.scss'
import Copy from './Option/Copy'
import Edit from './Option/Edit'
const [ RESULT , BUTTON , INPUT ] = [
  'result','c-link-btn','c-edit-inp'
];


export default function Result () {

  const { 
    state:{ data , result } , value:{ custom , option , type , error }, 
    setState , setValue , API
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

    if (option === INPUT) {
      const [ rId,query ] = [result.id,custom];

      try {
        if ( result.custom !== custom ) {
          await API.updateCustom(rId,query);
        }

        const saved = custom.replace(/\s+/g, '-');
        const dId = data.length - 1;
        setValue(draft => { 
          draft.option = BUTTON;
          draft.type = "";
        })
        setState(draft => { 
          draft.result.custom = saved;
          if (data[dId]) draft.data[dId].custom = saved;
        })
      } catch (err) {

        console.log(err)
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