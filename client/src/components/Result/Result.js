import { useState,useEffect,useContext } from 'react'
import Context from '../../utils/Context.js'
import './Result.scss'
// import axios from 'axios'
import Copy from './Option/Copy'
import Edit from './Option/Edit'


export default function Result () {

  const { state:{ recent },setState } = useContext(Context);
  const [ option,setOption ] = useState(recent ? 'c-link-btn' : '');
  const display = option ? '' : 'hide';
  const subTitle = option && (option === 'c-link-btn') 
  ? 'click to copy link' : 'press enter to save';

  ////

  useEffect(() => {
    if ( recent ) setOption('c-link-btn');
  }, [ recent ])

  const handleEdit = async (e) => {
    if (option === 'c-link-btn') {
      setState(draft => { draft.custom = draft.recent.custom; })
      setOption('c-edit-inp')
    } else {
      // ! ADD patch
      // const url = `/url/${ recent.id }?custom=${ custom }`;
      try {
        // const { data:res } = await axios.path(url);
        // console.info( res )

        setState(draft => { draft.recent.custom = draft.custom; })
        setOption('c-link-btn')
      } catch (err) { console.error(err) }
    }
  };

  const handleCancel = (e) => setOption('c-link-btn');

  ////

  return (
    <div className={`result ${display}`} data-id={ recent?.id }>
      { 
        recent && option === 'c-link-btn' ? <Copy /> : 
        <Edit  save={ handleEdit } cancel={ handleCancel } /> 
      }

      <label htmlFor={ option }>{ subTitle }</label>

      <div className="result-opts">
        <button onClick={ handleEdit }>✏️</button>
        <button onClick={ handleCancel }>✖</button>
      </div>
    </div>
  );
}